import * as z from 'zod';
import { useGlobalStore } from '../store/useGlobalStore';

export const formSchema = z
  .object({
    name: z.string().superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Name cannot be empty',
        });
        return;
      }

      if (val[0] !== val[0].toUpperCase()) {
        ctx.addIssue({
          code: 'custom',
          message: 'First letter must be uppercase',
        });
      }
    }),
    age: z.preprocess(
      (val) => (val === '' ? NaN : val),
      z.coerce
        .number({ error: 'Age is required' })
        .gte(1, 'Age cannot be less than 1')
    ),
    email: z.string().superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Email is required',
        });
        return;
      }

      const parts = val.split('@');
      if (parts.length !== 2) {
        ctx.addIssue({
          code: 'custom',
          message: 'Email must contain exactly one @',
        });
        return;
      }

      const [local, domain] = parts;

      if (!local.length || !domain.length) {
        ctx.addIssue({
          code: 'custom',
          message: "Local and Domain parts shouldn't be empty",
        });
        return;
      }

      if (domain.indexOf('.') === -1) {
        ctx.addIssue({
          code: 'custom',
          message: 'Domain must contain at least one dot',
        });
        return;
      }
    }),
    gender: z.string({ error: 'Choose one of the options' }),
    terms: z.preprocess(
      (val) => val === true || val === 'on',
      z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms',
      })
    ),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    country: z
      .string()
      .min(1, 'Country is required')
      .refine(
        (val): boolean => {
          const availableCountries = useGlobalStore.getState().countries;
          return availableCountries.includes(val);
        },
        { message: 'Chosen country must exist in the stored countries list' }
      ),
    image: z.preprocess(
      (val) => {
        if (val instanceof FileList) {
          if (val.length === 0) return undefined;
          return val.item(0) || undefined;
        }
        if (val instanceof File) {
          if (val.size === 0) return undefined;
          return val;
        }
        return val;
      },
      z
        .file({ message: 'Image is required' })
        .max(2 * 1024 * 1024, { message: 'File is too large (max 2MB)' })
        .mime(['image/png', 'image/jpeg', 'image/jpg'], {
          message: 'Only PNG and JPEG files are allowed',
        })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
    when(payload) {
      if (payload.value === undefined || payload.value === null) return false;
      // no issues with confirmPassword or password
      return payload.issues.every(
        (iss) =>
          iss.path?.[0] !== 'confirmPassword' && iss.path?.[0] !== 'password'
      );
    },
  });
