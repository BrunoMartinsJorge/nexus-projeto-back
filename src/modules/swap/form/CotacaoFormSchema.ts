import { z } from 'zod';

const CotacaoFormSchema = z.object({
  tokenFrom: z.string(),
  tokenTo: z.string(),
  amount: z.number(),
});

export type CotacaoForm = z.infer<typeof CotacaoFormSchema>;

export default CotacaoFormSchema;
