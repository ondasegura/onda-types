import z4 from "zod/v4"

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Services.CriarCliente.Input
namespace SevicePagarme {

    export namespace CriarCliente {
        export const InputSchema = z4.object({
            name: z4.string(),
            email: z4.string().email(),
            code: z4.string(),
            document: z4.string(),
            type: z4.literal("individual"),
            document_type: z4.literal("CPF"),
            gender: z4.literal("male"),
            address: z4.object({
                line_1: z4.string(),
                line_2: z4.string(),
                zip_code: z4.string(),
                city: z4.string(),
                state: z4.string(),
                country: z4.string(),
            }).optional(),
            birthdate: z4.string(),
            phones: z4.object({
                home_phone: z4.object({
                    country_code: z4.string(),
                    area_code: z4.string(),
                    number: z4.string(),
                }),
                mobile_phone: z4.object({
                    country_code: z4.string(),
                    area_code: z4.string(),
                    number: z4.string(),
                }),
            }),
            metadata: z4.record(z4.string(), z4.any()),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            id: z4.string(),
            name: z4.string(),
            email: z4.string(),
            code: z4.string(),
            document: z4.string(),
            document_type: z4.string(),
            type: z4.string(),
            gender: z4.string(),
            delinquent: z4.boolean(),
            address: z4.object({
                id: z4.string(),
                line_1: z4.string(),
                line_2: z4.string(),
                zip_code: z4.string(),
                city: z4.string(),
                state: z4.string(),
                country: z4.string(),
                status: z4.string(),
                created_at: z4.string(),
                updated_at: z4.string(),
            }),
            created_at: z4.string(),
            updated_at: z4.string(),
            birthdate: z4.string(),
            phones: z4.object({
                home_phone: z4.object({
                    country_code: z4.string(),
                    number: z4.string(),
                    area_code: z4.string(),
                }),
                mobile_phone: z4.object({
                    country_code: z4.string(),
                    number: z4.string(),
                    area_code: z4.string(),
                }),
            }),
            metadata: z4.record(z4.string(), z4.any()),
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default SevicePagarme