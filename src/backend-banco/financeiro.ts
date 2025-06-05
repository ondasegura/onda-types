import z4 from "zod/v4";

namespace ControllerFinanceiro {

    const CreditCardSchema = z4.object({
        holderName: z4.string(),
        number: z4.string(),
        expiryMonth: z4.string(),
        expiryYear: z4.string(),
        ccv: z4.string()
    });

    const CreditCardHolderInfoSchema = z4.object({
        name: z4.string(),
        email: z4.string(),
        cpfCnpj: z4.string(),
        postalCode: z4.string(),
        addressNumber: z4.string(),
        addressComplement: z4.string().nullable(),
        phone: z4.string().nullable(),
        mobilePhone: z4.string().nullable()
    });

    const CartaoCreditoSchema = z4.object({
        creditCard: CreditCardSchema,
        creditCardHolderInfo: CreditCardHolderInfoSchema,
        creditCardToken: z4.string().nullable()
    });

    export type cartaoCredito = z4.infer<typeof CartaoCreditoSchema>;

    export namespace pagarComCartaoDeCredito {
        export const InputSchema = z4.object({
            data: z4.object({
                ordem_servico_id: z4.string(),
                cartao_credito: CartaoCreditoSchema
            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                ordem_servico: {}
            }
        };
    }
}

export default ControllerFinanceiro;