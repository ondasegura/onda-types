import z4 from "zod/v4";

namespace ControllerContato {
    // Schema para o tipo de contato
    export const ContatoTipoSchema = z4.union([
        z4.literal("master"),
        z4.literal("primario"),
        z4.literal("secundario")
    ]);
    export type ContatoTipo = z4.infer<typeof ContatoTipoSchema>;

    // Schema base para contato
    export const ContatoBaseSchema = z4.object({
        _id: z4.string(),
        usuario: z4.string(),
        nome: z4.string(),
        email: z4.string(),
        cpf_cnpj: z4.string(),
        rg: z4.string(),
        tipo: z4.string(),
        createdAt: z4.string(),
        updatedAt: z4.string(),
        __v: z4.number()
    });
    export type ContatoBase = z4.infer<typeof ContatoBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                contato: z4.object({
                    usuario: z4.string(),
                    nome: z4.string(),
                    email: z4.string(),
                    cpf_cnpj: z4.string(),
                    rg: z4.string(),
                    tipo: ContatoTipoSchema.optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContatoBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloFiltro {
        export const InputSchema = z4.object({
            filtros: z4.object({
                contato: z4.object({
                    _id: z4.string().optional(),
                    usuario: z4.string().optional(),
                    nome: z4.string().optional(),
                    email: z4.string().optional(),
                    cpf_cnpj: z4.string().optional(),
                    rg: z4.string().optional(),
                    tipo: ContatoTipoSchema.optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(ContatoBaseSchema);
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace BuscarPeloId {
        export const InputSchema = z4.object({
            id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContatoBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace AtualizarPeloId {
        export const InputSchema = z4.object({
            id: z4.string(),
            data: z4.object({
                contato: z4.object({
                    usuario: z4.string().optional(),
                    nome: z4.string().optional(),
                    email: z4.string().optional(),
                    cpf_cnpj: z4.string().optional(),
                    rg: z4.string().optional(),
                    tipo: ContatoTipoSchema.optional()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContatoBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace DeletarPeloId {
        export const InputSchema = z4.object({
            id: z4.string()
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = ContatoBaseSchema;
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default ControllerContato;