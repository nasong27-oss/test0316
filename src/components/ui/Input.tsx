import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export function Input({ label, required, error, id, ...props }: InputProps) {
  const inputId = id ?? label;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={inputId}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-olive-700 focus:outline-none focus:ring-1 focus:ring-olive-600"
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
