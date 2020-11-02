import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

type IOptions = Array<{
  id: string;
  label: string;
  value: string;
  default?: boolean;
}>;

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  options: IOptions;
}

const Input: React.FC<SelectProps> = ({
  icon: Icon,
  name,
  hidden,
  options,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [selected, setSelected] = useState('');
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLSelectElement>(null);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleDefaultValueSelected = useCallback(() => {
    const seletion = options.find(o => o.default);
    if (!seletion) return;

    if (inputRef.current) {
      inputRef.current.value = seletion.value;
    }
    setSelected(seletion.value);
  }, [options]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
    handleDefaultValueSelected();
  }, [fieldName, handleDefaultValueSelected, registerField]);
  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      isVisibility={hidden}
    >
      {Icon && <Icon size={20} />}
      <select
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={!!selected}
      >
        {options.map(opt => (
          <option key={opt.id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
