import { useState } from 'react';
import { getPasswordStrengthText } from '../../utils/passwordStrength';

interface UncontrolledPasswordProps {
  errors: Record<string, string>;
}

export const UncontrolledPassword = ({ errors }: UncontrolledPasswordProps) => {
  const [strengthText, setStrengthText] = useState<
    'Weak' | 'Medium' | 'Strong'
  >('Weak');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = getPasswordStrengthText(e.target.value);
    setStrengthText(text);
  };

  return (
    <>
      <div className="form-field">
        <label htmlFor="u-password">Password:</label>
        <input
          id="u-password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
        />
        {errors.password && <div className="err-msg">{errors.password}</div>}

        <div className={`password-status ${strengthText.toLowerCase()}`}>
          Password strength: <strong>{strengthText}</strong>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="u-confirm-password">Confirm Password:</label>
        <input id="u-confirm-password" type="password" name="confirmPassword" />
        {errors.confirmPassword && (
          <div className="err-msg">{errors.confirmPassword}</div>
        )}
      </div>
    </>
  );
};
