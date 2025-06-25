import {ZodIssue} from "zod";
import z4 from "zod/v4";

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR:
// import t from "onda-types"
// t.Financeiro.Recebedor.Criar.Input

export const add_mensagem_campo_obrigatorio = (label: string) => {
    const mensagem_campo_obrigatorio = `O campo '${label}' é obrigatório`;
    return z4
        .string({
            error: mensagem_campo_obrigatorio,
        })
        .trim()
        .min(1, {message: mensagem_campo_obrigatorio});
};

export namespace ControllerRecebedor {
    const remover_simbolos = z4.string().transform((valor) => {
        return valor.replace(/\D/g, "");
    });

    // --- Schemas auxiliares ---

    const TelefoneBasicoSchema = z4.object({
        ddd: add_mensagem_campo_obrigatorio("DDD").length(2, {message: "O DDD deve conter 2 dígitos."}),
        numero: add_mensagem_campo_obrigatorio("Número").length(9, {message: "O número de telefone deve conter 9 dígitos."}),
    });

    const TelefoneComTipoSchema = z4.object({
        ddd: add_mensagem_campo_obrigatorio("DDD").length(2, {message: "O DDD deve conter 2 dígitos."}),
        numero: add_mensagem_campo_obrigatorio("Número").length(9, {message: "O número de telefone deve conter 9 dígitos."}),
        tipo: z4.union([z4.literal("celular"), z4.literal("fixo")]),
    });

    const EnderecoCompletoSchema = z4.object({
        rua: add_mensagem_campo_obrigatorio("Rua"),
        complemento: add_mensagem_campo_obrigatorio("Complemento"),
        numero_rua: add_mensagem_campo_obrigatorio("Número do endereço"),
        bairro: add_mensagem_campo_obrigatorio("Bairro"),
        cidade: add_mensagem_campo_obrigatorio("Cidade"),
        estado: add_mensagem_campo_obrigatorio("Estado"),
        cep: z4.preprocess((valor) => String(valor ?? ""), remover_simbolos.pipe(add_mensagem_campo_obrigatorio("CEP").length(8, {message: "O CEP deve conter 8 dígitos."}))),
        ponto_referencia: add_mensagem_campo_obrigatorio("Ponto de referência"),
    });

    const ContaBancariaSchema = z4.object({
        nome_titular: add_mensagem_campo_obrigatorio("Nome do titular"),
        tipo_titular: z4.union([z4.literal("individual"), z4.literal("empresa")]),
        documento_titular: add_mensagem_campo_obrigatorio("Documento do titular"),
        banco: add_mensagem_campo_obrigatorio("Banco"),
        numero_agencia: add_mensagem_campo_obrigatorio("Número da agência").length(4, {message: "A agência deve conter 4 dígitos."}),
        digito_agencia: add_mensagem_campo_obrigatorio("Dígito da agência").max(1, {message: "O dígito da agência deve conter no máximo 1 dígito."}),
        numero_conta: add_mensagem_campo_obrigatorio("Número da conta").max(13, {message: "O número da conta deve conter no máximo 13 dígitos."}),
        digito_conta: add_mensagem_campo_obrigatorio("Dígito da conta").max(1, {message: "O dígito da conta deve conter no máximo 1 dígito."}),
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
        percentual_volume: add_mensagem_campo_obrigatorio("Percentual de volume"),
        atraso: z4.number().nullable(),
    });

    const SocioAdministradorSchema = z4.object({
        nome: add_mensagem_campo_obrigatorio("Nome do sócio"),
        email: add_mensagem_campo_obrigatorio("Email do sócio").email({message: "O formato do e-mail é inválido."}),
        documento: add_mensagem_campo_obrigatorio("Documento do sócio"),
        tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]),
        nome_mae: add_mensagem_campo_obrigatorio("Nome da mãe do sócio"),
        data_nascimento: add_mensagem_campo_obrigatorio("Data de nascimento do sócio"),
        renda_mensal: z4.number(),
        ocupacao_profissional: add_mensagem_campo_obrigatorio("Ocupação profissional do sócio"),
        representante_legal_autodeclarado: z4.boolean(),
        endereco: EnderecoCompletoSchema,
        telefones: z4.array(TelefoneComTipoSchema),
    });

    // --- Schemas Principais ---

    export const RecebedorBaseSchema = z4.object({
        referencia_externa: add_mensagem_campo_obrigatorio("Referência externa"),
        email: add_mensagem_campo_obrigatorio("Email").email({message: "O formato do e-mail é inválido."}),
        documento: add_mensagem_campo_obrigatorio("Documento"),
        site: z4.string().url({message: "O formato do site é inválido."}).optional(),
        telefones: z4.array(TelefoneBasicoSchema),
        conta_bancaria: ContaBancariaSchema,
        configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
        configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
        codigo: add_mensagem_campo_obrigatorio("Código"),
    });

    export const RecebedorIndividualSchema = RecebedorBaseSchema.extend({
        tipo: z4.literal("individual"),
        nome: add_mensagem_campo_obrigatorio("Nome"),
        nome_mae: add_mensagem_campo_obrigatorio("Nome da mãe"),
        data_nascimento: add_mensagem_campo_obrigatorio("Data de nascimento"),
        renda_mensal: z4.number(),
        ocupacao_profissional: add_mensagem_campo_obrigatorio("Ocupação profissional"),
        endereco: EnderecoCompletoSchema,
    });

    export const RecebedorEmpresaSchema = RecebedorBaseSchema.extend({
        tipo: z4.literal("empresa"),
        razao_social: add_mensagem_campo_obrigatorio("Razão social"),
        nome_fantasia: add_mensagem_campo_obrigatorio("Nome fantasia"),
        faturamento_anual: z4.number(),
        tipo_empresa: add_mensagem_campo_obrigatorio("Tipo da empresa"),
        data_fundacao: add_mensagem_campo_obrigatorio("Data de fundação"),
        endereco_principal: EnderecoCompletoSchema,
        socios_administradores: z4.array(SocioAdministradorSchema),
    });

    const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [RecebedorIndividualSchema, RecebedorEmpresaSchema]);

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
                recebedores: z4.object({
                    tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]).nullable(),
                    referencia_externa: z4.string().nullable(),
                    documento: z4.string().nullable(),
                    email: z4.string().nullable(),
                }),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(Criar.OutputSchema);
        export type Output = {
            data: {
                recebedores: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = Criar.OutputSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace AtualizarPeloId {
        const AtualizazaoSchema = z4.object({
            _id: z4.uuid(),
            tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]),
            referencia_externa: z4.string(),
            nome: z4.string(),
            nome_mae: z4.string(),
            data_nascimento: z4.string(),
            renda_mensal: z4.number(),
            ocupacao_profissional: z4.string(),
            razao_social: z4.string(),
            nome_fantasia: z4.string(),
            faturamento_anual: z4.number(),
            tipo_empresa: z4.string(),
            data_fundacao: z4.string(),
            email: z4.email(),
            documento: z4.string(),
            site: z4.string(),
            telefones: z4.array(TelefoneBasicoSchema),
            endereco: EnderecoCompletoSchema,
            endereco_principal: EnderecoCompletoSchema,
            socios_administradores: z4.array(SocioAdministradorSchema),
            conta_bancaria: ContaBancariaSchema,
            configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
            configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
            codigo: z4.string(),
        });

        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: z4.object({
                    _id: z4.string(),
                    atualizacao: AtualizazaoSchema.partial(),
                }),
            }),
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = Criar.OutputSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string(),
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            sucesso: z4.boolean(),
        });
        export type Output = {
            data: z4.infer<typeof OutputSchema>;
        };
    }
}

export default ControllerRecebedor;
