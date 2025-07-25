import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@utils/fetch/fetch';
import { maliciousInputValidator } from '@utils/validators/maliciousInputValidator';
import { LoginReq } from 'app/api/utils/types/auth/LoginReq';
import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

interface UseLogin {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  isLoading: boolean;
  isValid: boolean;
  login: () => void;
}

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  user: z
    .string()
    .nonempty('Enter your username')
    .refine(maliciousInputValidator, 'Malicious input detected!'),
});

export const useLogin = (): UseLogin => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const { control, formState, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { errors, isValid } = formState;
  const values = watch();

  const login = useCallback(
    () =>
      startTransition(() =>
        fetchApi<null, LoginReq>('/api/auth/login', {
          method: 'POST',
          body: { user: values.user },
        }).then(() => router.push('/'))
      ),
    [values, router]
  );

  return { control, errors, isLoading, isValid, login };
};
