import z4 from "zod/v4";
namespace ControllerHelpers {
    // Schema para o status do helper
    export const HelperStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type HelperStatus = z4.infer<typeof HelperStatusSchema>;

    // Schema base para o helper
    export const HelperBaseSchema = z4.object({
        _id: z4.string(),
        criacao: z4.string(),
        atualizacao: z4.string().nullable(),
        create_id: z4.string(),
        descricao: z4.string(),
        entidade: z4.string(),
        ativo: z4.boolean()
    });
    export type HelperBase = z4.infer<typeof HelperBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                helper: z4.object({
                    descricao: z4.string(),
                    entidade: z4.string(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                helper: z4.object({
                    _id: z4.string().optional().nullable(),
                    descricao: z4.string().optional().nullable(),
                    entidade: z4.string().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    create_id: z4.string().optional().nullable()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(HelperBaseSchema);
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: {
                _id: z4.uuidv4()
            }
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = {
            data: {
                helper: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            _id: z4.uuidv4(),
            data: z4.object({
                helper: z4.object({
                    descricao: z4.string().optional(),
                    entidade: z4.string().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = {
            data: {
                helper: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default ControllerHelpers;