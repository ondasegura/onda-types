import { Context as HonoContext } from "hono";


// CONTROLLERS:
import UP from "./controllers/token";
import P from "./controllers/pagarme";
import DefaultOrder from "./controllers/default_order";
import TypeCustomer from "./controllers/pagarme/customer";
import R from './controllers/response';
import UserPayload from "./controllers/token";
import { ControllerFinanceiro as CF } from "./controllers/order";
import CL from "./controllers/logs";
import CR from "./controllers/recebedor"

// USAR ESSE PADRÃO DE IMPORTAÇÃO COM O NOME ESPLICITO:
import ControllerHelpers from "./controllers/helpers";
import ControllerContasReceber from "./controllers/conta_receber";
import ControllerCliente from "./controllers/cliente";


//SERVICES
import ServicePagarme from "./services/pagarme";
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
        export import Pagarme = P;
        export import TypeDefaultOrderRequest = DefaultOrder;
        export import Response = R;
        export import UserPayload = UP;
        export import Helpers = ControllerHelpers;
        export import Customer = TypeCustomer;
        export import ControllerFinanceiro = CF; //remover apos o teste
        export import ControllerLogs = CL;
        export import Recebedor = CR;

        export import ContaReceber = ControllerContasReceber;
        //Cliente correto novo cadastro
        export import Cliente = ControllerCliente;
    }

    export namespace Services {
        export import Pagarme = ServicePagarme;
        export import Asaas = ServiceAsaas;
    }
}
export default BackendWorkerFinanceiro;
