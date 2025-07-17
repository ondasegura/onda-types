import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR:
// import t from "onda-types"
// t.Financeiro.Controllers.Recebedor.Criar.Input
namespace ControllerRecebedor {
    export const RecebedorTipoDeChaveSchema = z4.union([z4.literal("email"), z4.literal("cpf"), z4.literal("cnpj"), z4.literal("telefone"), z4.literal("chave_aleatoria")]);
    export type RecebedorTipoDeChave = z4.infer<typeof RecebedorTipoDeChaveSchema>;

    export const RecebedorBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        documento: z4.string(),
        chave_pix: z4.string(),
        tipo_de_chave: z4.array(RecebedorTipoDeChaveSchema).min(1),
        codigo_externo: z4.string(),
        razao_social: z4.string(),
        nome: z4.string(),
        ativo: z4.boolean(),
        referencia_externa: z4.string(),
    });
    export type RecebedorBase = z4.infer<typeof RecebedorBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: z4.object({
                    documento: z4.string(),
                    chave_pix: z4.string(),
                    tipo_de_chave: z4.string(),
                    codigo_externo: z4.string(),
                    razao_social: z4.string(),
                    nome: z4.string(),
                    ativo: z4.boolean().optional().default(true),
                    referencia_externa: z4.string(),
                }),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorBaseSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                recebedor: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    documento: z4.string().optional().nullable(),
                    chave_pix: z4.string().optional().nullable(),
                    tipo_de_chave: z4.string().optional().nullable(),
                    codigo_externo: z4.string().optional().nullable(),
                    razao_social: z4.string().optional().nullable(),
                    nome: z4.string().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),
            }),
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(RecebedorBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                };
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.uuidv4(),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorBaseSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                recebedor: z4.object({
                    _id: z4.uuidv4(),
                    documento: z4.string().optional(),
                    chave_pix: z4.string().optional(),
                    tipo_de_chave: z4.string().optional(),
                    codigo_externo: z4.string().optional(),
                    razao_social: z4.string().optional(),
                    nome: z4.string().optional(),
                    ativo: z4.boolean().optional(),
                }),
            }),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorBaseSchema;
        export type Output = {
            data: {
                recebedor: z4.infer<typeof OutputSchema>;
            };
        };
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string(),
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = RecebedorBaseSchema;
        export type Output = {
            data: {
                recebedor: {};
            };
        };
    }
}

export default ControllerRecebedor;
