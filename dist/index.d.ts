import BackendWorkerFinanceiro from "./backend-wroker-financeiro";
import BackendBanco from "./backend-banco";
declare namespace t {
    // BACKENDS QUE ESTÃO FUNCIONADNO COM O PADRÃO TYPE:
    export import Financeiro = BackendWorkerFinanceiro;

    export import Banco = BackendBanco;

    //BACKENDS QUE NÃO ESTÃO FUNCIONANDO COM O PADRÃO TYPES:
    export import Bucket = BackendWorkerFinanceiro;

    export import Wave = BackendWorkerFinanceiro;

    export import Portal = BackendWorkerFinanceiro;

    export import Locatario = BackendWorkerFinanceiro;

    export import Analisando = BackendWorkerFinanceiro;

}

export default t;



