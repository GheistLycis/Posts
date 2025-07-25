'use client';
import { Button, Input, Textarea } from '@heroui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useNewPost } from './hooks/useNewPost';

const MAX_CONTENT_LEN = 3000;

const NewPost: FC = () => {
  const { control, errors, isLoading, isValid, submit } = useNewPost();

  return (
    <section className="border-gray flex w-full max-w-[752px] flex-col gap-4 rounded-2xl border p-4">
      <h2 className="font-bold">What&apos;s on your mind?</h2>

      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            isInvalid={!!errors[field.name]}
            errorMessage={errors[field.name]?.message}
            label="Title"
            placeholder="Hello world"
            aria-label="Post title input"
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

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <Textarea
            {...field}
            isInvalid={!!errors[field.name]}
            errorMessage={errors[field.name]?.message}
            label="Content"
            placeholder="Content here"
            aria-label="Post content input"
            labelPlacement="outside"
            variant="bordered"
            isClearable
            minRows={3}
            maxRows={3}
            maxLength={MAX_CONTENT_LEN}
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
          onPress={submit}
          isDisabled={!isValid}
          isLoading={isLoading}
          className="bg-primary w-[120px] rounded-lg text-base font-bold text-white"
          aria-label="Login button"
          size="sm"
        >
          Create
        </Button>
      </div>
    </section>
  );
};

export default NewPost;
