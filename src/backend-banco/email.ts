import z4 from "zod/v4";
import t from "./index";

export namespace NamesPaceEmail {
    export namespace sendEmail {
        // Schema para endereço de email (string ou array de strings)
        const EmailAddressSchema = z4.union([
            z4.string(),
            z4.array(z4.string())
        ]);

        export type EmailAddress = z4.infer<typeof EmailAddressSchema>;

        // Schema para anexos
        const AttachmentSchema = z4.object({
            filename: z4.string(),
            content: z4.string()
        });

        // Schema para tags
        const TagSchema = z4.object({
            name: z4.string(),
            value: z4.string()
        });

        export const InputSchema = z4.object({
            c: z4.custom<t.Context>(),
            to: EmailAddressSchema,
            subject: z4.string(),
            html: z4.string(),
            from: z4.string().optional(),
            cc: EmailAddressSchema.optional(),
            bcc: EmailAddressSchema.optional(),
            reply_to: z4.string().optional(),
            text: z4.string().optional(),
            attachments: z4.array(AttachmentSchema).optional(),
            tags: z4.array(TagSchema).optional()
        });

        // Schema para output de sucesso
        const OutputSuccessSchema = z4.object({
            success: z4.literal(true),
            messageId: z4.string()
        });

        // Schema para output de erro
        const OutputErrorSchema = z4.object({
            success: z4.literal(false),
            error: z4.string()
        });

        // Schema para resposta (união de sucesso e erro)
        const ResponseSchema = z4.union([
            OutputSuccessSchema,
            OutputErrorSchema
        ]);

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = z4.infer<typeof OutputSuccessSchema>;
        export type OutputError = z4.infer<typeof OutputErrorSchema>;
        export type Response = z4.infer<typeof ResponseSchema>;
    }
}

export default NamesPaceEmail;