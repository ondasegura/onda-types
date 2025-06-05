export declare namespace TypeDefaultOrderRequest {
    type Phone = {
        area_code: string;
        number: string;
        country_code: string;
    };
    type Address = {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipcode: string;
    };
    export interface BaseCustomer {
        name?: string;
        email?: string;
        document?: string;
        gender?: 'male' | 'female';
        phone?: Phone;
        address?: Address;
        customer_id?: string;
        external_reference: string;
    }
    export interface BaseDefaultOrderRequest {
        checkout: 'pagarme' | 'asaas';
        code: string;
        customer: BaseCustomer;
        installments: number;
        amount: number;
        readonly method_payment: Array<'credit_card' | 'boleto' | 'pix'>;
        metadata?: Record<string, any>;
        description?: string;
        external_reference: Array<string>;
    }
    export {};
}
