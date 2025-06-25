import { z } from 'zod';

namespace ControllerBucket {
    // Enum para tipos de arquivo
    export const ArquivoTypeSchema = z.enum([
        "assinatura",
        'foto_rosto',
        "rg_cnh_frente_verso",
        "ficha_associativa",
        'rg_cnh_frente',
        "rg_cnh_verso"
    ]);
    export type ArquivoType = z.infer<typeof ArquivoTypeSchema>;

    // Schema base do arquivo
    export const ArquivoBaseSchema = z.object({
        _id: z.string(),
        name: z.string(),
        filename: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        type: z.string(),
        size: z.number(),
        caminho_relativo: z.string(),
        is_template: z.boolean(),
        criado_por_id: z.string(),
        alterado_por_id: z.string(),
        v: z.number(),
        data_criacao: z.string(),
        data_atualizacao: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    });
    export type ArquivoBase = z.infer<typeof ArquivoBaseSchema>;

    export namespace Criar {
        export const InputSchema = z.object({
            data: z.object({
                arquivo: z.object({
                    name: z.string(),
                    filename: z.string(),
                    encoding: z.string().optional(),
                    mimetype: z.string().optional(),
                    type: z.string().optional(),
                    size: z.number(),
                    caminho_relativo: z.string().optional(),
                    is_template: z.boolean().optional(),
                    criado_por_id: z.string().optional(),
                    alterado_por_id: z.string().optional(),
                })
            })
        });
        export type Input = z.infer<typeof InputSchema>;

        export const OutputSchema = ArquivoBaseSchema;
        export type Output = z.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z.object({
            filtros: z.object({
                arquivo: z.object({
                    _id: z.string().optional(),
                    name: z.string().optional(),
                    filename: z.string().optional(),
                    mimetype: z.string().optional(),
                    type: z.string().optional(),
                    is_template: z.boolean().optional(),
                    criado_por_id: z.string().optional(),
                    alterado_por_id: z.string().optional(),
                })
            })
        });
        export type Input = z.infer<typeof InputSchema>;

        export const OutputSchema = z.array(ArquivoBaseSchema);
        export type Output = z.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloId {
        export const InputSchema = z.object({
            id: z.string()
        });
        export type Input = z.infer<typeof InputSchema>;

        export const OutputSchema = ArquivoBaseSchema;
        export type Output = z.infer<typeof OutputSchema>;
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z.object({
            id: z.string(),
            data: z.object({
                arquivo: z.object({
                    name: z.string().optional(),
                    filename: z.string().optional(),
                    encoding: z.string().optional(),
                    mimetype: z.string().optional(),
                    type: z.string().optional(),
                    size: z.number().optional(),
                    caminho_relativo: z.string().optional(),
                    is_template: z.boolean().optional(),
                    alterado_por_id: z.string().optional(),
                })
            })
        });
        export type Input = z.infer<typeof InputSchema>;

        export const OutputSchema = ArquivoBaseSchema;
        export type Output = z.infer<typeof OutputSchema>;
    }

    export namespace DeletarPeloId {
        export const InputSchema = z.object({
            id: z.string()
        });
        export type Input = z.infer<typeof InputSchema>;

        export const OutputSchema = ArquivoBaseSchema;
        export type Output = z.infer<typeof OutputSchema>;
    }
}

export default ControllerBucket;