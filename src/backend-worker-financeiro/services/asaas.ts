import z4 from "zod/v4"


namespace ServiceAsaas {

    export namespace Cobranca {

        export namespace CriarCobrancaBoleto {
            const billingTypes = ['boleto', 'pix', 'credit_card'] as const

            const fineObject = z4.union([z4.literal('PERCENTAGE'), z4.literal('FIXED')])

            export const billingTypeSchema = z4
                .enum(billingTypes)
                .transform((value) => value.toUpperCase() as Uppercase<typeof value>)

            export const InputSchema = z4.object({
                data: z4.object({
                    cobranca: z4.object({
                        billingType: billingTypes,
                        customer: z4.string(),
                        dueDate: z4.date(),
                        description: z4.string(),
                        externalReference: z4.string(),
                        installmentCount: z4.number(),
                        totalValue: z4.number(),
                        postalService: z4.boolean().default(false),
                        interest: z4.object({
                            value: z4.number(),
                        }).optional(),
                        fine: z4.object({
                            value: z4.number(),
                            type: fineObject,
                        }).optional(),
                    })
                })
            });
            export type Input = z4.infer<typeof InputSchema>;

            export const OutputSchema = z4.object({
                object: z4.string(),
                id: z4.string(),
                dateCreated: z4.string(),
                customer: z4.string(),
                installment: z4.string(),
                checkoutSession: z4.string().nullable(),
                paymentLink: z4.string().nullable(),
                value: z4.number(),
                netValue: z4.number(),
                originalValue: z4.number().nullable(),
                interestValue: z4.number().nullable(),
                description: z4.string(),
                billingType: z4.string(),
                canBePaidAfterDueDate: z4.boolean(),
                pixTransaction: z4.string().nullable(),
                status: z4.string(),
                dueDate: z4.string(),
                originalDueDate: z4.string(),
                paymentDate: z4.string().nullable(),
                clientPaymentDate: z4.string().nullable(),
                installmentNumber: z4.number(),
                invoiceUrl: z4.string(),
                invoiceNumber: z4.string(),
                externalReference: z4.string(),
                deleted: z4.boolean(),
                anticipated: z4.boolean(),
                anticipable: z4.boolean(),
                creditDate: z4.string().nullable(),
                estimatedCreditDate: z4.string().nullable(),
                transactionReceiptUrl: z4.string().nullable(),
                nossoNumero: z4.string(),
                bankSlipUrl: z4.string(),
                lastInvoiceViewedDate: z4.string().nullable(),
                lastBankSlipViewedDate: z4.string().nullable(),
                discount: z4.object({
                    value: z4.number(),
                    limitDate: z4.string().nullable(),
                    dueDateLimitDays: z4.number(),
                    type: z4.string(),
                }),
                fine: z4.object({
                    value: z4.number(),
                    type: z4.string(),
                }),
                interest: z4.object({
                    value: z4.number(),
                    type: z4.string(),
                }),
                postalService: z4.boolean(),
                custody: z4.string().nullable(),
                escrow: z4.string().nullable(),
                refunds: z4.string().nullable(),
            });
            export type Output = {
                data: {
                    cobranca: z4.infer<typeof OutputSchema>;
                };
            };
        }
    }

    export namespace Cliente {
        export namespace Criar {
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

            export const OutputSchema = z4.object({
                data: z4.object({
                    cliente: z4.object({
                        object: z4.literal("customer"),
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

            export type Input = z4.infer<typeof InputSchema>;

            export type Output = z4.infer<typeof OutputSchema>;

        }

        export namespace BuscarPeloFiltro {
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
                ),
            });


            export type Input = z4.infer<typeof InputSchema>

            export type Output = {
                data: {
                    clientes: z4.infer<typeof OutputSchema>;
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