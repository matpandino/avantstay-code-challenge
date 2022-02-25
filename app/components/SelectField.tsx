import React, {
  useState,
  useRef,
  useEffect,
  RefObject,
  useCallback,
} from "react";
import styled from "styled-components";
import { SelectCustomField } from "./SelectCustomField";
type RegionsField = { id: string | null; name: string | null };
type Field = {
  value: string | RegionsField;
  label: string;
};

interface SelectFieldProps {
  defaultValue?: Field;
  options: Field[];
  placeholder?: string;
  width?: string;
  label: string;
  onChange?: (value: Field) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  width,
  placeholder,
  onChange,
  options,
  defaultValue,
}) => {
  const [selectedField, setSelectedField] = useState<Field | null>(
    !!defaultValue ? defaultValue : null
  );
  const divRef = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    if (!!selectedField?.value) {
      onChange && onChange(selectedField.value);
    }
  }, [selectedField]);

  useEffect(() => {
    if (!!defaultValue && defaultValue !== selectedField) {
      setSelectedField(defaultValue);
    }
  }, [defaultValue]);

  return (
    <SelectCustomField
      value={`${selectedField?.label || ""}`}
      label={label}
      width={width}
      placeholder={placeholder}
      modalWidth="100%"
      selectRef={divRef}
    >
      <Container>
        {options?.map((option, index) => (
          <Option
            key={index}
            onClick={() => {
              divRef?.current?.blur();
              setSelectedField(option);
            }}
          >
            {option.label}
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
