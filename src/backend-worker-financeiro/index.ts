import { Context as HonoContext } from "hono";
import UP from "./controllers/token/token";
import P from "./controllers/pagarme";
import TypeOrder from "./controllers/defaultOrder/defaultOrder";
import TypeCustomer from "./controllers/pagarme/customer";
import R from './controllers/response/Response';
import ControllerHelpers from "./controllers/helpers";
import UserPayload from "./controllers/token/token";
import { ControllerFinancial as CF } from "./order";
import CL from "./controllers/logs/logs";
import CR from "./controllers/recebedor/recebedor"
import ControllerClientes from "../backend-banco/cliente";

//SERVICES
import ServicePagarme from "./services/pagarme";
namespace BackendWorkerFinanceiro {
    // export interface Context extends HonoContext {
    //     env: {
    //         set(key: "usuario_auth", params: UserPayload.PatternUserPayload): UserPayload.PatternUserPayload;
    //         get(key: "usuario_auth"): UserPayload.PatternUserPayload;
    //     }


    // }

    export interface Context extends HonoContext {
        env: Env;
        set(key: "usuario_auth", params: UserPayload.PatternUserPayload): UserPayload.PatternUserPayload;
        get(key: "usuario_auth"): UserPayload.PatternUserPayload;
    }
    export type User = UserPayload.PatternUserPayload;
    export interface Env {
        JSON_WEB_TOKEN_AUTH_USER: string;
        POSTGRESQL_DATABASE_URL: string;
        SK_PAGARME: string;
        URL_API_PAGARME: string;
    }
    export namespace Controllers {
        export import Pagarme = P;
        export import TypeDefaultOrderRequest = TypeOrder;
        export import Response = R;
        export import UserPayload = UP;
        export import Helpers = ControllerHelpers;
        export import Customer = TypeCustomer;
        export import ControllerFinancial = CF;
        export import ControllerLogs = CL;
        export import Recebedor = CR;
        export import Clientes = ControllerClientes;
    }

    export namespace Services {
        export import Pagarme = ServicePagarme;
    }
}
export default BackendWorkerFinanceiro;
