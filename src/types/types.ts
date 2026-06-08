import type z from 'zod';
import type { formSchema } from '../schemas/formSchema';

export type SubmissionFormInput = z.input<typeof formSchema>;
export type SubmissionFormInfer = z.infer<typeof formSchema>;
export type SubmissionForm = Omit<SubmissionFormInfer, 'image'> & {
  image: string;
  terms: boolean | unknown;
};
