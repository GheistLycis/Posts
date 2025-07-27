'use client';
import { FILE } from '@constants/file';
import { Button, Input, Textarea } from '@heroui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { MdDelete, MdFileUpload } from 'react-icons/md';
import { useNewPost } from './hooks/useNewPost';

const MAX_CONTENT_LEN = 3000;

const NewPost: FC = () => {
  const { uploadInputRef, control, errors, isLoading, isValid, submit } =
    useNewPost();

  return (
    <section className="border-gray flex w-full max-w-[752px] flex-col gap-4 rounded-2xl border p-4">
      <h2 className="font-bold md:text-[22px]">What&apos;s on your mind?</h2>

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

      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <Input
              ref={uploadInputRef}
              type="file"
              onChange={(file) =>
                file.target.files && field.onChange(file.target.files[0])
              }
              accept={Object.keys(FILE.ACCEPTED_TYPES).join(',')}
              className="hidden"
            />

            <div
              onClick={() => !field.value && uploadInputRef.current?.click()}
              className={`border-gray flex items-center justify-between rounded-lg border px-4 py-2 ${field.value ? '' : 'cursor-pointer duration-200 hover:opacity-50'}`}
            >
              <p className="text-subtitle max-w-[60ch] truncate text-sm">
                {field.value
                  ? field.value.name
                  : `Attach media (max ${FILE.MAX_SIZE_MB} MB)`}
              </p>

              {field.value ? (
                <MdDelete
                  onClick={() => field.onChange(undefined)}
                  size={24}
                  className="text-red cursor-pointer duration-200 hover:opacity-50"
                />
              ) : (
                <MdFileUpload size={24} className="text-primary" />
              )}
            </div>

            {errors[field.name] && (
              <p className="text-red pl-2 text-sm">
                {errors[field.name]!.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="mt-2 flex justify-end">
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
