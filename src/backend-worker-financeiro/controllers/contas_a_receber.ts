import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Controllers.ContaReceber.Criar.Input
namespace ControllerContaReceber {

   export const ContaReceberStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
   export type ContaReceberStatus = z4.infer<typeof ContaReceberStatusSchema>;

   export const ContaReceberBaseSchema = z4.object({
       _id: z4.uuid(),
       data_criacao: z4.date(),
       data_atualizacao: z4.date().nullable(),
       usuario_create_id: z4.uuidv4(),
       checkout: z4.string(),
       cliente_id: z4.string(),
       parcelas: z4.number(),
       valor: z4.number(),
       vencimento: z4.string(),
       codigo: z4.string(),
       metodo_pagamento: z4.array(z4.string()),
       tipo_pagamento: z4.number(),
       descricao: z4.string(),
       referencia_externa_primaria: z4.string(),
       referencia_externa_secundaria: z4.string(),
       referencia_externa_terciaria: z4.string(),
       referencia_externa_quartenaria: z4.string(),
       ativo: z4.boolean(),
       documento_titular: z4.string(),
       titular: z4.string(),
       status: z4.number(),
       numero_cartao: z4.string(),
       numero_serial: z4.string(),
       pagamento_id: z4.string(),
       parcela: z4.number(),
       valor_pacela: z4.number(),
       url_pedido: z4.string(),
       url_cobranca: z4.string()
   });
   export type ContaReceberBase = z4.infer<typeof ContaReceberBaseSchema>;

   export namespace Criar {
       export const InputSchema = z4.object({
           data: z4.object({
               conta_receber: z4.object({
                   checkout: z4.string(),
                   cliente_id: z4.string(),
                   parcelas: z4.number(),
                   valor: z4.number(),
                   vencimento: z4.string(),
                   codigo: z4.string(),
                   metodo_pagamento: z4.array(z4.string()),
                   tipo_pagamento: z4.number(),
                   descricao: z4.string(),
                   referencia_externa_primaria: z4.string(),
                   referencia_externa_secundaria: z4.string(),
                   referencia_externa_terciaria: z4.string(),
                   referencia_externa_quartenaria: z4.string()
                   
               })
           })
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ContaReceberBaseSchema;
       export type Output = {
           data: {
               conta_receber: z4.infer<typeof OutputSchema>;
           }
       }
   }

   export namespace BuscarPeloFiltro {
       export const InputSchema = z4.object({
           filtros: z4.object({
               conta_receber: z4.object({
                   pagina: z4.number().min(0),
                   _id: z4.uuidv4().optional().nullable(),
                   checkout: z4.string().optional().nullable(),
                   cliente_id: z4.string().optional().nullable(),
                   parcelas: z4.number().optional().nullable(),
                   valor: z4.number().optional().nullable(),
                   vencimento: z4.string().optional().nullable(),
                   codigo: z4.string().optional().nullable(),
                   metodo_pagamento: z4.array(z4.string()).optional().nullable(),
                   tipo_pagamento: z4.number().optional().nullable(),
                   descricao: z4.string().optional().nullable(),
                   referencia_externa_primaria: z4.string().optional().nullable(),
                   referencia_externa_secundaria: z4.string().optional().nullable(),
                   referencia_externa_terciaria: z4.string().optional().nullable(),
                   referencia_externa_quartenaria: z4.string().optional().nullable(),
                   ativo: z4.boolean().optional().nullable(),
                   documento_titular: z4.string().optional().nullable(),
                   titular: z4.string().optional().nullable(),
                   status: z4.number().optional().nullable(),
                   numero_cartao: z4.string().optional().nullable(),
                   numero_serial: z4.string().optional().nullable(),
                   pagamento_id: z4.string().optional().nullable(),
                   parcela: z4.number().optional().nullable(),
                   valor_pacela: z4.number().optional().nullable(),
                   url_pedido: z4.string().optional().nullable(),
                   url_cobranca: z4.string().optional().nullable(),
                   usuario_create_id: z4.uuidv4().optional().nullable(),
               }),

           })
       });

       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = z4.array(ContaReceberBaseSchema);
       export type Output = {
           data: {
               paginacao: {
                   total_itens: number;
                   total_paginas: number;
                   itens_por_pagina: number;
                   total_itens_pagina_atual: number;
               },
               conta_receber: z4.infer<typeof OutputSchema>;
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

       export const OutputSchema = ContaReceberBaseSchema;
       export type Output = {
           data: {
               conta_receber: z4.infer<typeof OutputSchema>
           }
       }
   }

   export namespace AtualizarPeloId {
       export const InputSchema = z4.object({
           data: z4.object({
               conta_receber: z4.object({
                   _id: z4.uuidv4(),
                   checkout: z4.string().optional(),
                   cliente_id: z4.string().optional(),
                   parcelas: z4.number().optional(),
                   valor: z4.number().optional(),
                   vencimento: z4.string().optional(),
                   codigo: z4.string().optional(),
                   metodo_pagamento: z4.array(z4.string()).optional(),
                   tipo_pagamento: z4.number().optional(),
                   descricao: z4.string().optional(),
                   referencia_externa_primaria: z4.string().optional(),
                   referencia_externa_secundaria: z4.string().optional(),
                   referencia_externa_terciaria: z4.string().optional(),
                   referencia_externa_quartenaria: z4.string().optional(),
                   ativo: z4.boolean().optional(),
                   documento_titular: z4.string().optional(),
                   titular: z4.string().optional(),
                   status: z4.number().optional(),
                   numero_cartao: z4.string().optional(),
                   numero_serial: z4.string().optional(),
                   pagamento_id: z4.string().optional(),
                   parcela: z4.number().optional(),
                   valor_pacela: z4.number().optional(),
                   url_pedido: z4.string().optional(),
                   url_cobranca: z4.string().optional()
               })
           })
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ContaReceberBaseSchema;
       export type Output = {
           data: {
               conta_receber: z4.infer<typeof OutputSchema>
           }
       }
   }

   export namespace DeletarPeloId {
       export const InputSchema = z4.object({
           _id: z4.string()
       });
       export type Input = z4.infer<typeof InputSchema>;

       export const OutputSchema = ContaReceberBaseSchema;
       export type Output = {
           data: {
               conta_receber: {}
           }
       }
   }
}

export default ControllerContaReceber;