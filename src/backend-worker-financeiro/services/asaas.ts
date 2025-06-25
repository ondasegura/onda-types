import z4 from "zod/v4"


namespace ServiceAsaas {
    export namespace CriarCobranca {
        export const InputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        })
        export const OutputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace CriarCobrancaComCartaoDeCredito {
        export const InputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        })
        export const OutputSchema = z4.object({
            data: z4.object({
                asaas: z4.object({
                    descricao: z4.string(),
                    permissao: z4.number(),
                    setor: z4.string(),
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }


    export namespace Cliente {
        export namespace CriarCliente {
            export const InputSchema = z4.object({
                data: z4.object({
                    cliente: z4.object({
                        name: z4.string(),
                        cpfCnpj: z4.string(),
                        email: z4.email(),
                        phone: z4.string(),
                        mobilePhone: z4.string(),
                        address: z4.string(),
                        addressNumber: z4.string(),
                        complement: z4.string(),
                        province: z4.string(),
                        postalCode: z4.string(),
                        externalReference: z4.string(),
                        notificationDisabled: z4.boolean(),
                        additionalEmails: z4.string(),
                        municipalInscription: z4.string(),
                        stateInscription: z4.string(),
                        observations: z4.string(),
                        groupName: z4.null(),
                        company: z4.null(),
                        foreignCustomer: z4.boolean(),
                    })
                })
            });
            export type Input = z4.infer<typeof InputSchema>;

            export const OutputSchema = z4.object({
                data: z4.object({
                    cliente: z4.object({
                        object: z4.string(),
                        id: z4.string(),
                        dateCreated: z4.string(),
                        name: z4.string(),
                        email: z4.string(),
                        phone: z4.string(),
                        mobilePhone: z4.string(),
                        address: z4.string(),
                        addressNumber: z4.string(),
                        complement: z4.string(),
                        province: z4.string(),
                        city: z4.string(),
                        cityName: z4.string(),
                        state: z4.string(),
                        country: z4.string(),
                        postalCode: z4.string(),
                        cpfCnpj: z4.string(),
                        personType: z4.string(),
                        deleted: z4.boolean(),
                        additionalEmails: z4.string(),
                        externalReference: z4.string(),
                        notificationDisabled: z4.boolean(),
                        observations: z4.string(),
                        foreignCustomer: z4.boolean(),
                    })
                })
            });

            export type Output = z4.infer<typeof OutputSchema>;

        }


        export namespace BuscarClientePeloFiltro {
            export const InputSchema = z4.object({
                filtros: z4.object({
                    cliente: z4.object({
                        offset: z4.number().min(0).optional().nullable(),
                        limit: z4.number().min(1).optional().nullable(),
                        name: z4.string().optional().nullable(),
                        email: z4.email().optional().nullable(),
                        cpfCnpj: z4.string().optional().nullable(),
                        groupName: z4.string().optional().nullable(),
                        externalReference: z4.string().optional().nullable(),
                    }),
                }),
            });

            export const OutputSchema = z4.object({
                object: z4.literal("list"),
                hasMore: z4.boolean(),
                totalCount: z4.number(),
                limit: z4.number(),
                offset: z4.number(),
                data: z4.array(
                    z4.object({
                        object: z4.literal("customer"),
                        id: z4.string(),
                        dateCreated: z4.string(),
                        name: z4.string(),
                        email: z4.string(),
                        phone: z4.string().nullable(),
                        mobilePhone: z4.string().nullable(),
                        address: z4.string().nullable(),
                        addressNumber: z4.string().nullable(),
                        complement: z4.string().nullable(),
                        province: z4.string().nullable(),
                        city: z4.string().nullable(),
                        cityName: z4.string().nullable(),
                        state: z4.string(),
                        country: z4.string(),
                        postalCode: z4.string().nullable(),
                        cpfCnpj: z4.string(),
                        personType: z4.string(),
                        deleted: z4.boolean(),
                        additionalEmails: z4.string().nullable(),
                        externalReference: z4.string().nullable(),
                        notificationDisabled: z4.boolean(),
                        observations: z4.string().nullable(),
                        foreignCustomer: z4.boolean(),
                    })
                ),
            });


            export type Input = z4.infer<typeof InputSchema>

            export type Output = {
                data: {
                    cliente: z4.infer<typeof OutputSchema>;
                };
            };
        }

    }

    export namespace Notification {
        export const NotificationEventSchema = z4.union([
            z4.literal('PAYMENT_RECEIVED'),
            z4.literal('PAYMENT_OVERDUE'),
            z4.literal('PAYMENT_DUEDATE_WARNING'),
            z4.literal('PAYMENT_CREATED'),
            z4.literal('PAYMENT_UPDATED'),
            z4.literal('SEND_LINHA_DIGITAVEL')
        ]);
        export type NotificationEvent = z4.infer<typeof NotificationEventSchema>;

        export const NotificationConfigSchema = z4.object({
            object: z4.literal('notification'),
            id: z4.string(),
            customer: z4.string(),
            enabled: z4.boolean(),
            emailEnabledForProvider: z4.boolean(),
            smsEnabledForProvider: z4.boolean(),
            emailEnabledForCustomer: z4.boolean(),
            smsEnabledForCustomer: z4.boolean(),
            phoneCallEnabledForCustomer: z4.boolean(),
            whatsappEnabledForCustomer: z4.boolean(),
            event: NotificationEventSchema,
            scheduleOffset: z4.number(),
            deleted: z4.boolean()
        });
        export type NotificationConfig = z4.infer<typeof NotificationConfigSchema>;
    }
}

export default ServiceAsaas