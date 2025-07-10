import z4, { includes } from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Controllers.ContaReceber.Criar.Input
namespace ControllerContaReceber {

    export const ContaReceberStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type ContaReceberStatus = z4.infer<typeof ContaReceberStatusSchema>;
    export const CheckoutSchema = z4.union([
        z4.literal("pagarme"),
        z4.literal("asaas")
    ])
    export const MetodoPagamentoSchema = z4.union([
        z4.literal('credit_card'),
        z4.literal('boleto'),
        z4.literal('debit_card'),
        z4.literal('pix'),
    ])
    export const ContaReceberBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        checkout: CheckoutSchema,
        cliente_id: z4.string(),
        parcelas: z4.number(),
        valor: z4.number(),
        vencimento: z4.iso.datetime(),
        codigo: z4.string(),
        metodo_pagamento: z4.array(MetodoPagamentoSchema).min(1),
        tipo_pagamento: z4.number(),
        descricao: z4.string(),
        referencia_externa_primaria: z4.string(),
        referencia_externa_secundaria: z4.string(),
        referencia_externa_terciaria: z4.string(),
        referencia_externa_quartenaria: z4.string(),
        ativo: z4.boolean(),
        documento_titular: z4.string(),
        titular: z4.string(),
        status: z4.number(),
        numero_cartao: z4.string(),
        numero_serial: z4.string(),
        pagamento_id: z4.string(),
        parcela: z4.number(),
        valor_pacela: z4.number(),
        url_pedido: z4.string(),
        url_cobranca: z4.string(),
        transacao_id: z4.string(),
        metadata: z4.record(z4.string(), z4.any()).optional()
    });
    export type ContaReceberBase = z4.infer<typeof ContaReceberBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                conta_receber: z4.object({
                    checkout: (CheckoutSchema),
                    cliente_id: z4.string(),
                    parcelas: z4.number(),
                    valor: z4.number(),
                    vencimento: z4.iso.datetime().optional(),
                    codigo: z4.string(),
                    metodo_pagamento: z4.array(MetodoPagamentoSchema).min(1),
                    tipo_pagamento: z4.number(),
                    descricao: z4.string(),
                    porcentagem_juros: z4.number().optional(),
                    referencia_externa_primaria: z4.string(),
                    referencia_externa_secundaria: z4.string(),
                    referencia_externa_terciaria: z4.string(),
                    referencia_externa_quartenaria: z4.string(),
                    metadata: z4.record(z4.string(), z4.any()).optional(),
                    status: z4.number().optional(),
                    pagamento_id: z4.string().optional(),
                    parcela: z4.number().optional(),
                    valor_pacela: z4.number().optional(),
                    url_pedido: z4.string().optional(),
                    url_cobranca: z4.string().optional(),
                    transacao_id: z4.string().optional()
                }).refine(
                    (val) => {
                        const checkout = val.checkout === 'pagarme'
                        const aceitaCartao = val.metodo_pagamento.includes("credit_card");
                        const jurosInformado = val.porcentagem_juros !== undefined;
                        return !aceitaCartao || jurosInformado || checkout;
                    },
                    {
                        path: ["porcentagem_juros"],
                        message: "porcentagem_juros é obrigatória quando o método de pagamento inclui cartão de crédito",
                    }
                )

            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaReceberBaseSchema;
        export type Output = {
            data: {
                conta_receber: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                conta_receber: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    checkout: z4.string().optional().nullable(),
                    cliente_id: z4.string().optional().nullable(),
                    parcelas: z4.number().optional().nullable(),
                    valor: z4.number().optional().nullable(),
                    vencimento: z4.string().optional().nullable(),
                    codigo: z4.string().optional().nullable(),
                    metodo_pagamento: z4.array(z4.string()).optional().nullable(),
                    tipo_pagamento: z4.number().optional().nullable(),
                    descricao: z4.string().optional().nullable(),
                    referencia_externa_primaria: z4.string().optional().nullable(),
                    referencia_externa_secundaria: z4.string().optional().nullable(),
                    referencia_externa_terciaria: z4.string().optional().nullable(),
                    referencia_externa_quartenaria: z4.string().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    documento_titular: z4.string().optional().nullable(),
                    titular: z4.string().optional().nullable(),
                    status: z4.number().optional().nullable(),
                    numero_cartao: z4.string().optional().nullable(),
                    numero_serial: z4.string().optional().nullable(),
                    pagamento_id: z4.string().optional().nullable(),
                    parcela: z4.number().optional().nullable(),
                    valor_pacela: z4.number().optional().nullable(),
                    url_pedido: z4.string().optional().nullable(),
                    url_cobranca: z4.string().optional().nullable(),
                    transacao_id: z4.string().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),

            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(ContaReceberBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                conta_receber: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = ContaReceberBaseSchema;
        export type Output = {
            data: {
                conta_receber: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                conta_receber: z4.object({
                    _id: z4.uuidv4(),
                    checkout: z4.string().optional(),
                    cliente_id: z4.string().optional(),
                    parcelas: z4.number().optional(),
                    valor: z4.number().int().optional().describe("O valor original deve ser multiplicado por 100"),
                    vencimento: z4.string().optional(),
                    codigo: z4.string().optional(),
                    metodo_pagamento: z4.array(z4.string()).optional(),
                    tipo_pagamento: z4.number().optional(),
                    descricao: z4.string().optional(),
                    referencia_externa_primaria: z4.string().optional(),
                    referencia_externa_secundaria: z4.string().optional(),
                    referencia_externa_terciaria: z4.string().optional(),
                    referencia_externa_quartenaria: z4.string().optional(),
                    ativo: z4.boolean().optional(),
                    documento_titular: z4.string().optional(),
                    titular: z4.string().optional(),
                    status: z4.number().optional(),
                    numero_cartao: z4.string().optional(),
                    numero_serial: z4.string().optional(),
                    pagamento_id: z4.string().optional(),
                    parcela: z4.number().optional(),
                    valor_pacela: z4.number().optional(),
                    url_pedido: z4.string().optional(),
                    url_cobranca: z4.string().optional(),
                    transacao_id: z4.string().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaReceberBaseSchema;
        export type Output = {
            data: {
                conta_receber: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.uuidv4()
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContaReceberBaseSchema;
        export type Output = {
            data: {
                conta_receber: {}
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
                item: BuscarPeloId.Output["data"]["conta_receber"];
                loading: boolean;
            };
            pagina: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["conta_receber"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            pagina_mini_select: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["conta_receber"];
                item_selecionado: BuscarPeloId.Output["data"]["conta_receber"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            formulario: {
                open: boolean;
                atualizar: BuscarPeloId.Output["data"]["conta_receber"];
                criar: Criar.Input["data"]["conta_receber"];
                progress: number;
                loading: boolean;
                loading_submit: boolean;
            };
        };
    };
}

export default ControllerContaReceber;