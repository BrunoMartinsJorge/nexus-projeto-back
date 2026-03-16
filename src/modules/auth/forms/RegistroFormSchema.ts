import { z } from 'zod';

const RegistroFormSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
});

export type RegistroForm = z.infer<typeof RegistroFormSchema>;

export default RegistroFormSchema;
