import { Context as HonoContext } from "hono";
import UserPayload from "./token/token";
import P from "./pagarme";
import TypeOrder from "./defaultOrder/defaultOrder";
namespace BackendWorkerFinanceiro {
    export interface Context extends HonoContext {
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
    }
    export import Pagarme = P;
    export import TypeDefaultOrderRequest = TypeOrder;
}
export default BackendWorkerFinanceiro;
