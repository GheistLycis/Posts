export const maliciousInputValidator = (input: string): boolean =>
  /^(?!.*(<script\b[^>]*>.*?<\/script>|javascript:|<[^>]+>)).*$/i.test(input);
