export declare namespace TypeReciver {
    type PhoneNumber = {
        ddd: string;
        number: string;
        type?: string;
    };
    type Address = {
        street: string;
        street_number: string;
        neighborhood: string;
        city: string;
        state: string;
        zip_code: string;
        complementary?: string;
        reference_point?: string;
    };
    type BankAccount = {
        holder_name: string;
        holder_type: 'individual' | 'company';
        holder_document: string;
        bank: string;
        branch_number: string;
        branch_check_digit?: string;
        account_number: string;
        account_check_digit: string;
        type: 'checking' | 'savings';
    };
    type CreateReciver = {
        map: any;
        data: {
            type: 'individual' | 'corporation';
            external_reference: string;
            name: string;
            mother_name: string;
            birthdate: string;
            monthly_income: number;
            professional_occupation: string;
            company_name: string;
            trading_name: string;
            annual_revenue: number;
            corporation_type: string;
            founding_date: string;
            email: string;
            document: string;
            site_url: string;
            phone_numbers: {
                ddd: string;
                number: string;
            }[];
            address: {
                street: string;
                complementary: string;
                street_number: string;
                neighborhood: string;
                city: string;
                state: string;
                zip_code: string;
                reference_point: string;
            };
            main_address: {
                street: string;
                complementary: string;
                street_number: string;
                neighborhood: string;
                city: string;
                state: string;
                zip_code: string;
                reference_point: string;
            };
            managing_partners: any[];
            default_bank_account: {
                holder_name: string;
                holder_type: 'individual' | 'company';
                holder_document: string;
                bank: string;
                branch_number: string;
                branch_check_digit: string;
                account_number: string;
                account_check_digit: string;
                type: 'checking' | 'savings' | string;
            };
        };
    };
    type CorporationForm = {
        register_information: {
            phone_numbers: Array<{
                ddd: string;
                number: string;
                type: "mobile" | "landline";
            }>;
            main_address: {
                street: string;
                complementary: string;
                street_number: string;
                neighborhood: string;
                city: string;
                state: string;
                zip_code: string;
                reference_point: string;
            };
            company_name: string;
            trading_name: string;
            email: string;
            document: string;
            type: "individual" | "corporation";
            site_url: string;
            annual_revenue: number;
            corporation_type: "LTDA" | "SA" | "MEI";
            founding_date: string;
            managing_partners: Array<{
                name: string;
                email: string;
                document: string;
                type: "individual" | "corporation";
                mother_name: string;
                birthdate: string;
                monthly_income: number;
                professional_occupation: string;
                self_declared_legal_representative: boolean;
                address: {
                    street: string;
                    complementary: string;
                    street_number: string;
                    neighborhood: string;
                    city: string;
                    state: string;
                    zip_code: string;
                    reference_point: string;
                };
                phone_numbers: Array<{
                    ddd: string;
                    number: string;
                    type: "mobile" | "landline";
                }>;
            }>;
        };
        default_bank_account: {
            holder_name: string;
            holder_type: "individual" | "corporation";
            holder_document: string;
            bank: string;
            branch_number: string;
            branch_check_digit: string;
            account_number: string;
            account_check_digit: string;
            type: "checking" | "savings";
        };
        transfer_settings: {
            transfer_enabled: boolean;
            transfer_interval: "Daily" | "Weekly" | "Monthly";
            transfer_day: number;
        };
        automatic_anticipation_settings: {
            enabled: boolean;
            type: "full" | "partial";
            volume_percentage: number;
            delay: number | null;
        };
        code: string;
    };
    type PartnerForm = CreateReciver;
}
