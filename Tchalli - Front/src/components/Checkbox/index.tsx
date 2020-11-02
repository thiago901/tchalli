import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
// import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: string;
}

const Checkbox: React.FC<InputProps> = ({
  name,
  label,
  defaultChecked,
  ...rest
}) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    if (!inputRef.current.defaultChecked) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    }
  }, [defaultChecked]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <Container>
      <label htmlFor={name}>
        <input
          id={name}
          type="checkbox"
          ref={inputRef}
          defaultChecked={defaultChecked}
          {...rest}
        />
        <span>{label}</span>
      </label>
    </Container>
  );
};

export default Checkbox;
