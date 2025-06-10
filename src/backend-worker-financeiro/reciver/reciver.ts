// const fisicaSchema = z.object({
//   tipo: z.literal("fisica"),
//   cpf: z.string().min(11),
// });

// const juridicaSchema = z.object({
//   tipo: z.literal("juridica"),
//   cnpj: z.string().min(14),
// });

// const schema = z.discriminatedUnion("tipo", [fisicaSchema, juridicaSchema]);
