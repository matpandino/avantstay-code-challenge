import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SelectCustomField } from "./SelectCustomField";

interface SelectCounterFieldProps {
  label: string;
  width?: string;
  placeholder?: string;
  counterText?: string;
  initialCount?: number;
  onChange?: (value: number) => void;
}

const SelectCounterField: React.FC<SelectCounterFieldProps> = ({
  initialCount = 0,
  label,
  width,
  placeholder,
  counterText,
  onChange,
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    onChange && onChange(count);
  }, [count]);

  const handleMinus = () => {
    if (count > 1) setCount(count - 1);
  };
  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (Number.isInteger(inputValue) && inputValue > 1) {
      setCount(inputValue);
    }
  };

  return (
    <SelectCustomField
      value={!!count ? `${count} guests` : ""}
      label={label}
      width={width}
      modalWidth="100%"
      placeholder={placeholder}
    >
      <CounterContainer>
        <span>{counterText}</span>
        <div>
          <CounterButton onClick={handleMinus}>-</CounterButton>
          <CounterInput value={count} onChange={(e) => handleInputChange(e)} />
          <CounterButton onClick={handlePlus}>+</CounterButton>
        </div>
      </CounterContainer>
    </SelectCustomField>
  );
};

const CounterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  span {
    font-size: 15px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const CounterInput = styled.input`
  text-align: center;
  height: 30px;
  width: 40px;
  border: 1px solid #e8eff5;
`;

const CounterButton = styled.button`
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
  border: 1px solid #e8eff5;
`;

export default SelectCounterField;
