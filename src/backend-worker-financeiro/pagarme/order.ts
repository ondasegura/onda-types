import z4 from "zod/v4";

namespace TypeOrder {
    // Schema para Metadata
    export const MetadataSchema = z4.object({
        tipo: z4.string().optional(),
        gerarAnexo1: z4.boolean().optional(),
        gerarBoletos: z4.boolean().optional()
    });
    export type Metadata = z4.infer<typeof MetadataSchema>;

    // Schema para Items
    export const ItemsSchema = z4.object({
        amount: z4.number().optional(),
        description: z4.string().optional(),
        quantity: z4.number().int().optional(),
        code: z4.string().optional()
    });
    export type Items = z4.infer<typeof ItemsSchema>;

    // Schema para PaymentMethod
    export const PaymentMethodSchema = z4.union([
        z4.literal("boleto"),
        z4.literal("credit_card"),
        z4.literal("debit_card"),
        z4.literal("pix")
    ]);
    export type PaymentMethod = z4.infer<typeof PaymentMethodSchema>;

    // Schema para InstallmentsCreditCard
    export const InstallmentsCreditCardSchema = z4.object({
        number: z4.number().int().optional(),
        total: z4.number().optional()
    });
    export type InstallmentsCreditCard = z4.infer<typeof InstallmentsCreditCardSchema>;

    // Schema para CreditCard
    export const CreditCardSchema = z4.object({
        capture: z4.boolean().optional(),
        statement_descriptor: z4.literal("Onda Segura").optional(),
        installments: z4.array(InstallmentsCreditCardSchema).optional()
    });
    export type CreditCard = z4.infer<typeof CreditCardSchema>;

    // Schema para AdditionalInformationPix
    export const AdditionalInformationPixSchema = z4.object({
        name: z4.literal("Onda Segura").optional(),
        value: z4.string().optional()
    });
    export type AdditionalInformationPix = z4.infer<typeof AdditionalInformationPixSchema>;

    // Schema para Pix
    export const PixSchema = z4.object({
        expires_in: z4.union([z4.number(), z4.string()]).optional(),
        additional_information: z4.array(AdditionalInformationPixSchema).optional()
    });
    export type Pix = z4.infer<typeof PixSchema>;

    // Schema para Boleto
    export const BoletoSchema = z4.object({
        bank: z4.string().optional(),
        instructions: z4.string().optional(),
        due_at: z4.date().optional()
    });
    export type Boleto = z4.infer<typeof BoletoSchema>;

    // Schema para Checkout
    export const CheckoutSchema = z4.object({
        expires_in: z4.number().optional(),
        customer_editable: z4.boolean().optional(),
        skip_checkout_success_page: z4.boolean().optional(),
        default_payment_method: z4.string().optional(),
        success_url: z4.string().url().optional(),
        accepted_payment_methods: z4.array(PaymentMethodSchema).readonly().optional(),
        credit_card: CreditCardSchema.optional(),
        pix: PixSchema.optional(),
        boleto: BoletoSchema.optional()
    });
    export type Checkout = z4.infer<typeof CheckoutSchema>;

    // Schema para Payments
    export const PaymentsSchema = z4.object({
        payment_method: z4.literal("checkout").optional(),
        checkout: CheckoutSchema.optional()
    });
    export type Payments = z4.infer<typeof PaymentsSchema>;

    // Schema para Order
    export const OrderSchema = z4.object({
        code: z4.string(),
        customer_id: z4.string(),
        metadata: MetadataSchema.optional(),
        items: z4.array(ItemsSchema).optional(),
        payments: z4.array(PaymentsSchema).optional()
    });
    export type Order = z4.infer<typeof OrderSchema>;
}

export default TypeOrder;