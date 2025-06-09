namespace UserPayload {
    type UserPayloadImobiliaria = {
        onda_colaborador_email: string;
        onda_colaborador_name: string;
        onda_imob_email: string;
        onda_imob_codigo: string;
        onda_imob_status_register: number;
        onda_imob_cpfcnpj: string;
        onda_imob_nome: string;
        onda_imob_telefone: string;
        onda_imob_razaosocial: string;
        onda_imob_celular: string;
        onda_imob_executivo: number;
        onda_imob_parceiro: number;
        onda_imob_id: number;
        onda_colaborador_id: number;
        type_user: 'imobiliaria';
        iat?: number;
        organizacao: string;
    };
    type UserPayloadWave = {
        onda_user_username: string;
        onda_user_departamento: string;
        onda_user_email: string;
        onda_user_id: number;
        onda_imob_id: number;
        onda_colaborador_id: number;
        type_user: 'ONDA_USER';
        iat?: number;
        organizacao: string;
    };
    
    export type PatternUserPayload = UserPayloadImobiliaria | UserPayloadWave;
    export type AuthPayload = PatternUserPayload;
}

export default UserPayload;