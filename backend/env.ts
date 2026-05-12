import { z } from "zod";

const envSchema = z.object({
  API_PORT: z
    .string()
    .regex(/^\d+$/, { message: "API_PORT deve ser um número" })
    .transform(Number),
  /** Origens permitidas separadas por vírgula. Se omitido, reflete a origem da requisição (útil em dev). */
  CORS_ORIGIN: z.string().optional(),
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:", _parsed.error.format());
  process.exit(1);
}

export const env = _parsed.data;

export function corsAllowedOrigins(): string[] | boolean {
  const raw = env.CORS_ORIGIN?.trim();
  if (!raw) return true;
  const list = raw.split(",").map((o) => o.trim()).filter(Boolean);
  return list.length > 0 ? list : true;
}