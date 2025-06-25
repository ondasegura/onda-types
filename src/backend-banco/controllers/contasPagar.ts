import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.ContaPagar.Criar.Input
namespace ControllerContaPagar {

    export const ContaPagarStatusSchema = z4.union([z4.literal("pendente"), z4.literal("pago"), z4.literal("cancelado")]);
    export type ContaPagarStatus = z4.infer<typeof ContaPagarStatusSchema>;

    export const ContaPagarFormaPagamentoSchema = z4.union([z4.literal("boleto"), z4.literal("transferencia"), z4.literal("dinheiro"), z4.literal("cartao")]);
    export type ContaPagarFormaPagamento = z4.infer<typeof ContaPagarFormaPagamentoSchema>;

    export const ContaPagarBaseSchema = z4.object({
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
        status: ContaPagarStatusSchema,
        forma_pagamento: ContaPagarFormaPagamentoSchema,
        categoria: z4.string(),
        deletado: z4.boolean(),
        ativo: z4.boolean()
    });
    export type ContaPagarBase = z4.infer<typeof ContaPagarBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                conta_pagar: z4.object({
                    fornecedor: z4.string(),
                    descricao: z4.string(),
                    valor: z4.number(),
                    data_emissao: z4.string(),
                    data_vencimento: z4.string(),
                    data_pagamento: z4.string().optional().nullable(),
                    status: ContaPagarStatusSchema.optional().default("pendente"),
                    forma_pagamento: ContaPagarFormaPagamentoSchema,
                    categoria: z4.string(),
                    deletado: z4.boolean().optional().default(false),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaPagarBaseSchema;
        export type Output = {
            data: {
                conta_pagar: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                conta_pagar: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.string().optional().nullable(),
                    fornecedor: z4.string().optional().nullable(),
                    descricao: z4.string().optional().nullable(),
                    valor: z4.number().optional().nullable(),
                    data_emissao: z4.string().optional().nullable(),
                    data_vencimento: z4.string().optional().nullable(),
                    data_pagamento: z4.string().optional().nullable(),
                    status: ContaPagarStatusSchema.optional().nullable(),
                    forma_pagamento: ContaPagarFormaPagamentoSchema.optional().nullable(),
                    categoria: z4.string().optional().nullable(),
                    deletado: z4.boolean().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),

            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(ContaPagarBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                conta_pagar: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = ContaPagarBaseSchema;
        export type Output = {
            data: {
                conta_pagar: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                conta_pagar: z4.object({
                    _id: z4.string(),
                    fornecedor: z4.string().optional(),
                    descricao: z4.string().optional(),
                    valor: z4.number().optional(),
                    data_emissao: z4.string().optional(),
                    data_vencimento: z4.string().optional(),
                    data_pagamento: z4.string().optional().nullable(),
                    status: ContaPagarStatusSchema.optional(),
                    forma_pagamento: ContaPagarFormaPagamentoSchema.optional(),
                    categoria: z4.string().optional(),
                    deletado: z4.boolean().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaPagarBaseSchema;
        export type Output = {
            data: {
                conta_pagar: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaPagarBaseSchema;
        export type Output = {
            data: {
                conta_pagar: {}
            }
        }
    }
}

export default ControllerContaPagar;