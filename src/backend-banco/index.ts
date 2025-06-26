import { Context as HonoContext } from "hono";
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

import ControllerCliente from "./controllers/cliente";
import NamesPaceOrdemServico from "./controllers/ordem_servio";
import ControllerUsuario from "./controllers/usuario";
import ControllerAsaas from "./controllers/asaas";
import NamesPacePusher from "./controllers/pusher";
import NamesPaceEmail from "./controllers/email";
import ControllerFinanceiro from "./controllers/financeiro";
import ControllerConsulta from "./controllers/consulta";
import ControllerHelpers from "./controllers/helpers";
import ControllerBucket from "./controllers/bucket";

import ControllerSistema from "./controllers/sistema";

import ControllerLog from "./controllers/log";

import ControllerContasPagar from "./controllers/contasPagar";
namespace BackendBanco {
    export namespace Controllers {
        export import Cliente = ControllerCliente;

        export import OrdemServico = NamesPaceOrdemServico;

        export import Usuario = ControllerUsuario;

        export import Asaas = ControllerAsaas;

        export import Pusher = NamesPacePusher;

        export import Email = NamesPaceEmail;

        export import Financeiro = ControllerFinanceiro;

        export import Consulta = ControllerConsulta;

        export import Helpers = ControllerHelpers;

        export import Bucket = ControllerBucket;

        export import Log = ControllerLog;

        export import Sistema = ControllerSistema;


        export import ContaPagar = ControllerContasPagar;
    }


    export type Next = import("hono").Next;

    export interface setResponse {
        status: number;
        code: string;
        type: string;
        message: string;
        results: object
    }

    export interface ContextoPadrao<T> {
        data: T;
        loading: boolean;
        _ids?: string[];
    }


    export interface Env {
        JSON_WEB_TOKEN_AUTH_USER: string;
        SET_UUID_USUARIO_MASTER: string;
        SET_SENHA_USUARIO_MASTER: string;
        POSTGRESQL_DATABASE_URL: string;
        SK_TOKEN_ASAAS: string;
        BASE_URL_ASAAS: string;
        BASE_URL_FRONTEND_BANCO_IFRAME_ASAAS: string;
        PUSHER_APP_ID: string,
        PUSHER_APP_KEY: string,
        PUSHER_APP_SECRET: string,
        PUSHER_APP_CLUSTER: string,
        RESEND_API_KEY: string,
        BEARER_TOKEN_BACKEND_WAVE: string,
        BASE_URL_BACKEND_WAVE: string,
        SET_TOKEN_ANALISANDO: string,
        DB: D1Database,
        BUCKET_BINDING: R2Bucket,
        AMBIENTE: "PRODUCAO" | "SANDBOX";
    }

    export interface Context extends HonoContext {
        env: Env;
        set(key: "usuario_auth", params: BackendBanco.Controllers.Usuario.Auth): BackendBanco.Controllers.Usuario.Auth;
        get(key: "usuario_auth"): BackendBanco.Controllers.Usuario.Auth;
    }
}

export default BackendBanco;
