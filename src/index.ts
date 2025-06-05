// import BackendWorkerFinanceiro from "./backend-worker-financeiro";
import backendbanco from "./backend-banco";
namespace t {
    // BACKENDS QUE ESTÃO FUNCIONANDO COM O PADRÃO TYPE:
    // Financeiro: BackendWorkerFinanceiro,
    export import BackendBanco = backendbanco

    // // BACKENDS QUE NÃO ESTÃO FUNCIONANDO COM O PADRÃO TYPES:
    // Bucket: BackendWorkerFinanceiro,
    // Wave: BackendWorkerFinanceiro,
    // Portal: BackendWorkerFinanceiro,
    // Locatario: BackendWorkerFinanceiro,
    // Analisando: BackendWorkerFinanceiro,
}


export default t;



