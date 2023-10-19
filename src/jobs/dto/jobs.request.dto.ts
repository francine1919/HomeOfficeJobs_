import { z } from 'zod';

export const idParam = z
  .number()
  .gte(1, { message: 'Must be at least one number.' })
  .positive();

export const jobIds = z.union([
  z.number().positive().array(),
  z.number().positive(),
]);

export const jobBody = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  jobType: z.string(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  user: z.string(),
  country: z.string(),
  city: z.string(),
  international: z.boolean(),
  lastUpdated: z.date().optional(),
  optionals: z.string().optional(),
  optionalss: z.string().optional(),
});

export const bodyFilter = z
  .object({
    city: z.string(),
    country: z.string(),
    title: z.string(),
    benefits: z.string().array(),
    jobType: z.string(),
    international: z.boolean(),
  })
  .partial();

export const jobBodyArray = z.array(jobBody).nonempty();

export const jobUpdate = jobBody.partial();

export const jobUpdateBodyArray = z.array(jobUpdate).nonempty().min(1);

export const isBoolean = z.boolean();

export const isString = z.string();

// extract the inferred type like this
export type JobIds = z.infer<typeof jobIds>;
export type JobId = z.infer<typeof idParam>;
export type JobBody = z.infer<typeof jobBody>;
export type JobUpdateBody = z.infer<typeof jobUpdateBodyArray>;
export type FilterBody = z.infer<typeof bodyFilter>;
export type IsBoolean = z.infer<typeof isBoolean>;
export type IsString = z.infer<typeof isString>;
