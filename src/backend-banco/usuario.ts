import z4 from "zod/v4";

namespace ControllerUsuario {
    // Schema para tipos de registro
    const RegistroTipoSchema = z4.union([
        z4.literal("auth_google"),
        z4.literal("padrao")
    ]);
    export type RegistroTipo = z4.infer<typeof RegistroTipoSchema>;

    // Schema para tipos de usuário
    const UsuarioTipoSchema = z4.union([
        z4.literal("master"),
        z4.literal("franqueado"),
        z4.literal("operador"),
        z4.literal("fornecedor")
    ]);
    export type UsuarioTipo = z4.infer<typeof UsuarioTipoSchema>;

    // Schema base para usuário
    const UsuarioBaseSchema = z4.object({
        _id: z4.string(),
        data_criacao: z4.string(),
        data_atualizacao: z4.string().optional().nullable(),
        usuario_create_id: z4.string(),
        usuario_update_id: z4.string().optional().nullable(),
        usuario_master_id: z4.string(),
        usuario_franqueado_id: z4.string(),
        usuario_fornecedor_id: z4.string(),
        usuario_operador_id: z4.string(),
        nome: z4.string().toLowerCase(),
        email: z4.email().toLowerCase(),
        registro: RegistroTipoSchema,
        celular: z4.string()
            .transform(val => val.replace(/\D/g, '')).refine(val => val.length >= 8 && val.length <= 15, {
                message: "Celular inválido. Deve conter entre 8 e 15 dígitos."
            }),
        tipo: UsuarioTipoSchema,
        senha: z4.string().optional(),
        delete: z4.boolean(),
        permissoes: z4.object({}).loose(),
        authenticator_ativo: z4.boolean(),
        master: z4.object({
            _id: z4.uuidv4(),
            nome: z4.string(),
            email: z4.string(),
        }).optional(),
        franqueado: z4.object({
            _id: z4.uuidv4(),
            nome: z4.string(),
            email: z4.string(),
        }).optional(),
        operador: z4.object({
            _id: z4.uuidv4().nullable(),
            nome: z4.string().nullable(),
            email: z4.string().nullable(),
        }).optional(),
    });

    export type UsuarioBase = z4.infer<typeof UsuarioBaseSchema>;

    // Schema para Auth
    const AuthSchema = z4.object({
        _id: z4.string(),
        usuario_master_id: z4.string(),
        usuario_franqueado_id: z4.string(),
        usuario_operador_id: z4.string().nullable(),
        usuario_fornecedor_id: z4.string().nullable(),
        nome: z4.string().toLowerCase(),
        email: z4.email().toLowerCase(),
        tipo: UsuarioTipoSchema,
        organizacao: z4.literal("banco_s8"),
        exp: z4.number().optional(),
        delete: z4.boolean(),
        token_para_webhook: z4.boolean(),
        authenticator_ativo: z4.boolean(),
        authenticator_secret: z4.string(),
        iat: z4.number().optional()
    });

    export type Auth = z4.infer<typeof AuthSchema>;

    const AuthFrontSchema = z4.discriminatedUnion('type', [
        z4.object({
            type: z4.literal('login'),
            _id: z4.string(),
            nome: z4.string().toLowerCase(),
            email: z4.email().toLowerCase(),
            tipo: UsuarioTipoSchema,
            get_code: z4.boolean().optional(),
            token: z4.string(),
            authenticator_ativo: z4.boolean(),
            authenticator_secret: z4.string().optional()
        }),
        z4.object({
            type: z4.literal('code'),
            get_code: z4.boolean()
        })
    ]);

    export type AuthFront = {
        data: {
            usuario_auth: z4.infer<typeof AuthFrontSchema>
        }
    }

    export namespace Register {
        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    nome: z4.string().toLowerCase(),
                    email: z4.email().toLowerCase().trim(),
                    celular: z4.string()
                        .transform(val => val.replace(/\D/g, '')).refine(val => val.length >= 8 && val.length <= 15, {
                            message: "Celular inválido. Deve conter entre 8 e 15 dígitos."
                        }),
                    senha: z4.string(),
                    tipo: UsuarioTipoSchema
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                usuario: z4.infer<typeof UsuarioBaseSchema>
            }
        }
    }
    export namespace Login {
        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    email: z4.email().toLowerCase(),
                    senha: z4.string(),
                    code: z4.string().optional(),

                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;

        type AuthLogin = z4.infer<typeof AuthFrontSchema> & { type: 'login' };
        type AuthCode = z4.infer<typeof AuthFrontSchema> & { type: 'code' };

        export type Output<T extends 'login' | 'code'> = {
            data: {
                usuario_auth: T extends 'login' ? AuthLogin : AuthCode
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
                usuario: z4.infer<typeof UsuarioBaseSchema>
            }
        }
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                usuario: z4.object({
                    _id: z4.string().optional().nullable(),
                    nome: z4.string().toLowerCase().optional().nullable(),
                    email: z4.string().optional().nullable(),
                    registro: RegistroTipoSchema.optional().nullable(),
                    tipo: UsuarioTipoSchema.optional().nullable(),
                    celular: z4.string().transform(val => val.replace(/\D/g, '')).optional(),
                    usuario_master_id: z4.uuidv4().optional().nullable(),
                    usuario_franqueado_id: z4.uuidv4().optional().nullable(),
                    usuario_fornecedor_id: z4.uuidv4().optional().nullable(),
                    usuario_operador_id: z4.uuidv4().optional().nullable()
                })
            })
        });

        const OutputSchema = z4.array(UsuarioBaseSchema);

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                usuarios: z4.infer<typeof OutputSchema>
            }
        }
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    _id: z4.uuidv4(),
                    nome: z4.string().toLowerCase().optional(),
                    email: z4.email().toLowerCase().optional(),
                    registro: RegistroTipoSchema.optional(),
                    senha: z4.string().optional(),
                    authenticator_secret: z4.string().optional(),
                    authenticator_ativo: z4.boolean().optional(),
                    tipo: UsuarioTipoSchema.optional(),
                    celular: z4.string().transform(val => val.replace(/\D/g, '')).refine(val => val.length >= 8 && val.length <= 15, {
                        message: "Celular inválido. Deve conter entre 8 e 15 dígitos."
                    }).optional(),
                    permissoes: z4.object({}).loose().optional()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = {
            data: {
                usuario: z4.infer<typeof UsuarioBaseSchema>
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
                usuario: {}
            }
        }
    }

    export namespace gerarAuthenticatorCode {
        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    senha: z4.string(),
                })
            })
        });


        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                authenticator: {
                    secret: string;
                    otp_auth_url: string;
                }
            }
        }
    }
}

export default ControllerUsuario;