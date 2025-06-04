namespace ControllerConsulta {

    export interface ConsultaBase {
        _id: string;
        data_criacao: string;
        data_atualizacao: string;
        ordem_servico_id: string;
        delete: boolean;
        consulta: string;
    }

    export namespace Criar {
        export interface Input {
            data: {
                consulta: {
                    ordem_servico_id: string;
                    consulta: object;
                };
            };
        }
        export type Output = {
            data: {
                consulta: ConsultaBase;
            };
        }
    };

    export namespace BuscarPeloFiltro {
        export interface Input {
            filtros: {
                consulta: {
                    _id?: string;
                    data_criacao?: string;
                    data_atualizacao?: string;
                    ordem_servico_id?: string;
                    delete?: boolean;
                    consulta?: string;
                };
            };
        }
        export type Output = {
            data: {
                consultas: ConsultaBase[];
            }
        };
    }

    export namespace BuscarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = {
            data: {
                consulta: ConsultaBase;
            };
        };
    }

    export namespace AtualizarPeloId {
        export interface Input {
            data: {
                consulta: {
                    _id: string;
                    data_criacao?: string;
                    data_atualizacao?: string;
                    ordem_servico_id?: string;
                    delete?: boolean;
                    consulta?: string;
                };
            };
        }
        export type Output = {
            data: {
                consulta: ConsultaBase;
            }
        }
    }

    export namespace DeletarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = {
            data: {
                consulta: ConsultaBase;
            }
        };
    }
}

export default ControllerConsulta;