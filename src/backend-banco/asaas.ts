import z4 from "zod/v4";

namespace ControllerAsaas {
    // Schemas para tipos básicos
    export const BillingTypeSchema = z4.union([
        z4.literal("PIX"),
        z4.literal("BOLETO"),
        z4.literal("CREDIT_CARD"),
        z4.literal("UNDEFINED")
    ]);
    export type BillingType = z4.infer<typeof BillingTypeSchema>;

    export const NotificationEventSchema = z4.union([
        z4.literal('PAYMENT_RECEIVED'),
        z4.literal('PAYMENT_OVERDUE'),
        z4.literal('PAYMENT_DUEDATE_WARNING'),
        z4.literal('PAYMENT_CREATED'),
        z4.literal('PAYMENT_UPDATED'),
        z4.literal('SEND_LINHA_DIGITAVEL')
    ]);
    export type NotificationEvent = z4.infer<typeof NotificationEventSchema>;

    // Schema para NotificationConfig
    export const NotificationConfigSchema = z4.object({
        object: z4.literal('notification'),
        id: z4.string(),
        customer: z4.string(),
        enabled: z4.boolean(),
        emailEnabledForProvider: z4.boolean(),
        smsEnabledForProvider: z4.boolean(),
        emailEnabledForCustomer: z4.boolean(),
        smsEnabledForCustomer: z4.boolean(),
        phoneCallEnabledForCustomer: z4.boolean(),
        whatsappEnabledForCustomer: z4.boolean(),
        event: NotificationEventSchema,
        scheduleOffset: z4.number(),
        deleted: z4.boolean()
    });
    export type NotificationConfig = z4.infer<typeof NotificationConfigSchema>;

    // Schema para Customer
    export const CustomerSchema = z4.object({
        object: z4.literal('customer'),
        id: z4.string(),
        dateCreated: z4.string(),
        name: z4.string(),
        email: z4.string(),
        company: z4.string().nullable(),
        phone: z4.string(),
        mobilePhone: z4.string(),
        address: z4.string().nullable(),
        addressNumber: z4.string().nullable(),
        complement: z4.string().nullable(),
        province: z4.string().nullable(),
        postalCode: z4.string().nullable(),
        cpf_cnpj: z4.string(),
        personType: z4.literal('FISICA'),
        deleted: z4.boolean(),
        additionalEmails: z4.string().nullable(),
        externalReference: z4.string(),
        notificationDisabled: z4.boolean(),
        observations: z4.string().nullable(),
        municipalInscription: z4.string().nullable(),
        stateInscription: z4.string().nullable(),
        canDelete: z4.boolean(),
        cannotBeDeletedReason: z4.string().nullable(),
        canEdit: z4.boolean(),
        cannotEditReason: z4.string().nullable(),
        city: z4.string().nullable(),
        cityName: z4.string().nullable(),
        state: z4.string().nullable(),
        country: z4.literal('Brasil')
    });
    export type Customer = z4.infer<typeof CustomerSchema>;

    // Schema para InfoPagamento
    export const InfoPagamentoSchema = z4.object({
        pix: z4.object({
            payload: z4.string(),
            expirationDate: z4.string().optional(),
            encodedImage: z4.string().optional()
        }).optional(),
        bankSlip: z4.object({
            identificationField: z4.string().optional(),
            nossoNumero: z4.string().optional(),
            barCode: z4.string().optional(),
            daysAfterDueDateToRegistrationCancellation: z4.string().optional(),
            bankSlipUrl: z4.string().optional()
        }).optional(),
        creditCard: z4.object({
            creditCardNumber: z4.string().optional(),
            creditCardBrand: z4.string().optional()
        }).optional()
    });
    export type InfoPagamento = z4.infer<typeof InfoPagamentoSchema>;

    // Schemas para tipos auxiliares
    export const DiscountInfoSchema = z4.object({
        value: z4.number(),
        limitDate: z4.string().nullable(),
        dueDateLimitDays: z4.number(),
        type: z4.union([z4.literal('FIXED'), z4.literal('PERCENTAGE')])
    });
    export type DiscountInfo = z4.infer<typeof DiscountInfoSchema>;

    export const FineInfoSchema = z4.object({
        value: z4.number(),
        type: z4.union([z4.literal('FIXED'), z4.literal('PERCENTAGE')])
    });
    export type FineInfo = z4.infer<typeof FineInfoSchema>;

    export const InterestInfoSchema = z4.object({
        value: z4.number(),
        type: z4.union([z4.literal('FIXED'), z4.literal('PERCENTAGE')])
    });
    export type InterestInfo = z4.infer<typeof InterestInfoSchema>;

    // Schema para PagamentoAsaas
    export const PagamentoAsaasSchema = z4.object({
        object: z4.literal("payment"),
        id: z4.string(),
        dateCreated: z4.string(),
        customer: z4.string(),
        checkoutSession: z4.string().nullable(),
        paymentLink: z4.string().nullable(),
        value: z4.number(),
        netValue: z4.number(),
        originalValue: z4.number().nullable(),
        interestValue: z4.number().nullable(),
        description: z4.string().nullable(),
        billingType: BillingTypeSchema,
        pixTransaction: z4.any().nullable(),
        status: z4.string(),
        dueDate: z4.string(),
        originalDueDate: z4.string(),
        paymentDate: z4.string().nullable(),
        clientPaymentDate: z4.string().nullable(),
        installmentNumber: z4.number().nullable(),
        invoiceUrl: z4.string(),
        invoiceNumber: z4.string(),
        externalReference: z4.string().nullable(),
        deleted: z4.boolean(),
        anticipated: z4.boolean(),
        anticipable: z4.boolean(),
        creditDate: z4.string().nullable(),
        estimatedCreditDate: z4.string().nullable(),
        transactionReceiptUrl: z4.string().nullable(),
        nossoNumero: z4.string(),
        bankSlipUrl: z4.string(),
        lastInvoiceViewedDate: z4.string().nullable(),
        lastBankSlipViewedDate: z4.string().nullable(),
        discount: DiscountInfoSchema,
        fine: FineInfoSchema,
        interest: InterestInfoSchema,
        postalService: z4.boolean(),
        custody: z4.any().nullable(),
        escrow: z4.any().nullable(),
        refunds: z4.any().nullable()
    });
    export type PagamentoAsaas = z4.infer<typeof PagamentoAsaasSchema>;

    // Schema para Payment

    export type Payment = z4.infer<typeof PagamentoAsaasSchema>;

    // Schema para receberNotificacaoPagamentoCheckoutTransparente
    export const ReceberNotificacaoPagamentoCheckoutTransparenteSchema = z4.object({
        id: z4.string(),
        event: z4.string(),
        dateCreated: z4.string(),
        payment: PagamentoAsaasSchema
    });
    export type ReceberNotificacaoPagamentoCheckoutTransparente = z4.infer<typeof ReceberNotificacaoPagamentoCheckoutTransparenteSchema>;
}

export default ControllerAsaas;