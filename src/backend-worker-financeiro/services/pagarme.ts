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
        export const recebedorIndividual = ControllerRecebedor.RecebedorIndividualSchema;

        export const recebedorCorporation = ControllerRecebedor.RecebedorEmpresaSchema;

        export const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [recebedorIndividual, recebedorCorporation]);
        // export namespace Individual {
        //     // const recebedorIndividual = ControllerRecebedor.RecebedorIndividualSchema;

        //     // const recebedorCorporation = ControllerRecebedor.RecebedorEmpresaSchema;

        //     // const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [recebedorIndividual, recebedorCorporation]);

        //     export const InputSchema = z4.object({
        //         data: z4.object({
        //             recebedor: z4.object({
        //                 register_information: z4.object({
        //                     type: z4.literal("individual"),
        //                     phone_numbers: z4.array(
        //                         z4.object({
        //                             ddd: z4.string(),
        //                             number: z4.string(),
        //                             type: z4.literal("mobile"),
        //                         })
        //                     ),
        //                     address: z4.object({
        //                         street: z4.string(),
        //                         complementary: z4.string(),
        //                         street_number: z4.string(),
        //                         neighborhood: z4.string(),
        //                         city: z4.string(),
        //                         state: z4.string(),
        //                         zip_code: z4.string(),
        //                         reference_point: z4.string(),
        //                     }),
        //                     name: z4.string(),
        //                     mother_name: z4.string(),
        //                     birthdate: z4.string(),
        //                     monthly_income: z4.number(),
        //                     professional_occupation: z4.string(),
        //                     email: z4.string().email(),
        //                     document: z4.string(),
        //                     site_url: z4.string(),
        //                 }),
        //                 default_bank_account: z4.object({
        //                     holder_name: z4.string(),
        //                     holder_type: z4.literal("individual"),
        //                     holder_document: z4.string(),
        //                     bank: z4.string(),
        //                     branch_number: z4.string(),
        //                     branch_check_digit: z4.string(),
        //                     account_number: z4.string(),
        //                     account_check_digit: z4.string(),
        //                     type: z4.literal("checking"),
        //                 }),
        //                 transfer_settings: z4.object({
        //                     transfer_enabled: z4.string(),
        //                     transfer_interval: z4.literal("Daily"),
        //                     transfer_day: z4.number(),
        //                 }),
        //                 automatic_anticipation_settings: z4.object({
        //                     enabled: z4.string(),
        //                     type: z4.literal("full"),
        //                     volume_percentage: z4.string(),
        //                     delay: z4.string(),
        //                 }),
        //                 code: z4.string(),
        //             }),
        //         }),
        //     });
        //     export type Input = z4.infer<typeof InputSchema>;

        //     export const OutputSchema = z4.object({
        //         id: z4.string(),
        //         name: z4.string(),
        //         email: z4.string(),
        //         code: z4.string(),
        //         document: z4.string(),
        //         type: z4.string(),
        //         payment_mode: z4.string(),
        //         status: z4.string(),
        //         created_at: z4.string(),
        //         updated_at: z4.string(),
        //         transfer_settings: z4.object({
        //             transfer_enabled: z4.boolean(),
        //             transfer_interval: z4.string(),
        //             transfer_day: z4.number(),
        //         }),
        //         default_bank_account: z4.object({
        //             id: z4.string(),
        //             holder_name: z4.string(),
        //             holder_type: z4.string(),
        //             holder_document: z4.string(),
        //             bank: z4.string(),
        //             branch_number: z4.string(),
        //             branch_check_digit: z4.string(),
        //             account_number: z4.string(),
        //             account_check_digit: z4.string(),
        //             type: z4.string(),
        //             status: z4.string(),
        //             created_at: z4.string(),
        //             updated_at: z4.string(),
        //             metadata: z4.record(z4.string(), z4.any()),
        //         }),
        //         gateway_recipients: z4.array(
        //             z4.object({
        //                 gateway: z4.string(),
        //                 status: z4.string(),
        //                 pgid: z4.string(),
        //                 createdAt: z4.string(),
        //                 updatedAt: z4.string(),
        //             })
        //         ),
        //         automatic_anticipation_settings: z4.object({
        //             enabled: z4.boolean(),
        //             type: z4.string(),
        //             volume_percentage: z4.number(),
        //             delay: z4.number(),
        //         }),
        //         metadata: z4.record(z4.string(), z4.any()),
        //         register_information: z4.object({
        //             email: z4.string(),
        //             document: z4.string(),
        //             type: z4.string(),
        //             site_url: z4.string(),
        //             phone_numbers: z4.array(
        //                 z4.object({
        //                     ddd: z4.string(),
        //                     number: z4.string(),
        //                     type: z4.string(),
        //                 })
        //             ),
        //             name: z4.string(),
        //             mother_name: z4.string(),
        //             birthdate: z4.string(),
        //             monthly_income: z4.string(),
        //             professional_occupation: z4.string(),
        //             address: z4.object({
        //                 street: z4.string(),
        //                 complementary: z4.string(),
        //                 street_number: z4.string(),
        //                 neighborhood: z4.string(),
        //                 city: z4.string(),
        //                 state: z4.string(),
        //                 zip_code: z4.string(),
        //                 reference_point: z4.string(),
        //             }),
        //         }),
        //     });
        //     export type Output = {
        //         data: {
        //             recebedor: z4.infer<typeof OutputSchema>;
        //         };
        //     };
        // }

        // export namespace Empresa {
        //     // const recebedorIndividual = ControllerRecebedor.RecebedorIndividualSchema;

        //     // const recebedorCorporation = ControllerRecebedor.RecebedorEmpresaSchema;

        //     // const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [recebedorIndividual, recebedorCorporation]);

        //     export const InputSchema = z4.object({
        //         data: z4.object({
        //             recebedor: z4.object({
        //                 register_information: z4.object({
        //                     type: z4.literal("corporation"),
        //                     phone_numbers: z4.array(
        //                         z4.object({
        //                             ddd: z4.string(),
        //                             number: z4.string(),
        //                             type: z4.literal("mobile"),
        //                         })
        //                     ),
        //                     main_address: z4.object({
        //                         street: z4.string(),
        //                         complementary: z4.string(),
        //                         street_number: z4.string(),
        //                         neighborhood: z4.string(),
        //                         city: z4.string(),
        //                         state: z4.string(),
        //                         zip_code: z4.string(),
        //                         reference_point: z4.string(),
        //                     }),
        //                     company_name: z4.string(),
        //                     trading_name: z4.string(),
        //                     email: z4.string().email(),
        //                     document: z4.string(),
        //                     site_url: z4.string(),
        //                     annual_revenue: z4.number(),
        //                     corporation_type: z4.literal("LTDA"),
        //                     founding_date: z4.string(),
        //                     managing_partners: z4.array(
        //                         z4.object({
        //                             name: z4.string(),
        //                             email: z4.string().email(),
        //                             document: z4.string(),
        //                             type: z4.literal("individual"),
        //                             mother_name: z4.string(),
        //                             birthdate: z4.string(),
        //                             monthly_income: z4.number(),
        //                             professional_occupation: z4.string(),
        //                             self_declared_legal_representative: z4.boolean(),
        //                             address: z4.object({
        //                                 street: z4.string(),
        //                                 complementary: z4.string(),
        //                                 street_number: z4.string(),
        //                                 neighborhood: z4.string(),
        //                                 city: z4.string(),
        //                                 state: z4.string(),
        //                                 zip_code: z4.string(),
        //                                 reference_point: z4.string(),
        //                             }),
        //                             phone_numbers: z4.array(
        //                                 z4.object({
        //                                     ddd: z4.string(),
        //                                     number: z4.string(),
        //                                     type: z4.literal("mobile"),
        //                                 })
        //                             ),
        //                         })
        //                     ),
        //                 }),
        //                 default_bank_account: z4.object({
        //                     holder_name: z4.string(),
        //                     holder_type: z4.literal("company"),
        //                     holder_document: z4.string(),
        //                     bank: z4.string(),
        //                     branch_number: z4.string(),
        //                     branch_check_digit: z4.string(),
        //                     account_number: z4.string(),
        //                     account_check_digit: z4.string(),
        //                     type: z4.literal("checking"),
        //                 }),
        //                 transfer_settings: z4.object({
        //                     transfer_enabled: z4.string(),
        //                     transfer_interval: z4.literal("Daily"),
        //                     transfer_day: z4.number(),
        //                 }),
        //                 automatic_anticipation_settings: z4.object({
        //                     enabled: z4.string(),
        //                     type: z4.literal("full"),
        //                     volume_percentage: z4.string(),
        //                     delay: z4.string(),
        //                 }),
        //                 code: z4.string(),
        //             }),
        //         }),
        //     });
        //     export type Input = z4.infer<typeof InputSchema>;

        //     export const OutputSchema = z4.object({
        //         id: z4.string(),
        //         name: z4.string(),
        //         email: z4.string(),
        //         code: z4.string(),
        //         document: z4.string(),
        //         type: z4.string(),
        //         payment_mode: z4.string(),
        //         status: z4.string(),
        //         created_at: z4.string(),
        //         updated_at: z4.string(),
        //         transfer_settings: z4.object({
        //             transfer_enabled: z4.boolean(),
        //             transfer_interval: z4.string(),
        //             transfer_day: z4.number(),
        //         }),
        //         default_bank_account: z4.object({
        //             id: z4.string(),
        //             holder_name: z4.string(),
        //             holder_type: z4.string(),
        //             holder_document: z4.string(),
        //             bank: z4.string(),
        //             branch_number: z4.string(),
        //             branch_check_digit: z4.string(),
        //             account_number: z4.string(),
        //             account_check_digit: z4.string(),
        //             type: z4.string(),
        //             status: z4.string(),
        //             created_at: z4.string(),
        //             updated_at: z4.string(),
        //             metadata: z4.record(z4.string(), z4.any()),
        //         }),
        //         gateway_recipients: z4.array(
        //             z4.object({
        //                 gateway: z4.string(),
        //                 status: z4.string(),
        //                 pgid: z4.string(),
        //                 createdAt: z4.string(),
        //                 updatedAt: z4.string(),
        //             })
        //         ),
        //         automatic_anticipation_settings: z4.object({
        //             enabled: z4.boolean(),
        //             type: z4.string(),
        //             volume_percentage: z4.number(),
        //             delay: z4.number(),
        //         }),
        //         metadata: z4.record(z4.string(), z4.any()),
        //         register_information: z4.object({
        //             email: z4.string(),
        //             document: z4.string(),
        //             type: z4.string(),
        //             site_url: z4.string(),
        //             phone_numbers: z4.array(
        //                 z4.object({
        //                     ddd: z4.string(),
        //                     number: z4.string(),
        //                     type: z4.string(),
        //                 })
        //             ),
        //             company_name: z4.string(),
        //             trading_name: z4.string(),
        //             annual_revenue: z4.number(),
        //             corporation_type: z4.literal("LTDA"),
        //             founding_date: z4.string(),
        //             main_address: z4.object({
        //                 street: z4.string(),
        //                 complementary: z4.string(),
        //                 street_number: z4.string(),
        //                 neighborhood: z4.string(),
        //                 city: z4.string(),
        //                 state: z4.string(),
        //                 zip_code: z4.string(),
        //                 reference_point: z4.string(),
        //             }),
        //             managing_partners: z4.array(
        //                 z4.object({
        //                     name: z4.string(),
        //                     email: z4.string().email(),
        //                     document: z4.string(),
        //                     type: z4.literal("individual"),
        //                     mother_name: z4.string(),
        //                     birthdate: z4.string(),
        //                     monthly_income: z4.number(),
        //                     professional_occupation: z4.string(),
        //                     self_declared_legal_representative: z4.boolean(),
        //                     address: z4.object({
        //                         street: z4.string(),
        //                         complementary: z4.string(),
        //                         street_number: z4.string(),
        //                         neighborhood: z4.string(),
        //                         city: z4.string(),
        //                         state: z4.string(),
        //                         zip_code: z4.string(),
        //                         reference_point: z4.string(),
        //                     }),
        //                     phone_numbers: z4.array(
        //                         z4.object({
        //                             ddd: z4.string(),
        //                             number: z4.string(),
        //                             type: z4.literal("mobile"),
        //                         })
        //                     ),
        //                 })
        //             ),
        //         }),
        //     });
        //     export type Output = {
        //         data: {
        //             recebedor: z4.infer<typeof OutputSchema>;
        //         };
        //     };
        // }
    }
}

export default SevicePagarme;
