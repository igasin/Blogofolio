import { FC, RefObject, KeyboardEvent } from 'react';
import './Input.scss';

interface IInput {
  value: string;
  handleChange: (newValue: string) => void;
  title: string;
  placeholder?: string;
  isDisabled?: boolean;
  errorMessage?: string | string[];
  inputRef?: RefObject<HTMLInputElement>;
  handleKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'number';
}

export const Input: FC<IInput> = ({
  value,
  handleChange,
  placeholder,
  title,
  isDisabled = false,
  errorMessage,
  inputRef,
  handleKeyUp,
  type = 'text',
}) => {
  const generateErrorMessage = (message: string | string[]) => (typeof message === 'string' ? message : message.join(' '));

  return (
    <div className="input-wrapper">
      <label className="label" htmlFor={`input-${title}`}>
        {title}
      </label>
      <input
        className={`input ${errorMessage && 'error'}`}
        placeholder={placeholder}
        disabled={isDisabled}
        type={type}
        id={`input-${title}`}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        autoComplete="off"
      />
      {errorMessage && (
        <div className="errorMessage">{generateErrorMessage(errorMessage)}</div>
      )}
    </div>
  );
};
