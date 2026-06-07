import { formSchema } from '../../schemas/formSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { SubmissionForm, SubmissionFormInput } from '../../types/types';
import { saveSubmission } from '../../store/useGlobalStore';

interface ReactHookFormProps {
  onSubmit: () => void;
}

export const ReactHookForm = ({ onSubmit }: ReactHookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SubmissionFormInput, object, SubmissionForm>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: undefined,
      terms: false,
    },
  });

  const saveData: SubmitHandler<SubmissionForm> = (data) => {
    console.log(data);
    saveSubmission(data);
    onSubmit();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <div className="form-field">
        <label htmlFor="h-name">Name:</label>
        <input {...register('name')} id="h-name" type="text" />
        {errors.name && <div className="err-msg">{errors.name.message}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="h-age">Age:</label>
        <input {...register('age')} type="number" id="h-age" />
        {errors.age && <div className="err-msg">{errors.age.message}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="h-email">Email:</label>
        <input {...register('email')} type="text" id="h-email" />
        {errors.email && <div className="err-msg">{errors.email.message}</div>}
      </div>
      <div className="form-field">
        <p>Gender:</p>
        <div>
          <input
            {...register('gender')}
            type="radio"
            id="h-gender-man"
            value="man"
          />
          <label htmlFor="h-gender-man">Man</label>
        </div>
        <div>
          <input
            {...register('gender')}
            type="radio"
            id="h-gender-woman"
            value="woman"
          />
          <label htmlFor="h-gender-woman">Woman</label>
        </div>
        {errors.gender && (
          <div className="err-msg">{errors.gender.message}</div>
        )}
      </div>
      <div className="form-field">
        <input {...register('terms')} type="checkbox" id="h-terms" />
        <label htmlFor="h-terms">Accept Terms & Conditions</label>
        {errors.terms && <div className="err-msg">{errors.terms.message}</div>}
      </div>
      <input type="submit" value="Submit" className="button primary-btn" />
    </form>
  );
};
