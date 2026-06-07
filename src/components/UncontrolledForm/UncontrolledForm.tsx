import { useState } from 'react';
import { formSchema } from '../../schemas/formSchema';
import { saveSubmission } from '../../store/useGlobalStore';
import { UncontrolledPassword } from '../UncontrolledPassword/UncontrolledPassword';

interface UncontrolledFormProps {
  onSubmit: () => void;
}

export const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const saveData = (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData);
    const results = formSchema.safeParse(rawData);
    if (results.success) {
      console.log(results.data);
      saveSubmission(results.data);
      onSubmit();
    } else {
      const formattedErrors: Record<string, string> = {};
      results.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <form onSubmit={saveData}>
      <div className="form-field">
        <label htmlFor="u-name">Name:</label>
        <input id="u-name" type="text" name="name" />
        {errors.name && <div className="err-msg">{errors.name}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="u-age">Age:</label>
        <input type="number" id="u-age" name="age" />
        {errors.age && <div className="err-msg">{errors.age}</div>}
      </div>
      <div className="form-field">
        <label htmlFor="u-email">Email:</label>
        <input type="text" id="u-email" name="email" />
        {errors.email && <div className="err-msg">{errors.email}</div>}
      </div>
      <UncontrolledPassword errors={errors} />
      <div className="form-field">
        <p>Gender:</p>
        <div>
          <input type="radio" id="u-gender-man" name="gender" value="man" />
          <label htmlFor="u-gender-man">Man</label>
        </div>
        <div>
          <input type="radio" id="u-gender-woman" name="gender" value="woman" />
          <label htmlFor="u-gender-woman">Woman</label>
        </div>
        {errors.gender && <div className="err-msg">{errors.gender}</div>}
      </div>
      <div className="form-field">
        <input type="checkbox" id="u-terms" name="terms" />
        <label htmlFor="u-terms">Accept Terms & Conditions</label>
        {errors.terms && <div className="err-msg">{errors.terms}</div>}
      </div>
      <input type="submit" value="Submit" className="button primary-btn" />
    </form>
  );
};
