import z4 from "zod/v4";

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR:
// import t from "onda-types"
// t.Financeiro.Recebedor.Criar.Input

export namespace ControllerRecebedor {
    export const TipoSchema = z4.union([z4.literal("individual"), z4.literal("empresa")]);
    export type Tipo = z4.infer<typeof TipoSchema>;
    const remover_simbolos = z4.string().transform((valor) => {
        return valor.replace(/\D/g, "");
    });
    // Schemas auxiliaresd
    const TelefoneBasicoSchema = z4.object({
        ddd: z4.string(),
        numero: z4.string(),
    });

    const TelefoneComTipoSchema = z4.object({
        ddd: z4.string().length(2),
        numero: z4.string().min(8),
        tipo: z4
            .union([z4.literal("celular"), z4.literal("fixo")])
            .optional()
            .nullable(),
    });

    const EnderecoCompletoSchema = z4.object({
        rua: z4.string(),
        complemento: z4.string(),
        numero_rua: z4.string(),
        bairro: z4.string(),
        cidade: z4.string(),
        estado: z4.string(),
        cep: z4.preprocess((valor) => String(valor ?? ""), remover_simbolos.pipe(z4.string().length(8))),
        ponto_referencia: z4.string(),
    });

    const ContaBancariaSchema = z4.object({
        nome_titular: z4.string(),
        tipo_titular: z4.union([z4.literal("individual"), z4.literal("empresa")]),
        documento_titular: z4.string(),
        banco: z4.string(),
        numero_agencia: z4.string().length(4),
        digito_agencia: z4
            .string()
            .transform((value) => (value === "" ? null : value))
            .nullable()
            .optional(),
        numero_conta: z4.string().max(13),
        digito_conta: z4.string().max(1),
        tipo: z4.union([z4.literal("corrente"), z4.literal("poupanca"), z4.string()]),
    });

    const ConfiguracoesTransferenciaSchema = z4.object({
        transferencia_habilitada: z4.boolean(),
        intervalo_transferencia: z4.union([z4.literal("Diaria"), z4.literal("Semanal"), z4.literal("Mensal")]),
        dia_transferencia: z4.number().int(),
    });

    const ConfiguracoesAntecipacaoSchema = z4.object({
        habilitado: z4.boolean(),
        tipo: z4.union([z4.literal("completa"), z4.literal("parcial")]),
        percentual_volume: z4.string(),
        atraso: z4.number().nullable(),
    });

    const SocioAdministradorSchema = z4.object({
        nome: z4.string(),
        email: z4.email(),
        documento: z4.string(),
        tipo: z4.literal("individual"),
        nome_mae: z4.string(),
        data_nascimento: z4.string(),
        renda_mensal: z4.number(),
        ocupacao_profissional: z4.string(),
        representante_legal_autodeclarado: z4.boolean(),
        endereco: EnderecoCompletoSchema,
        telefones: z4.array(TelefoneComTipoSchema),
    });

    export const RecebedorBaseSchema = z4.object({
        _id: z4.string().optional(),
        email: z4.email(),
        documento: z4.string(),
        site: z4.string().optional().nullable(),
        telefones: z4.array(TelefoneBasicoSchema),
        conta_bancaria: ContaBancariaSchema,
        configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
        configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
        codigo: z4.string(),
    });

    export const RecebedorIndividualSchema = RecebedorBaseSchema.extend({
        tipo: z4.literal("individual"),
        nome: z4.string(),
        nome_mae: z4.string(),
        data_nascimento: z4.string(),
        renda_mensal: z4.transform((val) => Number(val)),
        ocupacao_profissional: z4.string(),
        endereco: EnderecoCompletoSchema,
    });

    export const RecebedorEmpresaSchema = RecebedorBaseSchema.extend({
        tipo: z4.literal("empresa"),
        razao_social: z4.string(),
        nome_fantasia: z4.string(),
        faturamento_anual: z4.transform((val) => Number(val)),
        tipo_empresa: z4.string(),
        data_fundacao: z4.string(),
        endereco_principal: EnderecoCompletoSchema,
        socios_administradores: z4.array(SocioAdministradorSchema),
    });

    const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [RecebedorEmpresaSchema, RecebedorIndividualSchema]);

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: RecebedorDiscriminadoSchema,
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorDiscriminadoSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                recebedor: z4.object({
                    pagina: z4.number().min(0),
                    tipo: z4
                        .union([z4.literal("individual"), z4.literal("empresa")])
                        .nullable()
                        .optional(),
                    documento: z4.string().nullable().optional(),
                    email: z4.string().nullable().optional(),
                    nome: z4.string().nullable().optional(),
                    nome_fantasia: z4.string().nullable().optional(),
                    razao_social: z4.string().nullable().optional(),
                    usuario_criacao: z4.string().nullable().optional(),
                }),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(Criar.OutputSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                };
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: z4.object({
                    _id: z4.string(),
                }),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                recebedor: z4.infer<typeof RecebedorDiscriminadoSchema>;
            };
        };
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: z4.object({
                    _id: z4.string(),
                    pagarme_recebedor_id: z4.string().optional().nullable(),
                    status: z4.string().optional().nullable(),
                }),
            }),
        });

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                recebedor: z4.infer<typeof RecebedorDiscriminadoSchema>;
            };
        };
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string(),
        });

        export type Input = {
            data: z4.infer<typeof InputSchema>;
        };

        export const OutputSchema = z4.object({
            sucesso: z4.boolean(),
        });
        export type Output = {
            data: z4.infer<typeof OutputSchema>;
        };
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
                item: BuscarPeloId.Output["data"]["recebedor"];
                loading: boolean;
            };
            pagina: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["recebedor"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            pagina_mini_select: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["recebedor"];
                item_selecionado: BuscarPeloId.Output["data"]["recebedor"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            formulario: {
                open: boolean;
                atualizar: BuscarPeloId.Output["data"]["recebedor"];
                criar: Criar.Input["data"]["recebedor"];
                progress: number;
                loading: boolean;
                loading_submit: boolean;
            };
        };
    };
}

export default ControllerRecebedor;
