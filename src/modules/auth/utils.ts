type PasswordHashCalculator = (password: string) => string;
export const calculatePasswordHash: PasswordHashCalculator = password => {
  return password;
};
