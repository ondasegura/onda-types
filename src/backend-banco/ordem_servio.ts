import z4 from "zod/v4";
import ControllerAsaas from "./asaas";

import ControllerCliente from "./cliente";
namespace ControllerOrdemServico {
    // Schema para tipos de serviço
    const TipoServicoSchema = z4.union([
        z4.literal("consulta_nome"),
        z4.literal("limpa_nome"),
        z4.literal("audiencia"),
        z4.literal("contrato")
    ]);
    export type TipoServico = z4.infer<typeof TipoServicoSchema>;

    // Schema para tipos de usuário
    const UsuarioTipoSchema = z4.union([
        z4.literal("master"),
        z4.literal("franqueado"),
        z4.literal("advogado")
    ]);
    export type UsuarioTipo = z4.infer<typeof UsuarioTipoSchema>;

    // Schema para status geral de ordem de serviço
    const OrdemServicoStatusSchema = z4.union([
        z4.literal("aguardando_pagamento"),
        z4.literal("aguardando_documentos"),
        z4.literal("processando_analise"),
        z4.literal("aguardando_assinatura"),
        z4.literal("em_andamento"),
        z4.literal("concluido"),
        z4.literal("cancelada")
    ]);
    export type OrdemServicoStatus = z4.infer<typeof OrdemServicoStatusSchema>;

    // Schemas para status específicos por tipo
    const StatusConsultaNomeSchema = z4.union([
        z4.literal("aguardando_pagamento"),
        z4.literal("processando_analise"),
        z4.literal("concluido"),
        z4.literal("cancelada")
    ]);

    const StatusLimpaNomeSchema = z4.union([
        z4.literal("aguardando_pagamento"),
        z4.literal("aguardando_documentos"),
        z4.literal("em_negociacao"),
        z4.literal("em_andamento"),
        z4.literal("concluido"),
        z4.literal("cancelada")
    ]);

    const StatusAudienciaSchema = z4.union([
        z4.literal("aguardando_pagamento"),
        z4.literal("agendada"),
        z4.literal("realizada"),
        z4.literal("cancelada")
    ]);

    const StatusContratoSchema = z4.union([
        z4.literal("aguardando_pagamento"),
        z4.literal("aguardando_assinatura"),
        z4.literal("assinado"),
        z4.literal("cancelada")
    ]);

    // Schema para informações de IP
    const IpInfoSchema = z4.object({
        ip: z4.string(),
        network: z4.string(),
        version: z4.string(),
        city: z4.string(),
        region: z4.string(),
        region_code: z4.string(),
        country: z4.string(),
        country_name: z4.string(),
        country_code: z4.string(),
        country_code_iso3: z4.string(),
        country_capital: z4.string(),
        country_tld: z4.string(),
        continent_code: z4.string(),
        in_eu: z4.boolean(),
        postal: z4.string(),
        latitude: z4.number(),
        longitude: z4.number(),
        timezone: z4.string(),
        utc_offset: z4.string(),
        country_calling_code: z4.string(),
        currency: z4.string(),
        currency_name: z4.string(),
        languages: z4.string(),
        country_area: z4.number(),
        country_population: z4.number(),
        asn: z4.string(),
        org: z4.string()
    });
    export type IpInfo = z4.infer<typeof IpInfoSchema>;



    const OrdemServicoBaseSchema = z4.object({
        _id: z4.uuidv4(),
        data_criacao: z4.string(),
        data_atualizacao: z4.string().optional().nullable(),
        usuario_create_id: z4.string(),
        usuario_update_id: z4.string().optional().nullable(),
        usuario_master_id: z4.string(),
        usuario_franqueado_id: z4.string(),
        usuario_operador_id: z4.string().optional().nullable(),
        pagamendo_asaas_id: z4.string().optional().nullable(),
        cliente_id: z4.string(),
        titulo: z4.string().optional().nullable(),
        descricao: z4.string().optional().nullable(),
        tipo_servico: TipoServicoSchema.optional().nullable(),
        documento_assinado: z4.boolean().optional().nullable(),
        data_assinatura: z4.date().optional().nullable(),
        pagamento_efetuado: z4.boolean().optional().nullable(),
        data_pagamento: z4.date().optional().nullable(),
        fornecedor_iniciou: z4.boolean().optional().nullable(),
        data_fornecedor_iniciou: z4.date().optional().nullable(),
        processo_concluido: z4.boolean().optional().nullable(),
        data_processo_concluido: z4.date().optional().nullable(),
        consulta_nome_realisada: z4.boolean(),
        usuario_fornecedor_id: z4.string().optional().nullable(),
        ip_info: IpInfoSchema,
        status: OrdemServicoStatusSchema,
        cliente: ControllerCliente.ClienteBaseSchema,
        info_pagamento: z4.custom<ControllerAsaas.InfoPagamento>()
    });

    const OrdemConsultaNomeSchema = OrdemServicoBaseSchema.extend({
        tipo_servico: z4.literal("consulta_nome"),
        status: StatusConsultaNomeSchema
    });

    const OrdemLimpaNomeSchema = OrdemServicoBaseSchema.extend({
        tipo_servico: z4.literal("limpa_nome"),
        status: StatusLimpaNomeSchema
    });

    const OrdemAudienciaSchema = OrdemServicoBaseSchema.extend({
        tipo_servico: z4.literal("audiencia"),
        status: StatusAudienciaSchema
    });

    const OrdemContratoSchema = OrdemServicoBaseSchema.extend({
        tipo_servico: z4.literal("contrato"),
        status: StatusContratoSchema
    });

    const OrdemServicoSchema = z4.union([
        OrdemConsultaNomeSchema,
        OrdemLimpaNomeSchema,
        OrdemAudienciaSchema,
        OrdemContratoSchema
    ]);

    export type OrdemServicoBase = z4.infer<typeof OrdemServicoBaseSchema>;
    export type OrdemConsultaNome = z4.infer<typeof OrdemConsultaNomeSchema>;
    export type OrdemLimpaNome = z4.infer<typeof OrdemLimpaNomeSchema>;
    export type OrdemAudiencia = z4.infer<typeof OrdemAudienciaSchema>;
    export type OrdemContrato = z4.infer<typeof OrdemContratoSchema>;
    export type OrdemServico = z4.infer<typeof OrdemServicoSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                ordem_servico: z4.object({
                    cliente_id: z4.string(),
                    tipo_servico: TipoServicoSchema
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                ordem_servico: z4.infer<typeof OrdemServicoSchema>
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                ordem_servico: z4.object({
                    _id: z4.uuidv4().optional().nullable(),
                    titulo: z4.string().optional().nullable(),
                    usuario_id: z4.string().optional().nullable(),
                    tipo_usuario: UsuarioTipoSchema.optional().nullable(),
                    tipo_servico: TipoServicoSchema.optional().nullable(),
                    status: OrdemServicoStatusSchema.optional().nullable()
                })
            })
        });

        const OutputSchema = z4.array(OrdemServicoSchema);

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                ordens_servico: z4.infer<typeof OutputSchema>
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
        export type Output = {
            data: {
                ordem_servico: z4.infer<typeof OrdemServicoSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                ordem_servico: z4.object({
                    _id: z4.uuidv4(),
                    titulo: z4.string().optional(),
                    ip_info: IpInfoSchema.optional(),
                    descricao: z4.string().optional(),
                    usuario_id: z4.string().optional(),
                    pagamendo_asaas_id: z4.string().optional(),
                    tipo_usuario: UsuarioTipoSchema.optional(),
                    tipo_servico: TipoServicoSchema.optional(),
                    status: OrdemServicoStatusSchema.optional(),
                    usuario_fornecedor_id: z4.string().optional(),
                    documento_assinado: z4.boolean().optional(),
                    data_assinatura: z4.date().optional(),
                    pagamento_efetuado: z4.boolean().optional(),
                    data_pagamento: z4.date().optional(),
                    fornecedor_iniciou: z4.boolean().optional(),
                    data_fornecedor_iniciou: z4.date().optional(),
                    processo_concluido: z4.boolean().optional(),
                    data_processo_concluido: z4.date().optional(),
                    consulta_nome_realisada: z4.boolean().optional(),
                    data_consulta_nome_realisada: z4.date().optional()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                ordem_servico: z4.infer<typeof OrdemServicoSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.uuidv4()
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                ordem_servico: {}
            }
        }
    }
}

export default ControllerOrdemServico;