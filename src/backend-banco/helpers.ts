import z4 from "zod/v4";


// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Helpers.Criar.Input
namespace ControllerHelpers {
    // Schema para o status do helper
    export const HelperStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type HelperStatus = z4.infer<typeof HelperStatusSchema>;

    // Schema base para o helper
    export const HelperBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        descricao: z4.string().toLowerCase(),
        entidade: z4.string().toLowerCase(),
        ativo: z4.boolean()
    });
    export type HelperBase = z4.infer<typeof HelperBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                helper: z4.object({
                    descricao: z4.string().toLowerCase(),
                    entidade: z4.string().toLowerCase(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = {
            data: {
                helper: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                helper: z4.object({
                    _id: z4.uuidv4().optional(),
                    descricao: z4.string().toLowerCase(),
                    entidade: z4.string().toLowerCase(),
                    ativo: z4.boolean().optional(),
                    usuario_create_id: z4.uuidv4().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(HelperBaseSchema);
        export type Output = {
            data: {
                helpers: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.uuidv4()
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

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                helper: z4.object({
                    _id: z4.uuidv4(),
                    descricao: z4.string().toLowerCase().optional(),
                    entidade: z4.string().toLowerCase().optional(),
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
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = HelperBaseSchema;
        export type Output = {
            data: {
                helper: {}
            }
        }
    }
}

export default ControllerHelpers;


