import z4 from "zod/v4";


// COMO USAR ESE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Banco.Controllers.Logs.Criar.Input
namespace ControllerLog {
    export const LogBaseSchema = z4.object({
        _id: z4.int(),
        matrix: z4.uuidv4(),
        data_criacao: z4.date(),
        usuario_create_id: z4.uuidv4(),
        mensagem_id: z4.number(),
    });
    export type LogBase = z4.infer<typeof LogBaseSchema>;

    export namespace Criar {
        export const InputSchema = z4.object({
            data: z4.object({
                log: z4.object({
                    matrix: z4.uuidv4(),
                    mensagem_id: z4.number().int()
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = LogBaseSchema;
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
                    _id: z4.int().optional(),
                    matrix: z4.uuidv4().optional(),
                    data_criacao: z4.date().optional(),
                    usuario_create_id: z4.number().optional(),
                    mensagem_id: z4.number().int().optional(),
                })
            })
        });
        export type Input = z4.infer<typeof InputSchema>;

        export const OutputSchema = z4.array(LogBaseSchema);
        export type Output = {
            data: {
                logs: z4.infer<typeof OutputSchema>;
            }
        }
    }

}

export default ControllerLog;