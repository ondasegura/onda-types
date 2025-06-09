import { z as z4 } from "zod";

export namespace Order {
  export const InputSchema = z4.object({
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
    due_date: z4.string().datetime(),
    meta_data: z4.record(z4.any()),
    payment_id: z4.string(),
    code_installment: z4.string(),
    url_charge: z4.string().url(),
    url_invoice: z4.string().url(),
    external_reference_primary: z4.string(),
    external_reference_secondary: z4.string(),
    external_reference_tertiary: z4.string(),
    external_reference_quaternary: z4.string(),
    created_user: z4.string(),
    created_at: z4.string().datetime(),
    updated_user: z4.string(),
    updated_at: z4.string().datetime(),
    deleted: z4.boolean()
  });

  export type Input = z4.infer<typeof InputSchema>;
}
