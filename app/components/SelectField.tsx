import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { SelectCustomField } from "./SelectCustomField";

interface SelectFieldProps {
  label: string;
  defaultValue?: string;
  width?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  width,
  placeholder,
  onChange,
  options,
  defaultValue,
}) => {
  const [selectedField, setSelectedField] = useState(
    (defaultValue && options.find(({ value }) => value === defaultValue)) || {
      value: "",
      label: "",
    }
  );
  const divRef = useRef<any | null>(null);

  useEffect(() => {
    onChange && onChange(selectedField.value);
  }, [selectedField.value]);

  return (
    <SelectCustomField
      value={`${selectedField.label}`}
      label={label}
      width={width}
      placeholder={placeholder}
      modalWidth="100%"
      selectRef={divRef}
    >
      <Container>
        {options?.map(({ label, value: opValue }) => (
          <Option
            key={opValue}
            onClick={() => {
              divRef?.current?.blur();
              setSelectedField({ label, value: opValue });
            }}
          >
            {label}
          </Option>
        ))}
      </Container>
    </SelectCustomField>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 250px;
  color: #022b54;
`;

const Option = styled.div`
  display: flex;
  flex: 1;
  padding: 8px;
  font-size: 13px;
  :hover {
    background-color: #ecfafa;
  }
`;

export default SelectField;
