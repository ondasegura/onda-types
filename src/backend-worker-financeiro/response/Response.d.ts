import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { z4 } from 'zod/v4';

namespace Response {
  // Schema base para responses
  export const BaseResponseSchema = z4.object({
    status: z4.number(),
    code: z4.string(),
    type: z4.enum(['success', 'error', 'warning']),
    message: z4.string(),
    results: z4.array(z4.unknown()).optional(),
    error: z4.unknown().optional(),
  });

  export type BaseResponse<T = unknown> = z4.infer<typeof BaseResponseSchema>;

  // Schema para parâmetros de sucesso
  export const SuccessParamsSchema = z4.object({
    message: z4.string().optional(),
    results: z4.union([z4.array(z4.unknown()), z4.unknown()]).optional(),
    c: z4.custom<Context>().optional(),
  });

  export type SuccessParams<T = unknown> = z4.infer<typeof SuccessParamsSchema>;

  // Schema para parâmetros de criação (extends SuccessParams)
  export const CreatedParamsSchema = SuccessParamsSchema;
  export type CreatedParams<T = unknown> = SuccessParams<T>;

  // Schema para parâmetros de warning
  export const WarningParamsSchema = z4.object({
    message: z4.string().optional(),
    results: z4.array(z4.unknown()).optional(),
    c: z4.custom<Context>().optional(),
  });

  export type WarningParams<T = unknown> = z4.infer<typeof WarningParamsSchema>;

  // Schema para parâmetros de error warning
  export const ErrorWarningParamsSchema = z4.object({
    message: z4.string(),
    results: z4.array(z4.unknown()),
  });

  export type ErrorWarningParams<T = unknown> = z4.infer<typeof ErrorWarningParamsSchema>;

  // Schema para parâmetros de erro
  export const ErrorParamsSchema = z4.object({
    message: z4.string().optional(),
    results: z4.array(z4.unknown()).optional(),
    error: z4.unknown().optional(),
    c: z4.custom<Context>().optional(),
  });

  export type ErrorParams<T = unknown> = z4.infer<typeof ErrorParamsSchema>;

  // Schema para parâmetros de erro do servidor
  export const ServerErrorParamsSchema = z4.object({
    error: z4.object({
      status: z4.custom<ContentfulStatusCode>().optional(),
      code: z4.string().optional(),
      type: z4.string().optional(),
      message: z4.string().optional(),
      results: z4.array(z4.unknown()).optional(),
    }),
    c: z4.custom<Context>(),
  });

  export type ServerErrorParams = z4.infer<typeof ServerErrorParamsSchema>;

  // Schema para parâmetros de resposta de arquivo
  export const FileResponseParamsSchema = z4.object({
    message: z4.string().optional(),
    file_buffer: z4.union([
      z4.custom<Blob>(),
      z4.custom<ArrayBuffer>(),
      z4.custom<Uint8Array>(),
    ]),
    content_type: z4.string(),
    filename: z4.string().optional(),
    c: z4.custom<Context>().optional(),
  });

  export type FileResponseParams = z4.infer<typeof FileResponseParamsSchema>;

  // Schema para parâmetros de não encontrado ou não autorizado
  export const NotFoundOrUnauthorizedParamsSchema = z4.object({
    message: z4.string().optional(),
    c: z4.custom<Context>().optional(),
  });

  export type NotFoundOrUnauthorizedParams = z4.infer<typeof NotFoundOrUnauthorizedParamsSchema>;

  // Funções de validação para facilitar o uso
  export const validateSuccessParams = (data: unknown) =>
    SuccessParamsSchema.parse(data);

  export const validateCreatedParams = (data: unknown) =>
    CreatedParamsSchema.parse(data);

  export const validateWarningParams = (data: unknown) =>
    WarningParamsSchema.parse(data);

  export const validateErrorWarningParams = (data: unknown) =>
    ErrorWarningParamsSchema.parse(data);

  export const validateErrorParams = (data: unknown) =>
    ErrorParamsSchema.parse(data);

  export const validateServerErrorParams = (data: unknown) =>
    ServerErrorParamsSchema.parse(data);

  export const validateFileResponseParams = (data: unknown) =>
    FileResponseParamsSchema.parse(data);

  export const validateNotFoundOrUnauthorizedParams = (data: unknown) =>
    NotFoundOrUnauthorizedParamsSchema.parse(data);

  export const validateBaseResponse = (data: unknown) =>
    BaseResponseSchema.parse(data);
}

export default Response