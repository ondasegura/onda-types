import z4 from "zod/v4";
namespace NamesPacePusher {
    export namespace EnviarMensagemCanal {
        export const InputSchema = z4.object({
            mensagem: z4.object({}).loose(),
            canal: z4.string(),
            c: z4.any()
        });

        const OutputSchema = z4.object({
            canal: z4.union([z4.string(), z4.array(z4.string())]),
            evento: z4.string(),
            id: z4.string(),
            mensagem: z4.string(),
            remetente_id: z4.string(),
            timestamp: z4.string()
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace EnviarEventoParaOPusher {

        const EnvSchema = z4.object({
            PUSHER_APP_ID: z4.string(),
            PUSHER_APP_KEY: z4.string(),
            PUSHER_APP_SECRET: z4.string(),
            PUSHER_APP_CLUSTER: z4.string()
        });


        const PusherDataSchema = z4.object({
            channels: z4.union([z4.string(), z4.array(z4.string())]),
            event: z4.string(),
            data: z4.any()
        });

        export const InputSchema = z4.object({
            data: z4.object({
                pusher: PusherDataSchema,
                env: EnvSchema
            })
        });

        const OutputSchema = z4.object({
            data: z4.object({
                pusher: z4.object({
                    response: z4.any()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace CriarCriptografiaSha265 {

        const CriptografiaSchema = z4.object({
            data: z4.string(),
            secret: z4.string()
        });

        export const InputSchema = z4.object({
            data: z4.object({
                criptografia: CriptografiaSchema
            })
        });

        const OutputSchema = z4.object({
            data: z4.object({
                criptografia: z4.object({
                    signature: z4.string()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace CriarHashMd5 {

        const HashDataSchema = z4.object({
            data: z4.string()
        });

        export const InputSchema = z4.object({
            data: z4.object({
                hash: HashDataSchema
            })
        });

        const OutputSchema = z4.object({
            data: z4.object({
                hash: z4.object({
                    md5: z4.string()
                })
            })
        });

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSchema>;
    }
}

export default NamesPacePusher;