import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Admin.Criar.Input
namespace ControllerAdmin {

    export const AdminPapelSchema = z4.union([z4.literal("admin"), z4.literal("user")]);
    export type AdminPapel = z4.infer<typeof AdminPapelSchema>;

    export const AdminBaseSchema = z4.object({
        _id: z4.uuidv4(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        nome: z4.string(),
        email: z4.email(),
        senha_hash: z4.string(),
        papel: z4.string(),
        ativo: z4.boolean(),
        permissoes: z4.array(z4.string())
    });
    export type AdminBase = z4.infer<typeof AdminBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                admin: z4.object({
                    nome: z4.string(),
                    email: z4.string().email(),
                    senha_hash: z4.string(),
                    papel: z4.string(),
                    ativo: z4.boolean().optional().default(true),
                    permissoes: z4.array(z4.string())
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AdminBaseSchema;
        export type Output = {
            data: {
                admin: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                admin: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    nome: z4.string().optional().nullable(),
                    email: z4.string().email().optional().nullable(),
                    senha_hash: z4.string().optional().nullable(),
                    papel: z4.string().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    permissoes: z4.array(z4.string()).optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),

            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(AdminBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                admin: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = AdminBaseSchema;
        export type Output = {
            data: {
                admin: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                admin: z4.object({
                    _id: z4.uuidv4(),
                    nome: z4.string().optional(),
                    email: z4.string().email().optional(),
                    senha_hash: z4.string().optional(),
                    papel: z4.string().optional(),
                    ativo: z4.boolean().optional(),
                    permissoes: z4.array(z4.string()).optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AdminBaseSchema;
        export type Output = {
            data: {
                admin: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AdminBaseSchema;
        export type Output = {
            data: {
                admin: {}
            }
        }
    }

    export type TController = {
        Criar: {
            Input: Criar.Input;
            Output: Criar.Output;
        };
        BuscarPeloFiltro: {
            Input: BuscarPeloFiltro.Input;
            Output: BuscarPeloFiltro.Output;
        };
        BuscarPeloId: {
            Input: BuscarPeloId.Input;
            Output: BuscarPeloId.Output;
        };
        AtualizarPeloId: {
            Input: AtualizarPeloId.Input;
            Output: AtualizarPeloId.Output;
        };
        DeletarPeloId: {
            Input: DeletarPeloId.Input;
            Output: DeletarPeloId.Output;
        };
        states: {
            modal: {
                item: BuscarPeloId.Output["data"]["admin"];
                loading: boolean;
            };
            pagina: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["admin"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            pagina_mini_select: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["admin"];
                item_selecionado: BuscarPeloId.Output["data"]["admin"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            formulario: {
                open: boolean;
                atualizar: BuscarPeloId.Output["data"]["admin"];
                criar: Criar.Input["data"]["admin"];
                progress: number;
                loading: boolean;
                loading_submit: boolean;
            };
        };
    };
}

export default ControllerAdmin;