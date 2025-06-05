import z4 from "zod/v4";

namespace TypeCustomer {
    // Schema para Phone
    export const PhoneSchema = z4.object({
        home_phone: z4.object({
            area_code: z4.string(),
            number: z4.string(),
            country_code: z4.string()
        })
    });
    export type Phone = z4.infer<typeof PhoneSchema>;

    // Schema para Address
    export const AddressSchema = z4.object({
        city: z4.string(),
        country: z4.string(),
        state: z4.string(),
        neighborhood: z4.string(),
        zip_code: z4.string(),
        complement: z4.string(),
        number: z4.string(),
        street: z4.string()
    });
    export type Address = z4.infer<typeof AddressSchema>;

    // Schema para Customer
    export const CustomerSchema = z4.object({
        phones: PhoneSchema,
        name: z4.string(),
        email: z4.string().email(),
        code: z4.string(),
        document: z4.string(),
        document_type: z4.string(),
        type: z4.string(),
        gender: z4.union([z4.literal("male"), z4.literal("female")]),
        address: AddressSchema
    });
    export type Customer = z4.infer<typeof CustomerSchema>;

    // Schema para Input
    export const InputSchema = CustomerSchema;
    export type Input = z4.infer<typeof InputSchema>;

    // Schema para Output
    export const OutputSchema = CustomerSchema.extend({
        id: z4.string()
    });
    export type Output = z4.infer<typeof OutputSchema>;
}

export default TypeCustomer;