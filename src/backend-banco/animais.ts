import z4 from "zod/v4";

// tipagem:
// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Animais.Criar.Input
namespace ControllerAnimais {

    export const AnimalStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type AnimalStatus = z4.infer<typeof AnimalStatusSchema>;

    export const AnimalBaseSchema = z4.object({
        _id: z4.uuidv4(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        descricao: z4.string(),
        tipo: z4.string(),
        valor: z4.number(),
        data: z4.string(),
        categoria: z4.string(),
        usuario_id: z4.number(),
        ativo: z4.boolean()
    });
    export type AnimalBase = z4.infer<typeof AnimalBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                animal: z4.object({
                    descricao: z4.string(),
                    tipo: z4.string(),
                    valor: z4.number(),
                    data: z4.string(),
                    categoria: z4.string(),
                    usuario_id: z4.number(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimalBaseSchema;
        export type Output = {
            data: {
                animal: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                animal: z4.object({
                    _id: z4.uuidv4().optional().nullable(),
                    descricao: z4.string().optional().nullable(),
                    tipo: z4.string().optional().nullable(),
                    valor: z4.number().optional().nullable(),
                    data: z4.string().optional().nullable(),
                    categoria: z4.string().optional().nullable(),
                    usuario_id: z4.number().optional().nullable(),
                    ativo: z4.boolean().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(AnimalBaseSchema);
        export type Output = {
            data: {
                animais: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = AnimalBaseSchema;
        export type Output = {
            data: {
                animal: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                animal: z4.object({
                    _id: z4.uuidv4(),
                    descricao: z4.string().optional(),
                    tipo: z4.string().optional(),
                    valor: z4.number().optional(),
                    data: z4.string().optional(),
                    categoria: z4.string().optional(),
                    usuario_id: z4.number().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimalBaseSchema;
        export type Output = {
            data: {
                animal: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.uuidv4()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimalBaseSchema;
        export type Output = {
            data: {
                animal: {}
            }
        }
    }
}

export default ControllerAnimais;