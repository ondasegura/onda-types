import z4 from "zod/v4";


// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Sistema.Criar.Input
namespace ControllerSistema {
    // Schema para o status do sistema

    // Schema base para o sistema
    export const SistemaBaseSchema = z4.object({
        _id: z4.uuidv4(),
        usuario_id: z4.uuidv4(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        master_limpa_nome_custo: z4.number(),
        master_limpa_nome_preco_venda: z4.number(),
        master_consulta_nome_custo: z4.number(),
        master_consulta_nome_preco_venda: z4.number(),
        franqueado_limpa_nome_preco_venda: z4.number(),
        franqueado_consulta_nome_preco_venda: z4.number(),
    });
    export type SistemaBase = z4.infer<typeof SistemaBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                sistema: z4.object({
                    usuario_id: z4.uuidv4(),
                    master_limpa_nome_custo: z4.number(),
                    master_limpa_nome_preco_venda: z4.number(),
                    master_consulta_nome_custo: z4.number(),
                    master_consulta_nome_preco_venda: z4.number(),
                    franqueado_limpa_nome_preco_venda: z4.number(),
                    franqueado_consulta_nome_preco_venda: z4.number(),
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
                    usuario_create_id: z4.uuidv4().optional(),
                    master_limpa_nome_custo: z4.number().optional(),
                    master_limpa_nome_preco_venda: z4.number().optional(),
                    master_consulta_nome_custo: z4.number().optional(),
                    master_consulta_nome_preco_venda: z4.number().optional(),
                    franqueado_limpa_nome_preco_venda: z4.number().optional(),
                    franqueado_consulta_nome_preco_venda: z4.number().optional(),
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
                    master_limpa_nome_preco_venda: z4.number().optional(),
                    master_consulta_nome_custo: z4.number().optional(),
                    master_consulta_nome_preco_venda: z4.number().optional(),
                    franqueado_limpa_nome_preco_venda: z4.number().optional(),
                    franqueado_consulta_nome_preco_venda: z4.number().optional(),
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