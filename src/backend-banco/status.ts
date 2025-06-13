import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Status.Criar.Input
namespace ControllerStatus {

    export const StatusStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type StatusStatus = z4.infer<typeof StatusStatusSchema>;

    export const StatusBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        name: z4.string(),
        code: z4.string(),
        description: z4.string(),
        color: z4.string(),
        icon: z4.string(),
        priority: z4.number(),
        ativo: z4.boolean()
    });
    export type StatusBase = z4.infer<typeof StatusBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                status: z4.object({
                    name: z4.string(),
                    code: z4.string(),
                    description: z4.string(),
                    color: z4.string(),
                    icon: z4.string(),
                    priority: z4.number(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = StatusBaseSchema;
        export type Output = {
            data: {
                status: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                status: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    name: z4.string().optional().nullable(),
                    code: z4.string().optional().nullable(),
                    description: z4.string().optional().nullable(),
                    color: z4.string().optional().nullable(),
                    icon: z4.string().optional().nullable(),
                    priority: z4.number().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),

            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(StatusBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: Number;
                    total_paginas: number
                },
                status: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = StatusBaseSchema;
        export type Output = {
            data: {
                status: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                status: z4.object({
                    _id: z4.uuidv4(),
                    name: z4.string().optional(),
                    code: z4.string().optional(),
                    description: z4.string().optional(),
                    color: z4.string().optional(),
                    icon: z4.string().optional(),
                    priority: z4.number().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = StatusBaseSchema;
        export type Output = {
            data: {
                status: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = StatusBaseSchema;
        export type Output = {
            data: {
                status: {}
            }
        }
    }
}

export default ControllerStatus;