import z4 from "zod/v4";
import ControllerRecebedor from "../controllers/recebedor";

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR:
// import t from "onda-types"
// t.Financeiro.Services.CriarCliente.Input
namespace SevicePagarme {
    export namespace Cliente {
        export namespace Criar {
            export const InputSchema = z4.object({
                name: z4.string(),
                email: z4.email(),
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
                }).optional(),
                metadata: z4.record(z4.string(), z4.any()).optional(),
            });
            export type Input = z4.infer<typeof InputSchema>;

            export const OutputSchema = z4.object({
                id: z4.string(),
                name: z4.string(),
                email: z4.email(),
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
    }

    export namespace Recebedor {
        const remover_simbolos = z4.string().transform((valor) => {
            return valor.replace(/\D/g, "");
        });

        const dd_mm_aaaa = z4.string().transform((valor) => {
            return valor.replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, "");
        });
        export namespace Criar {
            const TelefoneComTipoSchema = z4.object({
                ddd: z4.string().length(2),
                number: z4.string().length(9),
                type: z4.union([z4.literal("mobile"), z4.literal("landline")]),
            });

            const EnderecoCompletoSchema = z4.object({
                street: z4.string(),
                complementary: z4.string(),
                street_number: z4.string(),
                neighborhood: z4.string(),
                city: z4.string(),
                state: z4.string(),
                zip_code: z4.preprocess((valor) => String(valor ?? ""), remover_simbolos.pipe(z4.string().length(8))),
                reference_point: z4.string(),
            });

            const ContaBancariaSchema = z4.object({
                holder_name: z4.string(),
                holder_type: z4.union([z4.literal("individual"), z4.literal("company")]),
                holder_document: z4.string(),
                bank: z4.string(),
                branch_number: z4.string().length(4),
                branch_check_digit: z4.string().max(1),
                account_number: z4.string().max(13),
                account_check_digit: z4.string().max(1),
                type: z4.union([z4.literal("checking"), z4.literal("savings"), z4.string()]),
            });

            const ConfiguracoesTransferenciaSchema = z4.object({
                transfer_enabled: z4.boolean(),
                transfer_interval: z4.union([z4.literal("Daily"), z4.literal("Weekly"), z4.literal("Monthly")]),
                transfer_day: z4.number().int(),
            });

            const ConfiguracoesAntecipacaoSchema = z4.object({
                enabled: z4.boolean(),
                type: z4.union([z4.literal("full"), z4.literal("1025")]),
                volume_percentage: z4.string(),
                delay: z4.number().nullable(),
            });

            const SocioAdministradorSchema = z4.object({
                name: z4.string(),
                email: z4.email(),
                document: z4.string().max(11),
                type: z4.literal("individual"),
                mother_name: z4.string(),
                birthdate: z4.preprocess((valor) => String(valor ?? ""), dd_mm_aaaa.pipe(z4.string())),
                monthly_income: z4.number(),
                professional_occupation: z4.string(),
                self_declared_legal_representative: z4.boolean(),
                address: EnderecoCompletoSchema,
                phone_numbers: z4.array(TelefoneComTipoSchema),
            });

            const RegisterInformationIndividualSchema = z4.object({
                type: z4.literal("individual"),
                email: z4.email(),
                document: z4.string().max(11),
                name: z4.string(),
                mother_name: z4.string().optional(),
                birthdate: z4.preprocess((valor) => String(valor ?? ""), dd_mm_aaaa.pipe(z4.string())),
                monthly_income: z4.number(),
                professional_occupation: z4.string(),
                address: EnderecoCompletoSchema,
                phone_numbers: z4.array(TelefoneComTipoSchema),
                site_url: z4.string().url().optional(),
            });

            const RegisterInformationCorporationSchema = z4.object({
                type: z4.literal("corporation"),
                email: z4.email(),
                document: z4.string(),
                company_name: z4.string(),
                trading_name: z4.string(),
                corporation_type: z4.string(),
                founding_date: z4.string(),
                annual_revenue: z4.number(),
                main_address: EnderecoCompletoSchema,
                phone_numbers: z4.array(TelefoneComTipoSchema),
                managing_partners: z4.array(SocioAdministradorSchema),
                site_url: z4.string().url().optional(),
            });

            const RegisterInformationDiscriminadoSchema = z4.discriminatedUnion("type", [RegisterInformationCorporationSchema, RegisterInformationIndividualSchema]);

            export const InputSchema = z4.object({
                register_information: RegisterInformationDiscriminadoSchema,
                default_bank_account: ContaBancariaSchema,
                transfer_settings: ConfiguracoesTransferenciaSchema,
                automatic_anticipation_settings: ConfiguracoesAntecipacaoSchema,
                code: z4.string(),
            });

            export const OutputSchema = InputSchema;

            export type Input = z4.infer<typeof InputSchema>;
            export type Output = {
                data: {
                    recebedor: z4.infer<typeof OutputSchema>;
                };
            };
        }
    }

    export namespace Pedido {

        export namespace Criar{

            export const PixSchema = z4.object({
                expires_in: z4.string(),
                additional_information: z4.array(z4.object({
                    name: z4.string(),
                    value: z4.string(),
                })),
            }).optional()

            export const BoletoSchema = z4.object({
                bank: z4.string(),
                due_at: z4.string(),
                instructions: z4.string(),
            }).optional()
            export const CartaoDeCreditoSchema = z4.object({
                    capture: z4.boolean(),
                    statement_descriptor: z4.string(),
                    installments: z4.array(z4.object({
                        number: z4.number(),
                        total: z4.number(),
                })),
            }).optional()

            export const InputSchema = z4.object({
                data: z4.object({
                    order: z4.object({
                        code: z4.string(),
                        customer_id: z4.string(),
                        metadata: z4.record(z4.string(), z4.any()). optional(),
                        items: z4.array(z4.object({
                            amount: z4.number(),
                            code: z4.string(),
                            description: z4.string(),
                            quantity: z4.number(),
                        })),
                        payments: z4.array(z4.object({
                            payment_method: z4.literal("checkout"),
                            checkout: z4.object({
                                accepted_payment_methods: z4.array(z4.enum(["boleto", "pix", "credit_card"])),
                                customer_editable: z4.boolean(),
                                default_payment_method: z4.enum(["boleto", "pix", "credit_card"]),
                                expires_in: z4.number(),
                                skip_checkout_success_page: z4.boolean(),
                                success_url: z4.string(),
                                boleto: PixSchema,
                                pix: BoletoSchema,
                                credit_card: CartaoDeCreditoSchema
                            }),
                        })),
                    })
                })
            });
            export type Input = z4.infer<typeof InputSchema>;

            export const OutputSchema = z4.object({
                id: z4.string(),
                code: z4.string(),
                amount: z4.number(),
                currency: z4.string(),
                closed: z4.boolean(),
                items: z4.array(z4.object({
                    id: z4.string(),
                    type: z4.string(),
                    description: z4.string(),
                    amount: z4.number(),
                    quantity: z4.number(),
                    status: z4.string(),
                    created_at: z4.string(),
                    updated_at: z4.string(),
                    code: z4.string(),
                })),
                customer: z4.object({
                    id: z4.string(),
                    name: z4.string(),
                    email: z4.string(),
                    code: z4.string(),
                    document: z4.string(),
                    document_type: z4.string(),
                    type: z4.string(),
                    gender: z4.string(),
                    delinquent: z4.boolean(),
                    created_at: z4.string(),
                    updated_at: z4.string(),
                    phones: z4.record(z4.string(), z4.any()),
                }),
                status: z4.string(),
                created_at: z4.string(),
                updated_at: z4.string(),
                checkouts: z4.array(z4.object({
                    id: z4.string(),
                    currency: z4.string(),
                    amount: z4.number(),
                    status: z4.string(),
                    default_payment_method: z4.string(),
                    success_url: z4.string(),
                    payment_url: z4.string(),
                    customer_editable: z4.boolean(),
                    required_fields: z4.array(z4.string()),
                    billing_address_editable: z4.boolean(),
                    skip_checkout_success_page: z4.boolean(),
                    shippable: z4.boolean(),
                    created_at: z4.string(),
                    updated_at: z4.string(),
                    expires_at: z4.string(),
                    accepted_payment_methods: z4.array(z4.string()),
                    accepted_brands: z4.array(z4.string()),
                    accepted_multi_payment_methods: z4.array(z4.any()),
                    customer: z4.object({
                        id: z4.string(),
                        name: z4.string(),
                        email: z4.string(),
                        code: z4.string(),
                        document: z4.string(),
                        document_type: z4.string(),
                        type: z4.string(),
                        gender: z4.string(),
                        delinquent: z4.boolean(),
                        created_at: z4.string(),
                        updated_at: z4.string(),
                        phones: z4.record(z4.string(), z4.any()),
                    }),
                    credit_card: z4.object({
                        capture: z4.boolean(),
                        statementDescriptor: z4.string(),
                        statement_descriptor: z4.string(),
                        authentication: z4.object({
                            type: z4.string(),
                            threed_secure: z4.record(z4.string(), z4.any()),
                        }),
                        installments: z4.array(z4.object({
                            number: z4.number(),
                            total: z4.number(),
                        })),
                    }).optional(),
                    boleto: z4.object({
                        due_at: z4.string(),
                        instructions: z4.string(),
                    }).optional(),
                    pix: z4.object({
                        expires_at: z4.string(),
                        additional_information: z4.array(z4.object({
                            name: z4.string(),
                            value: z4.string(),
                        })),
                    }).optional(),
                    billing_address: z4.record(z4.string(), z4.any()),
                    metadata: z4.record(z4.string(), z4.any()),
                })),
                metadata: z4.record(z4.string(), z4.any()),
            });
            export type Output = {
                data: {
                    pedido: z4.infer<typeof OutputSchema>;
                };
            };
        }
    }
}

export default SevicePagarme;
