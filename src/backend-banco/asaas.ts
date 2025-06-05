namespace ControllerAsaas {
    type BillingType = "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED"

    type NotificationEvent =
        | 'PAYMENT_RECEIVED'
        | 'PAYMENT_OVERDUE'
        | 'PAYMENT_DUEDATE_WARNING'
        | 'PAYMENT_CREATED'
        | 'PAYMENT_UPDATED'
        | 'SEND_LINHA_DIGITAVEL';

    export interface NotificationConfig {
        object: 'notification';
        id: string;
        customer: string;
        enabled: boolean;
        emailEnabledForProvider: boolean;
        smsEnabledForProvider: boolean;
        emailEnabledForCustomer: boolean;
        smsEnabledForCustomer: boolean;
        phoneCallEnabledForCustomer: boolean;
        whatsappEnabledForCustomer: boolean;
        event: NotificationEvent;
        scheduleOffset: number;
        deleted: boolean;
    }


    export interface Customer {
        object: 'customer';
        id: string;
        dateCreated: string;
        name: string;
        email: string;
        company: string | null;
        phone: string;
        mobilePhone: string;
        address: string | null;
        addressNumber: string | null;
        complement: string | null;
        province: string | null;
        postalCode: string | null;
        cpf_cnpj: string;
        personType: 'FISICA';
        deleted: boolean;
        additionalEmails: string | null;
        externalReference: string;
        notificationDisabled: boolean;
        observations: string | null;
        municipalInscription: string | null;
        stateInscription: string | null;
        canDelete: boolean;
        cannotBeDeletedReason: string | null;
        canEdit: boolean;
        cannotEditReason: string | null;
        city: string | null;
        cityName: string | null;
        state: string | null;
        country: 'Brasil';
    }

    export interface InfoPagamento {
        pix?: {
            encodedImage: string;
            qrcode?: string;
            chave?: string;
            nomeBeneficiario?: string;
            cidade?: string;
        };
        bankSlip?: {
            url?: string;
            codigoBarras?: string;
            linhaDigitavel?: string;
            vencimento?: string;
            nomeBeneficiario?: string;
            documentoBeneficiario?: string;
        };
        creditCard?: {
            autorizacao?: string;
            bandeira?: string;
            ultimosDigitos?: string;
            nomeTitular?: string;
            statusTransacao?: string;
        };
    };


    export interface PagamentoAsaas {
        object: "payment";
        id: string;
        dateCreated: string;
        customer: string;
        checkoutSession: string | null;
        paymentLink: string | null;
        value: number;
        netValue: number;
        originalValue: number | null;
        interestValue: number | null;
        description: string | null;
        billingType: BillingType;
        pixTransaction: any | null;
        status: string;
        dueDate: string;
        originalDueDate: string;
        paymentDate: string | null;
        clientPaymentDate: string | null;
        installmentNumber: number | null;
        invoiceUrl: string;
        invoiceNumber: string;
        externalReference: string | null;
        deleted: boolean;
        anticipated: boolean;
        anticipable: boolean;
        creditDate: string | null;
        estimatedCreditDate: string | null;
        transactionReceiptUrl: string | null;
        nossoNumero: string;
        bankSlipUrl: string;
        lastInvoiceViewedDate: string | null;
        lastBankSlipViewedDate: string | null;
        discount: {
            value: number;
            limitDate: string | null;
            dueDateLimitDays: number;
            type: string;
        };
        fine: {
            value: number;
            type: string;
        };
        interest: {
            value: number;
            type: string;
        };
        postalService: boolean;
        custody: any | null;
        escrow: any | null;
        refunds: any | null;
    }


    interface DiscountInfo {
        value: number;
        limitDate: string | null;
        dueDateLimitDays: number;
        type: 'FIXED' | 'PERCENTAGE';
    }

    interface FineInfo {
        value: number;
        type: 'FIXED' | 'PERCENTAGE';
    }

    interface InterestInfo {
        value: number;
        type: 'FIXED' | 'PERCENTAGE';
    }

    interface Payment {
        object: string;
        id: string;
        dateCreated: string;
        customer: string;
        installment: string;
        checkoutSession: string | null;
        paymentLink: string | null;
        value: number;
        netValue: number;
        originalValue: number | null;
        interestValue: number | null;
        description: string;
        billingType: string;
        canBePaidAfterDueDate: boolean;
        pixTransaction: string | null;
        status: string;
        dueDate: string;
        originalDueDate: string;
        paymentDate: string | null;
        clientPaymentDate: string | null;
        installmentNumber: number;
        invoiceUrl: string;
        invoiceNumber: string;
        externalReference: string;
        deleted: boolean;
        anticipated: boolean;
        anticipable: boolean;
        creditDate: string | null;
        estimatedCreditDate: string | null;
        transactionReceiptUrl: string | null;
        nossoNumero: string;
        bankSlipUrl: string;
        lastInvoiceViewedDate: string | null;
        lastBankSlipViewedDate: string | null;
        discount: DiscountInfo;
        fine: FineInfo;
        interest: InterestInfo;
        postalService: boolean;
        custody: string | null;
        escrow: string | null;
        refunds: string | null;
    }

    export interface receberNotificacaoPagamentoCheckoutTransparente {
        id: string;
        event: string;
        dateCreated: string;
        payment: Payment;
    }
}

export default ControllerAsaas