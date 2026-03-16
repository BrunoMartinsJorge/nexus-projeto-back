import { z } from 'zod';

const DepositFormSchema = z.object({
  token: z.string(),
  amount: z.number(),
  idempotencyKey: z.string(),
  userId: z.number(),
});

export type DepositForm = z.infer<typeof DepositFormSchema>;

export default DepositFormSchema;
