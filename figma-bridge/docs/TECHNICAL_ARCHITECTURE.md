# Technical Architecture: Figma Bridge

The **Figma Bridge** is a system designed to enable external scripts (like AI agents or CLI tools) to interact programmatically with a live Figma document. It bypasses Figma's REST API limitations by creating a direct, real-time WebSocket connection between a local Node.js environment and a running Figma Plugin.

This document details how the system is architected, how data flows between components, and how the standardization processor operates.

---

## 1. System Architecture Overview

The system consists of three main components:

1. **Figma Plugin (`/figma-plugin`)**
   - Runs directly inside the Figma desktop/web app.
   - Has full access to the Figma Plugin API (read/write access to nodes, variables, styles).
   - Acts as a WebSocket client connecting to the Bridge Server.
2. **Bridge Server (`/bridge-server`)**
   - A local Node.js WebSocket server running on `ws://localhost:9001`.
   - Acts as a middleman relaying messages between the Figma Plugin and local CLI tools.
3. **CLI Clients (`figma.js`, `process.js`)**
   - Local Node.js scripts that act as WebSocket clients.
   - Send commands (JSON payloads) to the Bridge Server, which relays them to the Plugin.
   - Wait for the Plugin to process the command and return the result via the Server.

### Data Flow Example
1. **CLI:** `node process.js standardize "488:373"` is executed.
2. **CLI:** Connects to `ws://localhost:9001` and sends: `{ id: 'uuid', command: 'get_nodes_flat', params: { nodeId: '488:373' } }`.
3. **Server:** Receives the message and broadcasts it to the connected Figma Plugin.
4. **Plugin:** Receives the message, executes Figma API calls (e.g., `figma.getNodeById`), serializes the result, and sends it back to the server.
5. **Server:** Relays the serialized node data back to the CLI.
6. **CLI:** Processes the data, computes changes, and sends mutation commands (e.g., `bulk_set_variable_binding`) back through the same pipeline.

---

## 2. Component Deep Dive

### 2.1 The Figma Plugin (`figma-plugin/code.js`)
The plugin is the execution engine. It listens for WebSocket messages and maps commands to specific Figma API functions.

**Key Responsibilities:**
- **Serialization:** Figma nodes contain complex, self-referential objects and "mixed" properties. The plugin includes functions like `serializeNode` and `serializeFills` to safely convert node trees into flat, JSON-compatible structures.
- **Bulk Operations:** To avoid performance bottlenecks and WebSocket timeouts, the plugin exposes `bulk_*` commands (`bulk_rename`, `bulk_apply_text_style`, `bulk_set_variable_binding`).
- **Variable & Style Resolution:** Functions like `getAllDocumentVariables` traverse the document to find bound variables, resolving their types (`FLOAT`, `COLOR`, etc.) and modes.

### 2.2 The Bridge Server (`bridge-server/server.js`)
A lightweight `ws` server. It maintains a list of connected clients (which includes both the plugin and the CLI tools). When it receives a message from a CLI tool (identifiable by the presence of a `command` field), it forwards it to the plugin. When it receives a response from the plugin (identifiable by a `result` or `error` field), it forwards it back to the specific CLI tool waiting for that `id`.

### 2.3 The CLI Interface (`figma.js`)
This is the raw communication wrapper. It handles the WebSocket connection setup, UUID generation for request tracking, and timeouts (default 15s/30s). It allows raw commands to be executed via Bash, e.g., `node figma.js ping`.

---

## 3. The Standardization Processor (`process.js`)

The `process.js` file is a high-level application built on top of the bridge architecture. It implements the "Design System Processor Instructions".

### How `process.js` Works Technically:

1. **Data Ingestion:**
   - Calls `get_all_document_variables` to cache all `COLOR` and `FLOAT` (spacing/radius) variables.
   - Calls `get_local_styles` to cache text styles.
   - Calls `get_nodes_flat` to get a 1D array of all nodes in the target frame (skipping vectors to save bandwidth).
   - Calls `get_nodes` (depth 10) to get the hierarchical tree for layout context.

2. **Heuristic Matching (The AI Logic):**
   - **Colors:** Computes the RGB absolute difference (`Math.abs(r1-r2) + Math.abs(g1-g2)...`) between a raw hex fill and all cached `COLOR` variables to find the closest match.
   - **Spacing/Radius:** Maps numeric properties (e.g., `paddingTop: 16`) to `FLOAT` variables named `spacing/*` or `radius/*` by finding the minimum numerical difference.
   - **Typography:** Normalizes font weights (e.g., 'Book' -> 400, 'Bold' -> 700) and calculates a combined difference score based on `fontSize` (weighted heavily) and `fontWeight` to map raw text to the closest Design System text style.

3. **Context-Aware Rules:**
   - **Illustrations:** The script checks node names (`includes('illustration')`). It explicitly skips applying auto-layout variables to these nodes so they can remain free-form.

4. **Batch Execution:**
   - To prevent crashing the Figma plugin with massive payloads, `process.js` chunks mutation commands (like applying variables) into batches of 500.
   - It sends these chunks sequentially via `bulk_set_variable_binding` and `bulk_set_property`.

## 4. Error Handling & Limitations
- **Timeouts:** If the Figma plugin is closed or asleep, the WebSocket connection will time out after 30 seconds. The user must keep the plugin running in Figma (`Plugins -> Development -> Qrono Claude Bridge`).
- **Mixed Properties:** Figma uses `figma.mixed` when multiple text styles exist in a single text node. The bridge currently serializes these as `null` and skips them.
- **Vectors:** Deeply nested vector networks (SVGs) create massive JSON payloads. The CLI uses `skipVectors: true` to prevent WebSocket memory limits from being exceeded.
