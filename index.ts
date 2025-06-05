// Importar os tipos dos backends
import * as BackendWorkerFinanceiro from "./dist/backend-worker-financeiro/index";
import * as BackendBanco from "./dist/backend-worker-financeiro/index";

// Namespace que agrupa todos os tipos
declare namespace t {
    // BACKENDS QUE ESTÃO FUNCIONANDO COM O PADRÃO TYPE:
    export import Financeiro = BackendWorkerFinanceiro;
    export import Banco = BackendBanco;

    // BACKENDS QUE NÃO ESTÃO FUNCIONANDO COM O PADRÃO TYPES:
    export import Bucket = BackendWorkerFinanceiro;
    export import Wave = BackendWorkerFinanceiro;
    export import Portal = BackendWorkerFinanceiro;
    export import Locatario = BackendWorkerFinanceiro;
    export import Analisando = BackendWorkerFinanceiro;
}

// Export default do namespace
export default t;

// Também exportar como named exports (opcional)
export { BackendWorkerFinanceiro, BackendBanco };