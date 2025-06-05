namespace ControllerBucket {

    export type ArquivoType = "assinatura" | 'foto_rosto' | "rg_cnh_frente_verso" | "ficha_associativa" | 'rg_cnh_frente' | "rg_cnh_verso"
    export interface ArquivoBase {
        _id: string;
        name: string;
        filename: string;
        encoding: string;
        mimetype: string;
        type: string;
        size: number;
        caminho_relativo: string;
        is_template: boolean;
        criado_por_id: string;
        alterado_por_id: string;
        v: number;
        data_criacao: string;
        data_atualizacao: string;
        createdAt: string;
        updatedAt: string;
    }

    export namespace Criar {
        export interface Input {
            data: {
                arquivo: {
                    name: string;
                    filename: string;
                    encoding?: string;
                    mimetype?: string;
                    type?: string;
                    size: number;
                    caminho_relativo?: string;
                    is_template?: boolean;
                    criado_por_id?: string;
                    alterado_por_id?: string;
                };
            };
        }
        export type Output = ArquivoBase;
    }

    export namespace BuscarPeloFiltro {
        export interface Input {
            filtros: {
                arquivo: {
                    _id?: string;
                    name?: string;
                    filename?: string;
                    mimetype?: string;
                    type?: string;
                    is_template?: boolean;
                    criado_por_id?: string;
                    alterado_por_id?: string;
                };
            };
        }
        export type Output = ArquivoBase[];
    }

    export namespace BuscarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = ArquivoBase;
    }

    export namespace AtualizarPeloId {
        export interface Input {
            id: string;
            data: {
                arquivo: {
                    name?: string;
                    filename?: string;
                    encoding?: string;
                    mimetype?: string;
                    type?: string;
                    size?: number;
                    caminho_relativo?: string;
                    is_template?: boolean;
                    alterado_por_id?: string;
                };
            };
        }
        export type Output = ArquivoBase;
    }

    export namespace DeletarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = ArquivoBase;
    }
}

export default ControllerBucket;
