import { z } from 'zod';

const SaqueFormSchema = z.object({
  token: z.string(),
  amount: z.number(),
});

export type SaqueForm = z.infer<typeof SaqueFormSchema>;

export default SaqueFormSchema;
