namespace ControllerContato {
    type ContatoTipo = "master" | "primario" | "secundario";

    interface ContatoBase {
        _id: string;
        usuario: string;
        nome: string;
        email: string;
        cpf_cnpj: string;
        rg: string;
        tipo: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    export namespace Criar {
        export interface Input {
            data: {
                contato: {
                    usuario: string;
                    nome: string;
                    email: string;
                    cpf_cnpj: string;
                    rg: string;
                    tipo?: ContatoTipo;
                };
            };
        }
        export type Output = ContatoBase;
    }

    export namespace BuscarPeloFiltro {
        export interface Input {
            filtros: {
                contato: {
                    _id?: string;
                    usuario?: string;
                    nome?: string;
                    email?: string;
                    cpf_cnpj?: string;
                    rg?: string;
                    tipo?: ContatoTipo;
                };
            };
        }
        export type Output = ContatoBase[];
    }

    export namespace BuscarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = ContatoBase;
    }

    export namespace AtualizarPeloId {
        export interface Input {
            id: string;
            data: {
                contato: {
                    usuario?: string;
                    nome?: string;
                    email?: string;
                    cpf_cnpj?: string;
                    rg?: string;
                    tipo?: ContatoTipo;
                };
            };
        }
        export type Output = ContatoBase;
    }

    export namespace DeletarPeloId {
        export interface Input {
            id: string;
        }
        export type Output = ContatoBase;
    }
}

export default ControllerContato;
