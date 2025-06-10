// const fisicaSchema = z.object({
//   tipo: z.literal("fisica"),
//   cpf: z.string().min(11),
// });

// const juridicaSchema = z.object({
//   tipo: z.literal("juridica"),
//   cnpj: z.string().min(14),
// });

// const schema = z.discriminatedUnion("tipo", [fisicaSchema, juridicaSchema]);


import z4 from "zod/v4";

// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Reciver.Criar.Input
namespace ControllerReciver {
    // Schemas auxiliares
    const BasicPhoneSchema = z4.object({
      ddd: z4.string(),
      number: z4.string()
    });

    const TypedPhoneSchema = z4.object({
      ddd: z4.string(),
      number: z4.string(),
      type: z4.union([z4.literal("mobile"), z4.literal("landline")])
    });

    const CompleteAddressSchema = z4.object({
      street: z4.string(),
      complementary: z4.string(),
      street_number: z4.string(),
      neighborhood: z4.string(),
      city: z4.string(),
      state: z4.string(),
      zip_code: z4.string(),
      reference_point: z4.string()
    });

    const DefaultBankAccountSchema = z4.object({
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

    const TransferSettingsSchema = z4.object({
      transfer_enabled: z4.boolean(),
      transfer_interval: z4.union([z4.literal("Daily"), z4.literal("Weekly"), z4.literal("Monthly")]),
      transfer_day: z4.number().int()
    });

    const AutomaticAnticipationSettingsSchema = z4.object({
      enabled: z4.boolean(),
      type: z4.union([z4.literal("full"), z4.literal("partial")]),
      volume_percentage: z4.string(),
      delay: z4.number().nullable()
    });

    const ManagingPartnerSchema = z4.object({
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

    const BaseReciverSchema = z4.object({
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
      managing_partners: z4.array(ManagingPartnerSchema),
      default_bank_account: DefaultBankAccountSchema,
      transfer_settings: TransferSettingsSchema,
      automatic_anticipation_settings: AutomaticAnticipationSettingsSchema
    });

    export namespace Criar {
      export const InputSchema = z4.object({
        data: BaseReciverSchema
      });
      export type Input = z4.infer<typeof InputSchema>;

      export const OutputSchema = z4.object({
        _id: z4.string(),
        ...BaseReciverSchema.shape
      });
      export type Output = {
        data: z4.infer<typeof OutputSchema>
      };
    }

    export namespace BuscarPeloFiltro {
      export const InputSchema = z4.object({
        filtros: z4.object({
          type: z4.union([z4.literal("individual"), z4.literal("corporation")]).optional(),
          external_reference: z4.string().optional(),
          document: z4.string().optional(),
          email: z4.string().optional()
        })
      });
      export type Input = z4.infer<typeof InputSchema>;

      export const OutputSchema = z4.array(Criar.OutputSchema);
      export type Output = {
        data: {
          recebedores: z4.infer<typeof OutputSchema>
        }
      };
    }

    export namespace BuscarPeloId {
      export const InputSchema = z4.object({
        data: z4.object({
          _id: z4.string()
        })
      });
      export type Input = z4.infer<typeof InputSchema>;

      export const OutputSchema = Criar.OutputSchema;
      export type Output = {
        data: {
          recebedor: z4.infer<typeof OutputSchema>
        }
      };
    }

    export namespace AtualizarPeloId {
      export const InputSchema = z4.object({
        data: z4.object({
          _id: z4.string(),
          update: BaseReciverSchema.partial()
        })
      });
      export type Input = z4.infer<typeof InputSchema>;

      export const OutputSchema = Criar.OutputSchema;
      export type Output = {
        data: {
          recebedor: z4.infer<typeof OutputSchema>
        }
      };
    }

    export namespace DeletarPeloId {
      export const InputSchema = z4.object({
        _id: z4.string()
      });
      export type Input = z4.infer<typeof InputSchema>;

      export const OutputSchema = z4.object({
        success: z4.boolean()
      });
      export type Output = {
        data: z4.infer<typeof OutputSchema>
      };
    }
}


export default ControllerReciver;

