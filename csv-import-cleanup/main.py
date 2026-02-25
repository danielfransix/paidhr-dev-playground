import os
import argparse
from processor import ExcelProcessor

def main():
    parser = argparse.ArgumentParser(description="Clean up and import CSV/Excel data using a configuration file.")
    parser.add_argument(
        '--config', 
        type=str, 
        default='config.json', 
        help='Path to the config.json file (default: config.json in the current directory)'
    )
    
    args = parser.parse_args()
    config_path = args.config
    
    if not os.path.exists(config_path):
        print(f"Error: Configuration file '{config_path}' not found.")
        print("Please ensure you run this from the 'csv-import-cleanup' directory or provide an absolute path.")
        return
        
    try:
        processor = ExcelProcessor(config_path)
        processor.process()
    except Exception as e:
        print(f"An error occurred during processing:\n{e}")

if __name__ == "__main__":
    main()
