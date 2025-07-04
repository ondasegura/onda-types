import z4 from "zod/v4";

namespace ControllerCliente {
    // Schema para tipo de cliente
    const ClienteTipoSchema = z4.union([
        z4.string(),
        z4.literal("master"),
        z4.literal("primario"),
        z4.literal("secundario")
    ]);
    export type ClienteTipo = z4.infer<typeof ClienteTipoSchema>;

    // Schema para endereço
    const EnderecoSchema = z4.object({
        cep: z4.string().transform((val) => val.replace(/\D/g, '')),
        logradouro: z4.string(),
        numero: z4.string(),
        complemento: z4.string().optional(),
        bairro: z4.string(),
        localidade: z4.string(),
        uf: z4.string().toLowerCase().trim()
    });
    export type Endereco = z4.infer<typeof EnderecoSchema>;

    // Schema base para cliente
    export const ClienteBaseSchema = z4.object({
        _id: z4.uuidv4(),
        nome: z4.string().toLowerCase(),
        email: z4.string().trim().toLowerCase(),
        cpf_cnpj: z4.string().trim().transform((val) => val.replace(/[^a-zA-Z0-9]/g, '')),
        tipo: z4.string(),
        data_criacao: z4.string(),
        celular: z4.string().transform((val) => val.replace(/\D/g, '')),
        data_atualizacao: z4.string(),
        cliente_asaas_id: z4.string(),
        endereco: EnderecoSchema.optional()
    });

    export type ClienteBase = z4.infer<typeof ClienteBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                cliente: z4.object({
                    cpf_cnpj: z4.string().trim().transform((val) => val.replace(/[^a-zA-Z0-9]/g, '')),
                    celular: z4.string().transform((val) => val.replace(/\D/g, '')),
                    nome: z4.string().toLowerCase(),
                    email: z4.string().trim().toLowerCase(),
                    tipo: ClienteTipoSchema,
                    endereco: EnderecoSchema.optional()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                cliente: z4.infer<typeof ClienteBaseSchema>
            }
        }


    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                cliente: z4.object({
                    pagina: z4.number().min(0),
                    _id: z4.uuidv4().optional(),
                    nome: z4.string().toLowerCase().optional(),
                    email: z4.string().trim().toLowerCase().optional(),
                    cpf_cnpj: z4.string().trim().transform((val) => val.replace(/[^a-zA-Z0-9]/g, '')).optional(),
                    celular: z4.string().transform((val) => val.replace(/\D/g, '')).optional(),
                    tipo: ClienteTipoSchema.optional(),
                    endereco: EnderecoSchema.optional()
                })
            })
        });

        const OutputSchema = z4.array(ClienteBaseSchema);

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                },
                cliente: z4.infer<typeof OutputSchema>
            }
        }

    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                _id: z4.uuidv4()
            })
        });

        const OutputSchema = ClienteBaseSchema;

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                cliente: z4.infer<typeof OutputSchema>;
            }
        }


    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                cliente: z4.object({
                    _id: z4.uuidv4(),
                    nome: z4.string().toLowerCase().optional(),
                    email: z4.string().trim().toLowerCase().optional(),
                    cpf_cnpj: z4.string().trim().transform((val) => val.replace(/[^a-zA-Z0-9]/g, '')).optional(),
                    celular: z4.string().transform((val) => val.replace(/\D/g, '')).optional(),
                    tipo: ClienteTipoSchema.optional(),
                    endereco: EnderecoSchema.optional()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                cliente: z4.infer<typeof ClienteBaseSchema>
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
                cliente: {}
            }
        }
    }

    export type TController = {
        Criar: {
            Input: Criar.Input;
            Output: Criar.Output;
        };
        BuscarPeloFiltro: {
            Input: BuscarPeloFiltro.Input;
            Output: BuscarPeloFiltro.Output;
        };
        BuscarPeloId: {
            Input: BuscarPeloId.Input;
            Output: BuscarPeloId.Output;
        };
        AtualizarPeloId: {
            Input: AtualizarPeloId.Input;
            Output: AtualizarPeloId.Output;
        };
        DeletarPeloId: {
            Input: DeletarPeloId.Input;
            Output: DeletarPeloId.Output;
        };
        states: {
            modal: {
                item: BuscarPeloId.Output["data"]["cliente"];
                loading: boolean;
            };
            pagina: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["cliente"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            pagina_mini_select: {
                loading: boolean;
                itens: BuscarPeloFiltro.Output["data"]["cliente"];
                item_selecionado: BuscarPeloId.Output["data"]["cliente"];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    total_itens_pagina_atual: number;
                    itens_por_pagina: number;
                };
            };
            formulario: {
                open?: boolean;
                item: BuscarPeloId.Output["data"]["cliente"];
                progress?: number;
                loading: boolean;
                loading_submit?: boolean;
            };
        };
    };
}

export default ControllerCliente;