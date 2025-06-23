import z4 from "zod/v4";
import ControllerRecebedor from "../controllers/recebedor/recebedor";

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR:
// import t from "onda-types"
// t.Financeiro.Services.CriarCliente.Input
namespace SevicePagarme {
    export namespace CriarCliente {
        export const InputSchema = z4.object({
            name: z4.string(),
            email: z4.string().email(),
            code: z4.string(),
            document: z4.string(),
            type: z4.string(),
            document_type: z4.string(),
            gender: z4.string(),
            address: z4
                .object({
                    line_1: z4.string(),
                    line_2: z4.string(),
                    zip_code: z4.string(),
                    city: z4.string(),
                    state: z4.string(),
                    country: z4.string(),
                })
                .optional(),
            birthdate: z4.string().optional(),
            phones: z4.object({
                home_phone: z4
                    .object({
                        country_code: z4.string(),
                        area_code: z4.string(),
                        number: z4.string(),
                    })
                    .optional(),
                mobile_phone: z4
                    .object({
                        country_code: z4.string(),
                        area_code: z4.string(),
                        number: z4.string(),
                    })
                    .optional(),
            }),
            metadata: z4.record(z4.string(), z4.any()).optional(),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.object({
            id: z4.string(),
            name: z4.string(),
            email: z4.string(),
            code: z4.string(),
            document: z4.string(),
            document_type: z4.string(),
            type: z4.string(),
            gender: z4.string(),
            delinquent: z4.boolean(),
            address: z4.object({
                id: z4.string(),
                line_1: z4.string(),
                line_2: z4.string(),
                zip_code: z4.string(),
                city: z4.string(),
                state: z4.string(),
                country: z4.string(),
                status: z4.string(),
                created_at: z4.string(),
                updated_at: z4.string(),
            }),
            created_at: z4.string(),
            updated_at: z4.string(),
            birthdate: z4.string().optional(),
            phones: z4.object({
                home_phone: z4
                    .object({
                        country_code: z4.string(),
                        number: z4.string(),
                        area_code: z4.string(),
                    })
                    .optional(),
                mobile_phone: z4
                    .object({
                        country_code: z4.string(),
                        number: z4.string(),
                        area_code: z4.string(),
                    })
                    .optional(),
            }),
            metadata: z4.record(z4.string(), z4.any()),
        });
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace CriarRecebedor {
        // const recebedorIndividual = ControllerRecebedor.RecebedorIndividualSchema;

        // const recebedorCorporation = ControllerRecebedor.RecebedorEmpresaSchema;

        // const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [recebedorIndividual, recebedorCorporation]);
        // Schemas auxiliares
        const TelefoneBasicoSchema = z4.object({
            ddd: z4.string(),
            numero: z4.string(),
        });

        const TelefoneComTipoSchema = z4.object({
            ddd: z4.string(),
            numero: z4.string(),
            tipo: z4.union([z4.literal("celular"), z4.literal("fixo")]),
        });

        const EnderecoCompletoSchema = z4.object({
            rua: z4.string(),
            complemento: z4.string(),
            numero_rua: z4.string(),
            bairro: z4.string(),
            cidade: z4.string(),
            estado: z4.string(),
            cep: z4.string(),
            ponto_referencia: z4.string(),
        });

        const ContaBancariaSchema = z4.object({
            nome_titular: z4.string(),
            tipo_titular: z4.union([z4.literal("individual"), z4.literal("empresa")]),
            documento_titular: z4.string(),
            banco: z4.string(),
            numero_agencia: z4.string(),
            digito_agencia: z4.string(),
            numero_conta: z4.string(),
            digito_conta: z4.string(),
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
            email: z4.string().email(),
            documento: z4.string(),
            tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]),
            nome_mae: z4.string(),
            data_nascimento: z4.string(),
            renda_mensal: z4.number(),
            ocupacao_profissional: z4.string(),
            representante_legal_autodeclarado: z4.boolean(),
            endereco: EnderecoCompletoSchema,
            telefones: z4.array(TelefoneComTipoSchema),
        });

        export const RecebedorBaseSchema = z4.object({
            _id: z4.uuid().optional(),
            referencia_externa: z4.string(),
            email: z4.string().email(),
            documento: z4.string(),
            site: z4.string(),
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
            renda_mensal: z4.number(),
            ocupacao_profissional: z4.string(),
            endereco: EnderecoCompletoSchema,
        });

        export const RecebedorEmpresaSchema = RecebedorBaseSchema.extend({
            tipo: z4.literal("empresa"),
            razao_social: z4.string(),
            nome_fantasia: z4.string(),
            faturamento_anual: z4.number(),
            tipo_empresa: z4.string(),
            data_fundacao: z4.string(),
            endereco_principal: EnderecoCompletoSchema,
            socios_administradores: z4.array(SocioAdministradorSchema),
        });

        export namespace RecebedorDiscriminado {
            export const InputSchema = z4.discriminatedUnion("tipo", [RecebedorEmpresaSchema, RecebedorIndividualSchema]);
        }

        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: RecebedorDiscriminado,
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorDiscriminado;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }
}

export default SevicePagarme;
