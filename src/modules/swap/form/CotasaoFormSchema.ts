import { z } from 'zod';

const CotasaoFormSchema = z.object({
  tokenFrom: z.string(),
  tokenTo: z.string(),
  amount: z.number(),
});

export type CotasaoForm = z.infer<typeof CotasaoFormSchema>;

export default CotasaoFormSchema;
