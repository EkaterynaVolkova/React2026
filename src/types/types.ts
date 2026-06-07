import type z from 'zod';
import type { formSchema } from '../schemas/formSchema';

export type SubmissionFormInput = z.input<typeof formSchema>;
export type SubmissionForm = z.infer<typeof formSchema>;
