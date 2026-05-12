import { z } from "zod";

const envSchema = z.object({
  API_PORT: z
    .string()
    .regex(/^\d+$/, { message: "API_PORT deve ser um número" })
    .transform(Number),
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:", _parsed.error.format());
  process.exit(1);
}

export const env = _parsed.data;