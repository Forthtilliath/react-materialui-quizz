import { z } from "zod";

export function numericEnum<TValues extends readonly number[]>(
  values: TValues
) {
  return z.number().superRefine((val, ctx) => {
    if (!values.includes(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid enum value. Expected ${values.join(
          " | "
        )}, received ${val}`,
      });
    }
  }) as z.ZodType<TValues[number]>;
}
