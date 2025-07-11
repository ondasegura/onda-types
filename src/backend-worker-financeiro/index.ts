import {Context as HonoContext} from "hono";

// CONTROLLERS:
import UP from "./controllers/token";
import R from "./controllers/response";
import UserPayload from "./controllers/token";
import {ControllerFinanceiro as CF} from "./controllers/order";
import ControllerLog from "./controllers/log";
import ControllerRecebedor from "./controllers/recebedor";

// USAR ESSE PADRÃO DE IMPORTAÇÃO COM O NOME ESPLICITO:
import ControllerHelpers from "./controllers/helpers";
import ControllerContasReceber from "./controllers/conta_receber";
import ControllerCliente from "./controllers/cliente";

//SERVICES
import SP from "./services/pagarme";
import ServiceAsaas from "./services/asaas";
namespace BackendWorkerFinanceiro {
    export interface Context extends HonoContext {
        env: Env;
        set(key: "usuario_auth", params: UserPayload.UserToken): UserPayload.UserToken;
        get(key: "usuario_auth"): UserPayload.UserToken;
    }
    export import Token = UserPayload;
    export type User = UserPayload.PatternUserPayload;
    export interface Env {
        JSON_WEB_TOKEN_AUTH_USER: string;
        POSTGRESQL_DATABASE_URL: string;
        SK_PAGARME: string;
        URL_API_PAGARME: string;
        BASE_URL_ASAAS: string;
        SK_TOKEN_ASAAS: string;
    }
    export namespace Controllers {
        export import Response = R;
        export import UserPayload = UP;
        export import Helpers = ControllerHelpers;
        export import ControllerFinanceiro = CF; //remover apos o teste
        export import Log = ControllerLog;
        export import Recebedor = ControllerRecebedor;

        export import ContaReceber = ControllerContasReceber;
        //Cliente correto novo cadastro
        export import Cliente = ControllerCliente;
    }

    export namespace Services {
        export import ServicePagarme = SP;
        export import Asaas = ServiceAsaas;
    }
}
export default BackendWorkerFinanceiro;
