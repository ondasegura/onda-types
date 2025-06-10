import { Context as HonoContext } from "hono";
import UP from "./token/token";
import P from "./pagarme";
import TypeOrder from "./defaultOrder/defaultOrder";
import TypeCustomer from "./pagarme/customer";
import R from './response/Response';
import ControllerHelpers from "./helpers";
import UserPayload from "./token/token";
import { ControllerFinancial as CF } from "./order";
import CL from "./logs/logs";
namespace BackendWorkerFinanceiro {
    // export interface Context extends HonoContext {
    //     env: {
    //         set(key: "usuario_auth", params: UserPayload.PatternUserPayload): UserPayload.PatternUserPayload;
    //         get(key: "usuario_auth"): UserPayload.PatternUserPayload;
    //     }


    // }

    export interface Context extends HonoContext {
        env: env;
        set(key: "usuario_auth", params: UserPayload.PatternUserPayload): UserPayload.PatternUserPayload;
        get(key: "usuario_auth"): UserPayload.PatternUserPayload;
    }
    export type User = UserPayload.PatternUserPayload;
    export interface env {
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
    }
}
export default BackendWorkerFinanceiro;
