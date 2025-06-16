import z4 from "zod/v4";

// COMO USAR ESTE NAMESPACE NA HORA DE IMPORTAR: 
// import t from "onda-types"
// t.Financeiro.Recebedor.Criar.Input

export namespace ControllerRecebedor {
  // Schemas auxiliares
  const TelefoneBasicoSchema = z4.object({
    ddd: z4.string(),
    numero: z4.string()
  });

  const TelefoneComTipoSchema = z4.object({
    ddd: z4.string(),
    numero: z4.string(),
    tipo: z4.union([z4.literal("celular"), z4.literal("fixo")])
  });

  const EnderecoCompletoSchema = z4.object({
    rua: z4.string(),
    complemento: z4.string(),
    numero_rua: z4.string(),
    bairro: z4.string(),
    cidade: z4.string(),
    estado: z4.string(),
    cep: z4.string(),
    ponto_referencia: z4.string()
  });

  const ContaBancariaSchema = z4.object({
    nome_titular: z4.string(),
    tipo_titular: z4.union([z4.literal("individual"), z4.literal("empresa")]),
    documento_titular: z4.string(),
    banco: z4.string(),
    numero_agencia: z4.string(),
    digito_agencia: z4.string(),
    numero_conta: z4.string(),
    digito_conta: z4.string(),
    tipo: z4.union([z4.literal("corrente"), z4.literal("poupanca"), z4.string()])
  });

  const ConfiguracoesTransferenciaSchema = z4.object({
    transferencia_habilitada: z4.boolean(),
    intervalo_transferencia: z4.union([z4.literal("Diaria"), z4.literal("Semanal"), z4.literal("Mensal")]),
    dia_transferencia: z4.number().int()
  });

  const ConfiguracoesAntecipacaoSchema = z4.object({
    habilitado: z4.boolean(),
    tipo: z4.union([z4.literal("completa"), z4.literal("parcial")]),
    percentual_volume: z4.string(),
    atraso: z4.number().nullable()
  });

  const SocioAdministradorSchema = z4.object({
    nome: z4.string(),
    email: z4.string().email(),
    documento: z4.string(),
    tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]),
    nome_mae: z4.string(),
    data_nascimento: z4.string(),
    renda_mensal: z4.number(),
    ocupacao_profissional: z4.string(),
    representante_legal_autodeclarado: z4.boolean(),
    endereco: EnderecoCompletoSchema,
    telefones: z4.array(TelefoneComTipoSchema)
  });

  export const RecebedorBaseSchema = z4.object({
    id: z4.uuid(),
    tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]),
    referencia_externa: z4.string(),
    nome: z4.string(),
    nome_mae: z4.string(),
    data_nascimento: z4.string(),
    renda_mensal: z4.number(),
    ocupacao_profissional: z4.string(),
    razao_social: z4.string(),
    nome_fantasia: z4.string(),
    faturamento_anual: z4.number(),
    tipo_empresa: z4.string(),
    data_fundacao: z4.string(),
    email: z4.string().email(),
    documento: z4.string(),
    site: z4.string(),
    telefones: z4.array(TelefoneBasicoSchema),
    endereco: EnderecoCompletoSchema,
    endereco_principal: EnderecoCompletoSchema,
    socios_administradores: z4.array(SocioAdministradorSchema),
    conta_bancaria: ContaBancariaSchema,
    configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
    configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
    codigo: z4.string()
  });

  export const RecebedorIndividualSchema = RecebedorBaseSchema.extend({
    id: z4.uuid(),
    tipo: z4.literal("individual"),
    nome: z4.string(),
    nome_mae: z4.string(),
    data_nascimento: z4.string(),
    renda_mensal: z4.number(),
    ocupacao_profissional: z4.string(),
    email: z4.string().email(),
    documento: z4.string(),
    site: z4.string(),
    telefones: z4.array(TelefoneBasicoSchema),
    endereco: EnderecoCompletoSchema,
    conta_bancaria: ContaBancariaSchema,
    configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
    configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
    codigo: z4.string()
  });

  export const RecebedorEmpresaSchema = RecebedorBaseSchema.extend({
    tipo: z4.literal("empresa"),
    razao_social: z4.string(),
    nome_fantasia: z4.string(),
    faturamento_anual: z4.number(),
    tipo_empresa: z4.string(),
    data_fundacao: z4.string(),
    email: z4.string().email(),
    documento: z4.string(),
    site: z4.string(),
    telefones: z4.array(TelefoneBasicoSchema),
    endereco_principal: EnderecoCompletoSchema,
    socios_administradores: z4.array(SocioAdministradorSchema),
    conta_bancaria: ContaBancariaSchema,
    configuracoes_transferencia: ConfiguracoesTransferenciaSchema,
    configuracoes_antecipacao: ConfiguracoesAntecipacaoSchema,
    codigo: z4.string()
  });

  const RecebedorDiscriminadoSchema = z4.discriminatedUnion("tipo", [
    RecebedorIndividualSchema,
    RecebedorEmpresaSchema
  ]);

  export namespace Criar {
    export const InputSchema = z4.object({
      data: z4.object({
        recebedor: RecebedorDiscriminadoSchema
      })
    });
    export type Input = z4.infer<typeof InputSchema>;

    export const OutputSchema = RecebedorDiscriminadoSchema;
    export type Output = {
      data: {
        recebedor: z4.infer<typeof OutputSchema>;
      }
    };
  }

  export namespace BuscarPeloFiltro {
    export const InputSchema = z4.object({
      filtros: z4.object({
        recebedores: z4.object({
          tipo: z4.union([z4.literal("individual"), z4.literal("empresa")]).optional(),
          referencia_externa: z4.string().optional(),
          documento: z4.string().optional(),
          email: z4.string().optional()
        })
      })
    });
    export type Input = z4.infer<typeof InputSchema>;

    export const OutputSchema = z4.array(Criar.OutputSchema);
    export type Output = {
      data: {
        recebedores: z4.infer<typeof OutputSchema>
      }
    };
  }

  export namespace BuscarPeloId {
    export const InputSchema = z4.object({
      data: z4.object({
        recebedor: z4.object({
          id: z4.string()
        })
      })
    });
    export type Input = z4.infer<typeof InputSchema>;

    export const OutputSchema = Criar.OutputSchema;
    export type Output = {
      data: {
        recebedor: z4.infer<typeof OutputSchema>
      }
    };
  }

  export namespace AtualizarPeloId {
    export const InputSchema = z4.object({
      data: z4.object({
        recebedor: z4.object({
          id: z4.string(),
          atualizacao: RecebedorBaseSchema.partial()
        })
      })
    });
    export type Input = z4.infer<typeof InputSchema>;

    export const OutputSchema = Criar.OutputSchema;
    export type Output = {
      data: {
        recebedor: z4.infer<typeof OutputSchema>
      }
    };
  }

  export namespace DeletarPeloId {
    export const InputSchema = z4.object({
      id: z4.string()
    });
    export type Input = z4.infer<typeof InputSchema>;

    export const OutputSchema = z4.object({
      sucesso: z4.boolean()
    });
    export type Output = {
      data: z4.infer<typeof OutputSchema>
    };
  }
}

export default ControllerRecebedor;
