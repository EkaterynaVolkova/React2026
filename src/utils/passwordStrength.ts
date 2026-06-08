export const getPasswordStrengthText = (
  password: string
): 'Weak' | 'Medium' | 'Strong' => {
  if (!password) return 'Weak';

  const hasNumber = /[0-9]/.test(password) ? 1 : 0;
  const hasUppercase = /[A-Z]/.test(password) ? 1 : 0;
  const hasLowercase = /[a-z]/.test(password) ? 1 : 0;
  const hasSpecial = /[^A-Za-z0-9]/.test(password) ? 1 : 0;

  const totalScore = hasNumber + hasUppercase + hasLowercase + hasSpecial;

  if (totalScore === 4) return 'Strong';
  if (totalScore >= 2) return 'Medium';
  return 'Weak';
};
