export declare namespace TypeOrder {
    interface Metadata {
        tipo?: string;
        gerarAnexo1?: boolean;
        gerarBoletos?: boolean;
    }
    interface Items {
        amount?: number;
        description?: string;
        quantity?: number;
        code?: string;
    }
    type PaymentMethod = "boleto" | "credit_card" | "debit_card" | "pix";
    type InstallmentsCreditCard = {
        number?: number;
        total?: number;
    };
    export interface CreditCard {
        capture?: boolean;
        statement_descriptor?: "Onda Segura";
        installments?: Array<InstallmentsCreditCard>;
    }
    type AdditionalInformationPix = {
        name?: "Onda Segura";
        value?: string;
    };
    export interface Pix {
        expires_in?: number | string;
        additional_information?: Array<AdditionalInformationPix>;
    }
    export interface Boleto {
        bank?: string;
        instructions?: string;
        due_at?: Date;
    }
    interface Checkout {
        expires_in?: number;
        customer_editable?: boolean;
        skip_checkout_success_page?: boolean;
        default_payment_method?: string;
        success_url?: string;
        readonly accepted_payment_methods?: Array<PaymentMethod>;
        credit_card?: CreditCard;
        pix?: Pix;
        boleto?: Boleto;
    }
    interface Payments {
        payment_method?: "checkout";
        checkout?: Checkout;
    }
    export interface Order {
        code: string;
        customer_id: string;
        metadata?: Metadata;
        items?: Array<Items>;
        payments?: Array<Payments>;
    }
    export {};
}
