namespace TypeCustomer {
    export interface Customer {
        phones: Phone;
        name: string;
        email: string;
        code: string;
        document: string;
        document_type: string;
        type: string;
        gender: 'male' | 'female';
        address: Address;
    }
    type Phone = {
        home_phone: {
            area_code: string;
            number: string;
            country_code: string;
        };
    };
    type Address = {
        city: string;
        country: string;
        state: string;
        neighborhood: string;
        zip_code: string;
        complement: string;
        number: string;
        street: string;
    };
    export type Input = Customer;
    export type Output = Customer & {
        id: string;
    };
}

export default TypeCustomer;
