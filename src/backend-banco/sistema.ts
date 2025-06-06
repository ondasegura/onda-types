import z4 from "zod/v4";


// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Sistema.Criar.Input
namespace ControllerSistema {
    // Schema para o status do sistema
    export const SistemaStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type SistemaStatus = z4.infer<typeof SistemaStatusSchema>;

    // Schema base para o sistema
    export const SistemaBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        master_limpa_nome_custo: z4.number(),
        master_limpa_nome_lucro: z4.number(),
        master_consulta_nome_custo: z4.number(),
        master_consulta_nome_lucro: z4.number(),
        franqueado_limpa_nome_custo: z4.number(),
        franqueado_limpa_nome_lucro: z4.number(),
        franqueado_consulta_nome_custo: z4.number(),
        franqueado_consulta_nome_lucro: z4.number(),
        fornecedor_limpa_nome_custo: z4.number(),
        fornecedor_limpa_nome_lucro: z4.number(),
        fornecedor_consulta_nome_custo: z4.number(),
        fornecedor_consulta_nome_lucro: z4.number(),
        ativo: z4.boolean()
    });
    export type SistemaBase = z4.infer<typeof SistemaBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                sistema: z4.object({
                    master_limpa_nome_custo: z4.number(),
                    master_limpa_nome_lucro: z4.number(),
                    master_consulta_nome_custo: z4.number(),
                    master_consulta_nome_lucro: z4.number(),
                    franqueado_limpa_nome_custo: z4.number(),
                    franqueado_limpa_nome_lucro: z4.number(),
                    franqueado_consulta_nome_custo: z4.number(),
                    franqueado_consulta_nome_lucro: z4.number(),
                    fornecedor_limpa_nome_custo: z4.number(),
                    fornecedor_limpa_nome_lucro: z4.number(),
                    fornecedor_consulta_nome_custo: z4.number(),
                    fornecedor_consulta_nome_lucro: z4.number(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = SistemaBaseSchema;
        export type Output = {
            data: {
                sistema: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                sistema: z4.object({
                    _id: z4.uuidv4().optional(),
                    master_limpa_nome_custo: z4.number().optional(),
                    master_limpa_nome_lucro: z4.number().optional(),
                    master_consulta_nome_custo: z4.number().optional(),
                    master_consulta_nome_lucro: z4.number().optional(),
                    franqueado_limpa_nome_custo: z4.number().optional(),
                    franqueado_limpa_nome_lucro: z4.number().optional(),
                    franqueado_consulta_nome_custo: z4.number().optional(),
                    franqueado_consulta_nome_lucro: z4.number().optional(),
                    fornecedor_limpa_nome_custo: z4.number().optional(),
                    fornecedor_limpa_nome_lucro: z4.number().optional(),
                    fornecedor_consulta_nome_custo: z4.number().optional(),
                    fornecedor_consulta_nome_lucro: z4.number().optional(),
                    ativo: z4.boolean().optional(),
                    usuario_create_id: z4.uuidv4().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(SistemaBaseSchema);
        export type Output = {
            data: {
                sistemas: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = SistemaBaseSchema;
        export type Output = {
            data: {
                sistema: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                sistema: z4.object({
                    _id: z4.uuidv4(),
                    master_limpa_nome_custo: z4.number().optional(),
                    master_limpa_nome_lucro: z4.number().optional(),
                    master_consulta_nome_custo: z4.number().optional(),
                    master_consulta_nome_lucro: z4.number().optional(),
                    franqueado_limpa_nome_custo: z4.number().optional(),
                    franqueado_limpa_nome_lucro: z4.number().optional(),
                    franqueado_consulta_nome_custo: z4.number().optional(),
                    franqueado_consulta_nome_lucro: z4.number().optional(),
                    fornecedor_limpa_nome_custo: z4.number().optional(),
                    fornecedor_limpa_nome_lucro: z4.number().optional(),
                    fornecedor_consulta_nome_custo: z4.number().optional(),
                    fornecedor_consulta_nome_lucro: z4.number().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = SistemaBaseSchema;
        export type Output = {
            data: {
                sistema: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = SistemaBaseSchema;
        export type Output = {
            data: {
                sistema: {}
            }
        }
    }
}

export default ControllerSistema;