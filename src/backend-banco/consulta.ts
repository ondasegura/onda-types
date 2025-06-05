import z4 from "zod/v4";

namespace ControllerConsulta {
    // Schema base para consulta
    export const ConsultaBaseSchema = z4.object({
        _id: z4.string(),
        data_criacao: z4.string(),
        data_atualizacao: z4.string(),
        ordem_servico_id: z4.string(),
        delete: z4.boolean(),
        consulta: z4.string()
    });
    export type ConsultaBase = z4.infer<typeof ConsultaBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                consulta: z4.object({
                    ordem_servico_id: z4.string(),
                    consulta: z4.object({}).passthrough()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            data: z4.object({
                consulta: ConsultaBaseSchema
            })
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                consulta: z4.object({
                    _id: z4.string().optional(),
                    data_criacao: z4.string().optional(),
                    data_atualizacao: z4.string().optional(),
                    ordem_servico_id: z4.string().optional(),
                    delete: z4.boolean().optional(),
                    consulta: z4.string().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            data: z4.object({
                consultas: z4.array(ConsultaBaseSchema)
            })
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            data: z4.object({
                consulta: ConsultaBaseSchema
            })
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                consulta: z4.object({
                    _id: z4.string(),
                    data_criacao: z4.string().optional(),
                    data_atualizacao: z4.string().optional(),
                    ordem_servico_id: z4.string().optional(),
                    delete: z4.boolean().optional(),
                    consulta: z4.string().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            data: z4.object({
                consulta: ConsultaBaseSchema
            })
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            data: z4.object({
                consulta: ConsultaBaseSchema
            })
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default ControllerConsulta;