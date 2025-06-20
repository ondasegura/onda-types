import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Controllers.Clientes.Criar.Input
namespace ControllerClientes {

   export const ClientesStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
   export type ClientesStatus = z4.infer<typeof ClientesStatusSchema>;

   export const ClientesBaseSchema = z4.object({
       _id: z4.uuid(),
       data_criacao: z4.date(),
       data_atualizacao: z4.date().nullable(),
       usuario_create_id: z4.uuidv4(),
       name: z4.string(),
       email: z4.string(),
       document: z4.string(),
       phone: z4.object({
           country_code: z4.string(),
           area_code: z4.string(),
           number: z4.string()
       }),
       address: z4.object({
           street: z4.string(),
           number: z4.string(),
           complement: z4.string(),
           neighborhood: z4.string(),
           city: z4.string(),
           state: z4.string(),
           postal_code: z4.string()
       }),
       external_reference: z4.string(),
       uuid_external: z4.object({
           id: z4.string()
       }),
       created_by: z4.string(),
       organization: z4.string(),
       ativo: z4.boolean()
   });
   export type ClientesBase = z4.infer<typeof ClientesBaseSchema>;

   export namespace Criar {
       export const InputSchema = z4.object({
           data: z4.object({
               clientes: z4.object({
                   name: z4.string(),
                   email: z4.string(),
                   document: z4.string(),
                   phone: z4.object({
                       country_code: z4.string(),
                       area_code: z4.string(),
                       number: z4.string()
                   }),
                   address: z4.object({
                       street: z4.string(),
                       number: z4.string(),
                       complement: z4.string(),
                       neighborhood: z4.string(),
                       city: z4.string(),
                       state: z4.string(),
                       postal_code: z4.string()
                   }),
                   external_reference: z4.string(),
                   uuid_external: z4.object({
                       id: z4.string()
                   }),
                   created_by: z4.string(),
                   organization: z4.string(),
                   ativo: z4.boolean().optional().default(true),
               })
           })
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ClientesBaseSchema;
       export type Output = {
           data: {
               clientes: z4.infer<typeof OutputSchema>;
           }
       }
   }

   export namespace BuscarPeloFiltro {
       export const InputSchema = z4.object({
           filtros: z4.object({
               clientes: z4.object({
                   pagina: z4.number().min(0),
                   _id: z4.uuidv4().optional().nullable(),
                   name: z4.string().optional().nullable(),
                   email: z4.string().optional().nullable(),
                   document: z4.string().optional().nullable(),
                   phone: z4.object({
                       country_code: z4.string(),
                       area_code: z4.string(),
                       number: z4.string()
                   }).optional().nullable(),
                   address: z4.object({
                       street: z4.string(),
                       number: z4.string(),
                       complement: z4.string(),
                       neighborhood: z4.string(),
                       city: z4.string(),
                       state: z4.string(),
                       postal_code: z4.string()
                   }).optional().nullable(),
                   external_reference: z4.string().optional().nullable(),
                   uuid_external: z4.object({
                       id: z4.string()
                   }).optional().nullable(),
                   created_by: z4.string().optional().nullable(),
                   organization: z4.string().optional().nullable(),
                   ativo: z4.boolean().optional().nullable(),
                   usuario_create_id: z4.uuidv4().optional().nullable(),
               }),

           })
       });

       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = z4.array(ClientesBaseSchema);
       export type Output = {
           data: {
               paginacao: {
                   total_itens: number;
                   total_paginas: number;
                   itens_por_pagina: number;
                   total_itens_pagina_atual: number;
               },
               clientes: z4.infer<typeof OutputSchema>;
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

       export const OutputSchema = ClientesBaseSchema;
       export type Output = {
           data: {
               clientes: z4.infer<typeof OutputSchema>
           }
       }
   }

   export namespace AtualizarPeloId {
       export const InputSchema = z4.object({
           data: z4.object({
               clientes: z4.object({
                   _id: z4.uuidv4(),
                   name: z4.string().optional(),
                   email: z4.string().optional(),
                   document: z4.string().optional(),
                   phone: z4.object({
                       country_code: z4.string(),
                       area_code: z4.string(),
                       number: z4.string()
                   }).optional(),
                   address: z4.object({
                       street: z4.string(),
                       number: z4.string(),
                       complement: z4.string(),
                       neighborhood: z4.string(),
                       city: z4.string(),
                       state: z4.string(),
                       postal_code: z4.string()
                   }).optional(),
                   external_reference: z4.string().optional(),
                   uuid_external: z4.object({
                       id: z4.string()
                   }).optional(),
                   created_by: z4.string().optional(),
                   organization: z4.string().optional(),
                   ativo: z4.boolean().optional()
               })
           })
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ClientesBaseSchema;
       export type Output = {
           data: {
               clientes: z4.infer<typeof OutputSchema>
           }
       }
   }

   export namespace DeletarPeloId {
       export const InputSchema = z4.object({
           _id: z4.string()
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ClientesBaseSchema;
       export type Output = {
           data: {
               clientes: {}
           }
       }
   }
}

export default ControllerClientes;