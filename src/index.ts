import BackendWorkerFinanceiro from "./backend-worker-financeiro";
import BackendBanco from "./backend-banco";

namespace t {
    export import Financeiro = BackendWorkerFinanceiro;

    export import Banco = BackendBanco;
    // Bucket: BackendWorkerFinanceiro,
    // Wave: BackendWorkerFinanceiro,
    // Portal: BackendWorkerFinanceiro,
    // Locatario: BackendWorkerFinanceiro,
    // Analisando: BackendWorkerFinanceiro,
}

export default t;