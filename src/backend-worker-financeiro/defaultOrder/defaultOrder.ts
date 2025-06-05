import z4 from "zod/v4";

namespace TypeDefaultOrderRequest {
    // Schema para Phone
    export const PhoneSchema = z4.object({
        area_code: z4.string(),
        number: z4.string(),
        country_code: z4.string()
    });
    export type Phone = z4.infer<typeof PhoneSchema>;

    // Schema para Address
    export const AddressSchema = z4.object({
        street: z4.string(),
        number: z4.string(),
        complement: z4.string().optional(),
        neighborhood: z4.string(),
        city: z4.string(),
        state: z4.string(),
        zipcode: z4.string()
    });
    export type Address = z4.infer<typeof AddressSchema>;

    // Schema para BaseCustomer
    export const BaseCustomerSchema = z4.object({
        name: z4.string().optional(),
        email: z4.string().email().optional(),
        document: z4.string().optional(),
        gender: z4.union([z4.literal("male"), z4.literal("female")]).optional(),
        phone: PhoneSchema.optional(),
        address: AddressSchema.optional(),
        customer_id: z4.string().optional(),
        external_reference: z4.string()
    });
    export type BaseCustomer = z4.infer<typeof BaseCustomerSchema>;

    // Schema para métodos de pagamento
    export const MethodPaymentSchema = z4.union([
        z4.literal("credit_card"),
        z4.literal("boleto"),
        z4.literal("pix")
    ]);

    // Schema para checkout
    export const CheckoutSchema = z4.union([
        z4.literal("pagarme"),
        z4.literal("asaas")
    ]);

    // Schema para BaseDefaultOrderRequest
    export const BaseDefaultOrderRequestSchema = z4.object({
        checkout: CheckoutSchema,
        code: z4.string(),
        customer: BaseCustomerSchema,
        installments: z4.number().int().positive(),
        amount: z4.number().positive(),
        method_payment: z4.array(MethodPaymentSchema).readonly(),
        metadata: z4.record(z4.string(), z4.any()).optional(),
        description: z4.string().optional(),
        external_reference: z4.array(z4.string())
    });
    export type BaseDefaultOrderRequest = z4.infer<typeof BaseDefaultOrderRequestSchema>;
}

export default TypeDefaultOrderRequest;