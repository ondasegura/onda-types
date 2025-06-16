import z4 from "zod/v4";

namespace ControllerLogs {
  export const LogTypeSchema = z4.union([
    z4.literal("error"),
    z4.literal("log")
  ]);

  export const LogSchema = z4.object({
    class_name: z4.string(),
    matrix: z4.string(),
    static_function: z4.string(),
    error_message: z4.string(),
    error_returned_by_system: z4.unknown(),
    organization: z4.string(),
    type: LogTypeSchema,
    user: z4.string(),
    type_user: z4.string()
  });

  export type LogBase = z4.infer<typeof LogSchema>;

    export namespace Criar {
      export const InputSchema = z4.object({
        data: z4.object({
          log: z4.object({
            class_name: z4.string(),
            matrix: z4.string(),
            static_function: z4.string(),
            error_message: z4.string(),
            error_returned_by_system: z4.unknown(),
            organization: z4.string(),
            type: LogTypeSchema,
            user: z4.string(),
            type_user: z4.string()
          })
        })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = LogSchema;
        export type Output = {
          data: {
            log: z4.infer<typeof OutputSchema>;
          }
        }
    }

    export namespace BuscarPeloFiltro {
      export const InputSchema = z4.object({
        filtros: z4.object({
          log: z4.object({
            _id: z4.string().optional().nullable(),
            class_name: z4.string().optional().nullable(),
            matrix: z4.string().optional().nullable(),
            static_function: z4.string().optional().nullable(),
            error_message: z4.string().optional().nullable(),
            error_returned_by_system: z4.unknown().optional().nullable(),
            organization: z4.string().optional().nullable(),
            type: LogTypeSchema,
            user: z4.string().optional().nullable(),
            type_user: z4.string().optional().nullable()
          })
        })
      });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(LogSchema);
        export type Output = {
          data: {
            logs: z4.infer<typeof OutputSchema>;
          }
        }
    }
    
  
}

export default ControllerLogs;
