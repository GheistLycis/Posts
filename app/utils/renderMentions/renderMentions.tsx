import { JSX } from 'react';

const regex = /(@[\w.-]+)/g;

export const renderMentions = (input: string): JSX.Element[] =>
  input.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="text-primary font-semibold italic">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
