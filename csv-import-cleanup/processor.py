import pandas as pd
import os
import json

class ExcelProcessor:
    def __init__(self, config_path):
        self.config_path = config_path
        self.load_config()

    def load_config(self):
        config_dir = os.path.dirname(os.path.abspath(self.config_path))
        with open(self.config_path, 'r', encoding='utf-8') as f:
            self.config = json.load(f)
        
        # Resolve paths relative to the config file directly
        self.source_file = os.path.normpath(os.path.join(config_dir, self.config['source_file']))
        self.template_file = os.path.normpath(os.path.join(config_dir, self.config['template_file']))
        self.output_file = os.path.normpath(os.path.join(config_dir, self.config['output_file']))
        self.allowance_mapping = self.config.get('allowance_mapping', {})

    def process(self):
        print(f"Reading source data from: {self.source_file}")
        
        if not os.path.exists(self.source_file):
            raise FileNotFoundError(f"Source file not found: {self.source_file}")
            
        df = pd.read_excel(self.source_file)
        
        df_paygrades = self._process_paygrades(df)
        df_allowances = self._process_allowances(df)
        df_statutory = self._process_statutory(df)
        
        self._save_output(df_paygrades, df_allowances, df_statutory)
        
    def _process_paygrades(self, df):
        print("Processing Paygrades...")
        paygrades_data = []
        for _, row in df.iterrows():
            paygrade = row.get('paygrade')
            if pd.isna(paygrade):
                continue
            
            gross_annual = row.get('Gross Annual', '')
            paygrades_data.append({
                'Paygrade Name (required)': paygrade,
                'Alias': '',
                'Payband Name (optional)': '',
                'Currency Code (required)': 'NGN',
                'Gross (required)': gross_annual,
                'Net (optional, if known)': '',
                'Gross Provided? (yes/no)': 'yes',
                'Is Taxable? (yes/no)': 'yes',
                'Apply Standard Tax? (yes/no)': 'yes',
                'Tax Type (PAYE/WHT)': 'PAYE',
                'Tax Basis (dropdown)': '',
                'Tax Value (optional)': ''
            })
        return pd.DataFrame(paygrades_data)

    def _process_allowances(self, df):
        print("Processing Allowances...")
        allowances_data = []
        for _, row in df.iterrows():
            paygrade = row.get('paygrade')
            if pd.isna(paygrade):
                continue
                
            for src_col, target_allowance in self.allowance_mapping.items():
                amount = row.get(src_col, 0)
                try:
                    amount_val = float(amount)
                    if pd.notna(amount_val) and amount_val > 0:
                        allowances_data.append({
                            'Paygrade Name (required)': paygrade,
                            'Allowance Name (dropdown)': target_allowance,
                            'Allowance Basis (dropdown)': 'Fixed amount',
                            'Allowance Amount (number)': amount_val,
                            'Payroll Schedule (dropdown)': 'Monthly',
                            'Payroll Remittance (optional dropdown)': '',
                            'Is Net? (optional)': ''
                        })
                except (ValueError, TypeError):
                    pass
        return pd.DataFrame(allowances_data)

    def _process_statutory(self, df):
        print("Processing Statutory Benefits...")
        statutory_data = []
        
        # Standard deductions based on the PaidHR template logic
        # You could also pull these details from the template file or config in the future
        for paygrade in df['paygrade'].dropna().unique():
            statutory_data.append({
                'Paygrade Name (required)': paygrade,
                'Benefit Name (dropdown)': 'Pension',
                'Basis (dropdown)': 'Percentage of gross earning',
                'Employee Deduction Value (number)': 8,
                'Employer Contribution Value (number)': 10.0,
                'Voluntary Deduction Amount (optional)': '',
                'Allowances Applied To (comma-separated allowance names)': 'Basic, Housing, Transport'
            })
            statutory_data.append({
                'Paygrade Name (required)': paygrade,
                'Benefit Name (dropdown)': 'NHF',
                'Basis (dropdown)': 'Percentage of gross earning',
                'Employee Deduction Value (number)': 0,
                'Employer Contribution Value (number)': 2.5,
                'Voluntary Deduction Amount (optional)': '',
                'Allowances Applied To (comma-separated allowance names)': 'Basic, Housing, Transport, Meal Allowance, Utility Allowance, Dressing Allowance'
            })
        return pd.DataFrame(statutory_data)

    def _save_output(self, df_paygrades, df_allowances, df_statutory):
        print(f"Writing to output file: {self.output_file}")
        
        # Make sure directory exists
        os.makedirs(os.path.dirname(self.output_file), exist_ok=True)
        
        with pd.ExcelWriter(self.output_file, engine='openpyxl') as writer:
            df_paygrades.to_excel(writer, sheet_name='Paygrades', index=False)
            df_allowances.to_excel(writer, sheet_name='Allowances', index=False)
            df_statutory.to_excel(writer, sheet_name='StatutoryBenefits', index=False)
            
        print("Successfully generated output file!")
