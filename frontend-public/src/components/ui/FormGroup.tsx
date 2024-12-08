import React from 'react';

export default function FormGroup({ text, className, ...props }: Props) {
  const baseClass = `p-2 bg-neutral-700 rounded`;

  return (
    <div className="space-y-1 flex flex-col">
      <label className="text-sm font-bold" htmlFor={text}>
        {text}
      </label>
      <input
        required
        className={`${baseClass} ${className || ''}`}
        id={text}
        {...props}
      />
    </div>
  );
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  className?: string;
}
