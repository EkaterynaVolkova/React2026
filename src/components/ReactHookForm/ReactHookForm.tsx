import { formSchema } from '../../schemas/formSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { SubmissionForm, SubmissionFormInput } from '../../types/types';
import { saveSubmission, useCountries } from '../../store/useGlobalStore';
import { getPasswordStrengthText } from '../../utils/passwordStrength';
import { convertFileToBase64 } from '../../utils/fileConverter';

interface ReactHookFormProps {
  onSubmit: () => void;
}

export const ReactHookForm = ({ onSubmit }: ReactHookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<SubmissionFormInput>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: undefined,
      terms: false,
      password: '',
      confirmPassword: '',
      country: '',
      image: undefined,
    },
  });
  const countries = useCountries();
  let finalData: SubmissionForm;

  const saveData: SubmitHandler<SubmissionFormInput> = async (data) => {
    try {
      const file = data.image as File;
      if (!file) return;

      const base64String = await convertFileToBase64(file);
      finalData = {
        ...data,
        age: Number(data.age),
        terms: true as const,
        image: base64String,
      };
    } catch (error) {
      console.error('Failed to convert image', error);
      finalData = {
        ...data,
        age: Number(data.age),
        terms: true as const,
        image: '',
      };
    } finally {
      saveSubmission(finalData);
      onSubmit();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const passwordValue = watch('password', '');
  const strengthText = getPasswordStrengthText(passwordValue);

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
        <label htmlFor="h-password">Password:</label>
        <input {...register('password')} id="h-password" type="password" />
        {errors.password && (
          <div className="err-msg">{errors.password.message}</div>
        )}
        <div className={`password-status ${strengthText.toLowerCase()}`}>
          Password strength: <strong>{strengthText}</strong>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="h-confirm-password">Confirm Password:</label>
        <input
          {...register('confirmPassword')}
          id="h-confirm-password"
          type="password"
        />
        {errors.confirmPassword && (
          <div className="err-msg">{errors.confirmPassword.message}</div>
        )}
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
        <label htmlFor="h-country">Country:</label>
        <input
          {...register('country')}
          id="h-country"
          type="text"
          list="hook-form-countries-list"
          placeholder="Choose country..."
        />
        {errors.country && (
          <div className="err-msg">{errors.country.message}</div>
        )}
        <datalist id="hook-form-countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <div className="form-field">
        <label htmlFor="h-image">Profile Picture:</label>
        <input
          {...register('image')}
          id="h-image"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
        {errors.image && <div className="err-msg">{errors.image.message}</div>}
      </div>

      <div className="form-field">
        <input {...register('terms')} type="checkbox" id="h-terms" />
        <label htmlFor="h-terms">Accept Terms & Conditions</label>
        {errors.terms && <div className="err-msg">{errors.terms.message}</div>}
      </div>

      <input
        type="submit"
        value="Submit"
        className="button primary-btn"
        disabled={!isValid}
      />
    </form>
  );
};
