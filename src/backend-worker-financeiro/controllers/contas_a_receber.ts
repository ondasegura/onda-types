import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Controllers.ContasReceber.Criar.Input
namespace ControllerContasReceber {
    export const SchemaBase = z4.object({
        external_code: z4.string(),
        external_id: z4.number(),
        customer: z4.string(),
        paymente_types: z4.number(),
        payer: z4.string(),
        document: z4.string(),
        checkout: z4.string(),
        status: z4.number(),
        card_number: z4.string(),
        serial_number: z4.string(),
        description: z4.string(),
        amount: z4.number(),
        installment_count: z4.number(),
        installment: z4.number(),
        installment_amaount: z4.number(),
        helper_type_order_id: z4.number(),
        due_date: z4.iso.datetime(),
        meta_data: z4.record(z4.string(), z4.unknown()),
        payment_id: z4.string(),
        code_installment: z4.string(),
        url_charge: z4.string().url(),
        url_invoice: z4.string().url(),
        external_reference_primary: z4.string(),
        external_reference_secondary: z4.string(),
        external_reference_tertiary: z4.string(),
        external_reference_quaternary: z4.string(),
        created_user: z4.string(),
        created_at: z4.iso.datetime(),
        updated_user: z4.string(),
        updated_at: z4.iso.datetime(),
        deleted: z4.boolean()
    });

    export const PhoneSchema = z4.object({
        area_code: z4.string(),
        number: z4.string(),
        country_code: z4.string()
    });
    export type Phone = z4.infer<typeof PhoneSchema>;

    export const AddressSchema = z4.object({
        street: z4.string(),
        number: z4.string(),
        complement: z4.string(),
        neighborhood: z4.string(),
        city: z4.string(),
        state: z4.string(),
        zipcode: z4.string()
    });
    export type Address = z4.infer<typeof AddressSchema>;

    export const CustomerSchema = z4.object({
        name: z4.string(),
        email: z4.string(),
        document: z4.string(),
        phone: PhoneSchema,
        address: AddressSchema,
        external_reference: z4.string()
    });
    export type Customer = z4.infer<typeof CustomerSchema>;

    export const MetadataSchema = z4.record(z4.string(), z4.any());
    export type Metadata = z4.infer<typeof MetadataSchema>;

    export const ClienteIdSchema = z4.object({
        customer_id: z4.string()
    });

    export const MetodosPagamentoSchema = z4.union([
        z4.literal("boleto"),
        z4.literal("credit_card"),
        z4.literal("debit_card"),
        z4.literal("pix")
    ]);

    export type MetodosPagamento = z4.infer<typeof MetodosPagamentoSchema>;

    export const ContasReceberBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        checkout: z4.string(),
        customer: z4.union([CustomerSchema, ClienteIdSchema]),
        installments: z4.number(),
        amount: z4.number(),
        due_at: z4.string(),
        code: z4.string(),
        method_payment: z4.array(z4.string()),
        metadata: MetadataSchema,
        description: z4.string(),
        external_reference: z4.array(z4.string()),
        ativo: z4.boolean()
    });
    export type ContasReceberBase = z4.infer<typeof SchemaBase>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                contasReceber: z4.object({
                    checkout: z4.string(),
                    customer: z4.union([CustomerSchema, ClienteIdSchema]),
                    installments: z4.number(),
                    amount: z4.number(),
                    due_at: z4.string(),
                    code: z4.string(),
                    method_payment: z4.array(MetodosPagamentoSchema),
                    metadata: MetadataSchema,
                    description: z4.string(),
                    external_reference: z4.array(z4.string()),
                    ativo: z4.boolean().optional().default(true)
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = SchemaBase;
        export type Output = {
            data: {
                contasReceber: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                contasReceber: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    checkout: z4.string().optional().nullable(),
                    installments: z4.number().optional().nullable(),
                    amount: z4.number().optional().nullable(),
                    due_at: z4.string().optional().nullable(),
                    code: z4.string().optional().nullable(),
                    description: z4.string().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(SchemaBase);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                contasReceber: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = SchemaBase;
        export type Output = {
            data: {
                contasReceber: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                contasReceber: z4.object({
                    _id: z4.uuidv4(),
                    checkout: z4.string().optional(),
                    customer: CustomerSchema.optional(),
                    installments: z4.number().optional(),
                    amount: z4.number().optional(),
                    due_at: z4.string().optional(),
                    code: z4.string().optional(),
                    method_payment: z4.array(z4.string()).optional(),
                    metadata: MetadataSchema.optional(),
                    description: z4.string().optional(),
                    external_reference: z4.array(z4.string()).optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = SchemaBase;
        export type Output = {
            data: {
                contasReceber: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContasReceberBaseSchema;
        export type Output = {
            data: {
                contasReceber: {}
            }
        }
    }
}

export default ControllerContasReceber;