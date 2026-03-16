import { z } from 'zod';

const LoginFormSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

export default LoginFormSchema;
