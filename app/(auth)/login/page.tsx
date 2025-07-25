'use client';
import { Button, Input } from '@heroui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useLogin } from './hooks/useLogin';

const Login: FC = () => {
  const { control, errors, isLoading, isValid, login } = useLogin();

  return (
    <main>
      <div className="bg-background flex w-[280px] flex-col gap-2 rounded-2xl border border-[#CCC] p-4 md:w-[500px]">
        <h2 className="mb-2 font-bold md:text-[22px]">
          Welcome to CodeLeap network!
        </h2>

        <Controller
          control={control}
          name="user"
          render={({ field }) => (
            <Input
              {...field}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]?.message}
              label="Please enter your username"
              placeholder="John Doe"
              aria-label="Username input"
              labelPlacement="outside"
              variant="bordered"
              size="sm"
              classNames={{
                input: 'placeholder-[#CCC]!',
                label: 'text-sm md:text-base',
              }}
            />
          )}
        />

        <div className="flex justify-end">
          <Button
            onPress={login}
            isDisabled={!isValid}
            isLoading={isLoading}
            className="bg-primary w-[111px] rounded-lg text-base font-bold text-white"
            aria-label="Login button"
            size="sm"
          >
            ENTER
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Login;
