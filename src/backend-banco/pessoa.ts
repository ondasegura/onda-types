import z4 from "zod/v4";

namespace ControllerPessoa {

    export const PessoaSexoSchema = z4.union([z4.literal("Masculino"), z4.literal("Feminino")]);
    export type PessoaSexo = z4.infer<typeof PessoaSexoSchema>;

    export const PessoaBaseSchema = z4.object({
        _id: z4.uuid(),
        data_criacao: z4.date(),
        data_atualizacao: z4.date().nullable(),
        usuario_create_id: z4.uuidv4(),
        nome: z4.string(),
        idade: z4.number(),
        sexo: PessoaSexoSchema,
        email: z4.string().email(),
        telefone: z4.string(),
        endereco: z4.object({
            rua: z4.string(),
            numero: z4.number(),
            bairro: z4.string(),
            cidade: z4.string(),
            estado: z4.string(),
            cep: z4.string()
        }),
        profissao: z4.string(),
        estado_civil: z4.string()
    });
    export type PessoaBase = z4.infer<typeof PessoaBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                pessoa: z4.object({
                    nome: z4.string(),
                    idade: z4.number(),
                    sexo: PessoaSexoSchema,
                    email: z4.string().email(),
                    telefone: z4.string(),
                    endereco: z4.object({
                        rua: z4.string(),
                        numero: z4.number(),
                        bairro: z4.string(),
                        cidade: z4.string(),
                        estado: z4.string(),
                        cep: z4.string()
                    }),
                    profissao: z4.string(),
                    estado_civil: z4.string()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = PessoaBaseSchema;
        export type Output = {
            data: {
                pessoa: z4.infer<typeof OutputSchema>;
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                pessoa: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional().nullable(),
                    nome: z4.string().optional().nullable(),
                    idade: z4.number().optional().nullable(),
                    sexo: PessoaSexoSchema.optional().nullable(),
                    email: z4.string().email().optional().nullable(),
                    telefone: z4.string().optional().nullable(),
                    usuario_create_id: z4.uuidv4().optional().nullable(),
                }),

            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(PessoaBaseSchema);
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                pessoa: z4.infer<typeof OutputSchema>;
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

        export const OutputSchema = PessoaBaseSchema;
        export type Output = {
            data: {
                pessoa: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                pessoa: z4.object({
                    _id: z4.uuidv4(),
                    nome: z4.string().optional(),
                    idade: z4.number().optional(),
                    sexo: PessoaSexoSchema.optional(),
                    email: z4.string().email().optional(),
                    telefone: z4.string().optional(),
                    endereco: z4.object({
                        rua: z4.string().optional(),
                        numero: z4.number().optional(),
                        bairro: z4.string().optional(),
                        cidade: z4.string().optional(),
                        estado: z4.string().optional(),
                        cep: z4.string().optional()
                    }).optional(),
                    profissao: z4.string().optional(),
                    estado_civil: z4.string().optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = PessoaBaseSchema;
        export type Output = {
            data: {
                pessoa: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            _id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = PessoaBaseSchema;
        export type Output = {
            data: {
                pessoa: {}
            }
        }
    }
}

export default ControllerPessoa;