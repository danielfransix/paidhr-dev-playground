# Qrono Figma Bridge

Control Figma directly from Claude Code in your IDE. Send commands from the terminal — Claude executes them inside the open Figma file in real time.

---

## How it works

```
Claude (Bash tool) → figma.js → WebSocket (9001) → bridge-server → Figma Plugin → Figma API
```

Three parts:

| Part | Location | What it does |
|---|---|---|
| Bridge server | `bridge-server/server.js` | WebSocket relay on port 9001. Routes commands to the plugin and responses back. |
| Figma plugin | `figma-plugin/` | Runs inside Figma desktop. Receives commands over WebSocket, executes them via the Figma Plugin API. |
| CLI client | `figma.js` | One-shot Node script. Connects, sends one command, prints the result as JSON, exits. |

---

## Setup (one-time)

### 1. Install bridge server dependencies

```bash
cd bridge-server
npm install
```

### 2. Install the Figma plugin

In Figma desktop:
- Menu → Plugins → Development → Import plugin from manifest
- Select `figma-plugin/manifest.json`

---

## Starting the bridge

Every session you need the bridge server running and the plugin active in Figma.

**Start the bridge server:**
```bash
node "c:/Github Repos/paidhr-dev-playground/figma-bridge/bridge-server/server.js"
```

**Run the plugin in Figma:**
Plugins → Development → Qrono Claude Bridge → Run

The plugin UI shows a green dot and "Connected" when the bridge server is reachable.

**Test the connection:**
```bash
node "c:/Github Repos/paidhr-dev-playground/figma-bridge/figma.js" ping
```

Expected output:
```json
{ "status": "ok", "file": "YourFileName", "page": "YourPageName" }
```

---

## Using figma.js

```bash
node figma.js <command> '<json-params>'
```

Parameters are a JSON string. Omit the second argument if the command takes no params.

All output is JSON on stdout. Errors go to stderr and exit with code 1.

---

## Commands

### Read

**`ping`** — Check connection and get current file/page name.
```bash
node figma.js ping
```

**`get_selection`** — Get the currently selected nodes (depth 3).
```bash
node figma.js get_selection
```

**`get_nodes`** — Get a node tree by ID.
```bash
node figma.js get_nodes '{"nodeId":"488:373","depth":3}'
```
- `nodeId` — omit to get the entire current page
- `depth` — how many levels of children to include (default 3)

**`get_nodes_flat`** — Get all descendant nodes as a flat array. Skips vectors and instance children by default.
```bash
node figma.js get_nodes_flat '{"nodeId":"488:373"}'
```
- `skipVectors` — default `true`
- `skipInstanceChildren` — default `true`

**`get_local_styles`** — Get all text styles and color styles defined in the file.
```bash
node figma.js get_local_styles
```

**`get_local_variables`** — Get variable collections and variables defined locally in the file.
```bash
node figma.js get_local_variables
```

**`get_all_document_variables`** — Walk the entire page and resolve every variable that is actually bound to any node (including library variables). Use this instead of `get_local_variables` when variables come from a linked library.
```bash
node figma.js get_all_document_variables
```

**`resolve_variables`** — Look up specific variables by ID.
```bash
node figma.js resolve_variables '{"ids":["VariableID:abc/123","VariableID:def/456"]}'
```

---

### Rename

**`rename_node`** — Rename a single node.
```bash
node figma.js rename_node '{"nodeId":"488:616","name":"Container"}'
```

**`bulk_rename`** — Rename multiple nodes in one call.
```bash
node figma.js bulk_rename '{"renames":[{"nodeId":"488:616","name":"Container"},{"nodeId":"488:617","name":"Label"}]}'
```

---

### Text

**`set_characters`** — Set the text content of a TEXT node.
```bash
node figma.js set_characters '{"nodeId":"488:513","text":"Log in to your account"}'
```

**`bulk_set_characters`** — Set text on multiple nodes.
```bash
node figma.js bulk_set_characters '{"items":[{"nodeId":"488:513","text":"Log in"},{"nodeId":"488:514","text":"Continue"}]}'
```

**`apply_text_style`** — Link a TEXT node to a text style by style ID.
```bash
node figma.js apply_text_style '{"nodeId":"488:513","styleId":"S:abc123,"}'
```

**`bulk_apply_text_style`** — Link multiple TEXT nodes to text styles.
```bash
node figma.js bulk_apply_text_style '{"items":[{"nodeId":"488:513","styleId":"S:abc"},{"nodeId":"488:514","styleId":"S:def"}]}'
```

---

### Colors

**`apply_fill_style`** — Apply a paint/color style to a node's fill.
```bash
node figma.js apply_fill_style '{"nodeId":"488:616","styleId":"S:abc123"}'
```

**`apply_fill_variable`** — Bind a fill's color to a variable.
```bash
node figma.js apply_fill_variable '{"nodeId":"488:616","variableId":"VariableID:abc/123","fillIndex":0}'
```

**`bulk_apply_fill_variable`** — Bind fill colors on multiple nodes.
```bash
node figma.js bulk_apply_fill_variable '{"items":[{"nodeId":"488:616","variableId":"VariableID:abc/123","fillIndex":0}]}'
```

---

### Variable bindings (spacing, radius, etc.)

**`set_variable_binding`** — Bind a numeric field on a node to a variable.
```bash
node figma.js set_variable_binding '{"nodeId":"488:616","field":"paddingTop","variableId":"VariableID:abc/123"}'
```

Common fields: `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `itemSpacing`, `counterAxisSpacing`, `cornerRadius`, `topLeftRadius`, `topRightRadius`, `bottomRightRadius`, `bottomLeftRadius`

**`bulk_set_variable_binding`** — Bind multiple fields across multiple nodes.
```bash
node figma.js bulk_set_variable_binding '{"items":[{"nodeId":"488:616","field":"paddingTop","variableId":"VariableID:abc/123"},{"nodeId":"488:616","field":"paddingBottom","variableId":"VariableID:abc/123"}]}'
```

**`remove_variable_binding`** — Unbind a variable from a field.
```bash
node figma.js remove_variable_binding '{"nodeId":"488:616","field":"paddingTop"}'
```

---

### Raw property

**`set_property`** — Set any writable property directly (no variable binding, just a raw value).
```bash
node figma.js set_property '{"nodeId":"488:616","field":"opacity","value":0.5}'
```

---

## Using figma.js from Claude's Bash tool

Claude uses `figma.js` via the Bash tool. For large bulk operations involving arrays, embed the data inline in a `node -e` script rather than passing JSON as a shell argument (Windows shell escaping mangles nested quotes):

```bash
node -e "
const WebSocket = require('./bridge-server/node_modules/ws');
const { randomUUID } = require('crypto');
const items = [/* your array here */];
const ws = new WebSocket('ws://localhost:9001');
ws.on('open', () => {
  const id = randomUUID();
  ws.send(JSON.stringify({ id, command: 'bulk_set_variable_binding', params: { items } }));
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.id !== id) return;
    ws.close();
    console.log(JSON.stringify(msg.result, null, 2));
    process.exit(0);
  });
});
"
```

---

## Node serialization

`get_nodes` and `get_nodes_flat` return nodes with this shape:

```json
{
  "id": "488:616",
  "name": "Container",
  "type": "FRAME",
  "fills": [{ "type": "SOLID", "color": { "r": 255, "g": 255, "b": 255 }, "colorVariableId": "VariableID:..." }],
  "boundVariables": { "paddingTop": "VariableID:...", "fills": ["VariableID:..."] },
  "paddingTop": 16, "paddingRight": 16, "paddingBottom": 16, "paddingLeft": 16,
  "itemSpacing": 8,
  "cornerRadius": 8,
  "children": [...]
}
```

TEXT nodes additionally include:
```json
{
  "text": "Log in to your account",
  "textStyleId": "S:abc123",
  "textStyleName": "body/md"
}
```

`colorVariableId` on a fill means the color is already bound to a variable. `textStyleId` on a text node means it's already linked to a text style. Use these to find what still needs to be linked.

---

## Troubleshooting

**"Figma plugin not connected"** — The plugin isn't running in Figma. Open Figma → Plugins → Development → Qrono Claude Bridge → Run.

**"Timeout"** — Bridge server isn't running. Start it with `node bridge-server/server.js`.

**Plugin shows orange dot / "Connecting"** — Bridge server isn't running or crashed. Restart it.

**Plugin was reloaded but new commands aren't available** — After editing `code.js`, you must reload the plugin in Figma (Plugins → Development → Qrono Claude Bridge → right-click → reload). The bridge server does not need to restart.
