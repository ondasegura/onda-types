import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { z } from 'zod';

export namespace Response {
  // Schema base para responses
  export const BaseResponseSchema = z.object({
    status: z.number(),
    code: z.string(),
    type: z.enum(['success', 'error', 'warning']),
    message: z.string(),
    results: z.array(z.unknown()).optional(),
    error: z.unknown().optional(),
  });

  export type BaseResponse<T = unknown> = z.infer<typeof BaseResponseSchema>;

  // Schema para parâmetros de sucesso
  export const SuccessParamsSchema = z.object({
    message: z.string().optional(),
    results: z.union([z.array(z.unknown()), z.unknown()]).optional(),
    c: z.custom<Context>().optional(),
  });

  export type SuccessParams<T = unknown> = z.infer<typeof SuccessParamsSchema>;

  // Schema para parâmetros de criação (extends SuccessParams)
  export const CreatedParamsSchema = SuccessParamsSchema;
  export type CreatedParams<T = unknown> = SuccessParams<T>;

  // Schema para parâmetros de warning
  export const WarningParamsSchema = z.object({
    message: z.string().optional(),
    results: z.array(z.unknown()).optional(),
    c: z.custom<Context>().optional(),
  });

  export type WarningParams<T = unknown> = z.infer<typeof WarningParamsSchema>;

  // Schema para parâmetros de error warning
  export const ErrorWarningParamsSchema = z.object({
    message: z.string(),
    results: z.array(z.unknown()),
  });

  export type ErrorWarningParams<T = unknown> = z.infer<typeof ErrorWarningParamsSchema>;

  // Schema para parâmetros de erro
  export const ErrorParamsSchema = z.object({
    message: z.string().optional(),
    results: z.array(z.unknown()).optional(),
    error: z.unknown().optional(),
    c: z.custom<Context>().optional(),
  });

  export type ErrorParams<T = unknown> = z.infer<typeof ErrorParamsSchema>;

  // Schema para parâmetros de erro do servidor
  export const ServerErrorParamsSchema = z.object({
    error: z.object({
      status: z.custom<ContentfulStatusCode>().optional(),
      code: z.string().optional(),
      type: z.string().optional(),
      message: z.string().optional(),
      results: z.array(z.unknown()).optional(),
    }),
    c: z.custom<Context>(),
  });

  export type ServerErrorParams = z.infer<typeof ServerErrorParamsSchema>;

  // Schema para parâmetros de resposta de arquivo
  export const FileResponseParamsSchema = z.object({
    message: z.string().optional(),
    file_buffer: z.union([
      z.custom<Blob>(),
      z.custom<ArrayBuffer>(),
      z.custom<Uint8Array>(),
    ]),
    content_type: z.string(),
    filename: z.string().optional(),
    c: z.custom<Context>().optional(),
  });

  export type FileResponseParams = z.infer<typeof FileResponseParamsSchema>;

  // Schema para parâmetros de não encontrado ou não autorizado
  export const NotFoundOrUnauthorizedParamsSchema = z.object({
    message: z.string().optional(),
    c: z.custom<Context>().optional(),
  });

  export type NotFoundOrUnauthorizedParams = z.infer<typeof NotFoundOrUnauthorizedParamsSchema>;

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