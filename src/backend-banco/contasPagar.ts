import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.ContasPagar.Criar.Input
namespace ControllerContasPagar {

    export const ContasPagarStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type ContasPagarStatus = z4.infer<typeof ContasPagarStatusSchema>;

    export const ContasPagarBaseSchema = z4.object({
        _id: z4.string(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        fornecedor: z4.string(),
        descricao: z4.string(),
        valor: z4.number(),
        data_emissao: z4.string(),
        data_vencimento: z4.string(),
        data_pagamento: z4.string().nullable(),
        status: z4.string(),
        forma_pagamento: z4.string(),
        categoria: z4.string(),
        deletado: z4.boolean(),
        ativo: z4.boolean()
    });
    export type ContasPagarBase = z4.infer<typeof ContasPagarBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                contas_pagar: z4.object({
                    fornecedor: z4.string(),
                    descricao: z4.string(),
                    valor: z4.number(),
                    data_emissao: z4.string(),
                    data_vencimento: z4.string(),
                    data_pagamento: z4.string().nullable(),
                    status: z4.string(),
                    forma_pagamento: z4.string(),
                    categoria: z4.string(),
                    deletado: z4.boolean(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContasPagarBaseSchema;
        export type Output = {
            data: {
                contas_pagar: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                contas_pagar: z4.object({
                    _id: z4.string().optional().nullable(),
                    fornecedor: z4.string().optional().nullable(),
                    descricao: z4.string().optional().nullable(),
                    valor: z4.number().optional().nullable(),
                    data_emissao: z4.string().optional().nullable(),
                    data_vencimento: z4.string().optional().nullable(),
                    data_pagamento: z4.string().optional().nullable(),
                    status: z4.string().optional().nullable(),
                    forma_pagamento: z4.string().optional().nullable(),
                    categoria: z4.string().optional().nullable(),
                    deletado: z4.boolean().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(ContasPagarBaseSchema);
        export type Output = {
            data: {
                contas_pagar: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.string()
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContasPagarBaseSchema;
        export type Output = {
            data: {
                contas_pagar: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                contas_pagar: z4.object({
                    _id: z4.string(),
                    fornecedor: z4.string().optional(),
                    descricao: z4.string().optional(),
                    valor: z4.number().optional(),
                    data_emissao: z4.string().optional(),
                    data_vencimento: z4.string().optional(),
                    data_pagamento: z4.string().optional(),
                    status: z4.string().optional(),
                    forma_pagamento: z4.string().optional(),
                    categoria: z4.string().optional(),
                    deletado: z4.boolean().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContasPagarBaseSchema;
        export type Output = {
            data: {
                contas_pagar: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContasPagarBaseSchema;
        export type Output = {
            data: {
                contas_pagar: {}
            }
        }
    }
}

export default ControllerContasPagar;