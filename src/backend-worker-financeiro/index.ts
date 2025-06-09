import { Context as HonoContext } from "hono";
import UP from "./token/token";
import P from "./pagarme";
import TypeOrder from "./defaultOrder/defaultOrder";
import R from './response/Response';
import ControllerHelpers from "./helpers";
import UserPayload from "./token/token";
import { Order as OrderModel } from "./pagarme/models/order";
namespace BackendWorkerFinanceiro {
    export interface Context extends HonoContext {
        Variables: {
            set(key: "usuario_auth", params: UserPayload.PatternUserPayload): UserPayload.PatternUserPayload;
            get(key: "usuario_auth"): UserPayload.PatternUserPayload;
        }
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
    }

    export namespace Models {
       export import Order = OrderModel;
    }

}
export default BackendWorkerFinanceiro;
