import z4 from "zod/v4";

namespace TypeReciver {
    // Schema para PhoneNumber
    export const PhoneNumberSchema = z4.object({
        ddd: z4.string(),
        number: z4.string(),
        type: z4.string().optional()
    });
    export type PhoneNumber = z4.infer<typeof PhoneNumberSchema>;

    // Schema para Address
    export const AddressSchema = z4.object({
        street: z4.string(),
        street_number: z4.string(),
        neighborhood: z4.string(),
        city: z4.string(),
        state: z4.string(),
        zip_code: z4.string(),
        complementary: z4.string().optional(),
        reference_point: z4.string().optional()
    });
    export type Address = z4.infer<typeof AddressSchema>;

    // Schema para BankAccount
    export const BankAccountSchema = z4.object({
        holder_name: z4.string(),
        holder_type: z4.union([z4.literal("individual"), z4.literal("company")]),
        holder_document: z4.string(),
        bank: z4.string(),
        branch_number: z4.string(),
        branch_check_digit: z4.string().optional(),
        account_number: z4.string(),
        account_check_digit: z4.string(),
        type: z4.union([z4.literal("checking"), z4.literal("savings")])
    });
    export type BankAccount = z4.infer<typeof BankAccountSchema>;

    // Schema para phone numbers básico (usado em CreateReciver)
    export const BasicPhoneSchema = z4.object({
        ddd: z4.string(),
        number: z4.string()
    });

    // Schema para endereço completo (usado em CreateReciver)
    export const CompleteAddressSchema = z4.object({
        street: z4.string(),
        complementary: z4.string(),
        street_number: z4.string(),
        neighborhood: z4.string(),
        city: z4.string(),
        state: z4.string(),
        zip_code: z4.string(),
        reference_point: z4.string()
    });

    // Schema para conta bancária padrão (usado em CreateReciver)
    export const DefaultBankAccountSchema = z4.object({
        holder_name: z4.string(),
        holder_type: z4.union([z4.literal("individual"), z4.literal("company")]),
        holder_document: z4.string(),
        bank: z4.string(),
        branch_number: z4.string(),
        branch_check_digit: z4.string(),
        account_number: z4.string(),
        account_check_digit: z4.string(),
        type: z4.union([z4.literal("checking"), z4.literal("savings"), z4.string()])
    });

    // Schema para CreateReciver
    export const CreateReciverSchema = z4.object({
        map: z4.any(),
        data: z4.object({
            type: z4.union([z4.literal("individual"), z4.literal("corporation")]),
            external_reference: z4.string(),
            name: z4.string(),
            mother_name: z4.string(),
            birthdate: z4.string(),
            monthly_income: z4.number(),
            professional_occupation: z4.string(),
            company_name: z4.string(),
            trading_name: z4.string(),
            annual_revenue: z4.number(),
            corporation_type: z4.string(),
            founding_date: z4.string(),
            email: z4.string().email(),
            document: z4.string(),
            site_url: z4.string(),
            phone_numbers: z4.array(BasicPhoneSchema),
            address: CompleteAddressSchema,
            main_address: CompleteAddressSchema,
            managing_partners: z4.array(z4.any()),
            default_bank_account: DefaultBankAccountSchema
        })
    });
    export type CreateReciver = z4.infer<typeof CreateReciverSchema>;

    // Schema para phone com tipo específico
    export const TypedPhoneSchema = z4.object({
        ddd: z4.string(),
        number: z4.string(),
        type: z4.union([z4.literal("mobile"), z4.literal("landline")])
    });

    // Schema para managing partner
    export const ManagingPartnerSchema = z4.object({
        name: z4.string(),
        email: z4.string().email(),
        document: z4.string(),
        type: z4.union([z4.literal("individual"), z4.literal("corporation")]),
        mother_name: z4.string(),
        birthdate: z4.string(),
        monthly_income: z4.number(),
        professional_occupation: z4.string(),
        self_declared_legal_representative: z4.boolean(),
        address: CompleteAddressSchema,
        phone_numbers: z4.array(TypedPhoneSchema)
    });

    // Schema para transfer settings
    export const TransferSettingsSchema = z4.object({
        transfer_enabled: z4.boolean(),
        transfer_interval: z4.union([z4.literal("Daily"), z4.literal("Weekly"), z4.literal("Monthly")]),
        transfer_day: z4.number().int()
    });

    // Schema para automatic anticipation settings
    export const AutomaticAnticipationSettingsSchema = z4.object({
        enabled: z4.boolean(),
        type: z4.union([z4.literal("full"), z4.literal("partial")]),
        volume_percentage: z4.number(),
        delay: z4.number().nullable()
    });

    // Schema para conta bancária da corporation
    export const CorporationBankAccountSchema = z4.object({
        holder_name: z4.string(),
        holder_type: z4.union([z4.literal("individual"), z4.literal("corporation")]),
        holder_document: z4.string(),
        bank: z4.string(),
        branch_number: z4.string(),
        branch_check_digit: z4.string(),
        account_number: z4.string(),
        account_check_digit: z4.string(),
        type: z4.union([z4.literal("checking"), z4.literal("savings")])
    });

    // Schema para CorporationForm
    export const CorporationFormSchema = z4.object({
        register_information: z4.object({
            phone_numbers: z4.array(TypedPhoneSchema),
            main_address: CompleteAddressSchema,
            company_name: z4.string(),
            trading_name: z4.string(),
            email: z4.string().email(),
            document: z4.string(),
            type: z4.union([z4.literal("individual"), z4.literal("corporation")]),
            site_url: z4.string(),
            annual_revenue: z4.number(),
            corporation_type: z4.union([z4.literal("LTDA"), z4.literal("SA"), z4.literal("MEI")]),
            founding_date: z4.string(),
            managing_partners: z4.array(ManagingPartnerSchema)
        }),
        default_bank_account: CorporationBankAccountSchema,
        transfer_settings: TransferSettingsSchema,
        automatic_anticipation_settings: AutomaticAnticipationSettingsSchema,
        code: z4.string()
    });
    export type CorporationForm = z4.infer<typeof CorporationFormSchema>;

    // Schema para PartnerForm (alias para CreateReciver)
    export const PartnerFormSchema = CreateReciverSchema;
    export type PartnerForm = z4.infer<typeof PartnerFormSchema>;
}

export default TypeReciver;