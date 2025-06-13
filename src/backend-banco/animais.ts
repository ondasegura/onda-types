import z4 from "zod/v4";


// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Animais.Criar.Input
namespace ControllerAnimais {

    export const AnimaisStatusSchema = z4.union([z4.literal("ativo"), z4.literal("inativo")]);
    export type AnimaisStatus = z4.infer<typeof AnimaisStatusSchema>;

    export const AnimaisBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        descricao: z4.string().toLowerCase(),
        tipo: z4.string().toLowerCase(),
        valor: z4.number(),
        data: z4.date(),
        categoria: z4.string().toLowerCase(),
        usuario_id: z4.number(),
        ativo: z4.boolean()
    });
    export type AnimaisBase = z4.infer<typeof AnimaisBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                animais: z4.object({
                    descricao: z4.string().toLowerCase(),
                    tipo: z4.string().toLowerCase(),
                    valor: z4.number(),
                    data: z4.date(),
                    categoria: z4.string().toLowerCase(),
                    usuario_id: z4.number(),
                    ativo: z4.boolean().optional().default(true),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimaisBaseSchema;
        export type Output = {
            data: {
                animais: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                animais: z4.object({
                    _id: z4.uuidv4().optional(),
                    descricao: z4.string().toLowerCase().optional(),
                    tipo: z4.string().toLowerCase().optional(),
                    valor: z4.number().optional(),
                    data: z4.date().optional(),
                    categoria: z4.string().toLowerCase().optional(),
                    usuario_id: z4.number().optional(),
                    ativo: z4.boolean().optional(),
                    usuario_create_id: z4.uuidv4().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(AnimaisBaseSchema);
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

        export const OutputSchema = AnimaisBaseSchema;
        export type Output = {
            data: {
                animais: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                animais: z4.object({
                    _id: z4.uuidv4(),
                    descricao: z4.string().toLowerCase().optional(),
                    tipo: z4.string().toLowerCase().optional(),
                    valor: z4.number().optional(),
                    data: z4.date().optional(),
                    categoria: z4.string().toLowerCase().optional(),
                    usuario_id: z4.number().optional(),
                    ativo: z4.boolean().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimaisBaseSchema;
        export type Output = {
            data: {
                animais: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = AnimaisBaseSchema;
        export type Output = {
            data: {
                animais: {}
            }
        }
    }
}

export default ControllerAnimais;