const regex = /<script\b[^>]*>(.*?)<\/script>/gi;

export const maliciousInputValidator = (input: string): boolean =>
  !regex.test(input);
