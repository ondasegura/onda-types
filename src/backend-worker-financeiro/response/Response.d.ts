import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status'

export namespace Response {
  export interface BaseResponse<T = unknown> {
  status: number;
  code: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  results?: T[];
  error?: any;
  }

  export interface SuccessParams<T = unknown> {
    message?: string;
    results?: T[] | any;
    c?: Context;
  }

  export interface CreatedParams<T = unknown> extends SuccessParams<T> { }

  export interface WarningParams<T = unknown> {
    message?: string;
    results?: T[];
    c?: Context;
  }
  export interface ErrorWarningParams<T = unknown> {
    message: string;
    results: T[];
  }


  export interface ErrorParams<T = unknown> {
    message?: string;
    results?: T[];
    error?: any;
    c?: Context;
  }

  export interface ServerErrorParams {
    error: {
      status?: ContentfulStatusCode;
      code?: string;
      type?: string;
      message?: string;
      results?: any[];
    };
    c: Context;
  }

  export interface FileResponseParams {
    message?: string;
    file_buffer: Blob | ArrayBuffer | Uint8Array;
    content_type: string;
    filename?: string;
    c?: Context;
  }

  export interface NotFoundOrUnauthorizedParams {
    message?: string;
    c?: Context;
  }
}
