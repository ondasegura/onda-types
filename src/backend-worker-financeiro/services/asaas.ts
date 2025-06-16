import z4 from "zod/v4"


namespace ServiceAsaas {
    export namespace CriarCobranca {
        export const InputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        })
        export const OutputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace CriarCobrancaComCartaoDeCredito {
        export const InputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        })
        export const OutputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default ServiceAsaas