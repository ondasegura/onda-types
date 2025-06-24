import TypeOrder from "./order";
import TypeCustomer from "./customer";
import ControllerRecebedor from "../recebedor/recebedor";
namespace Pagarme {
    export import Order = TypeOrder;
    export import Customer = TypeCustomer;
    export import Recebedor = ControllerRecebedor;
}

export default Pagarme;
