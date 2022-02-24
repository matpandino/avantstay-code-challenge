import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface FieldProps {
  label: string;
  outlined?: boolean;
  placeholder?: string;
  width?: string;
  onChangeValue?: (value: string) => void;
}

interface InputProps {
  outlined?: boolean;
  isFocused?: boolean;
  isFilled?: boolean;
  width?: string;
  colors: { default: string; hover: string; active: string; filled: string };
}

export const InputField: React.FC<
  FieldProps & React.HTMLAttributes<HTMLInputElement>
> = ({
  label,
  width,
  outlined = false,
  placeholder = "Select...",
  onChangeValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const largeInputColors = {
    default: "#E8EFF5",
    hover: "#D1EFF2",
    active: "#A3DFE6",
    filled: "#E8EFF5",
  };

  useEffect(() => {
    onChangeValue && onChangeValue(input);
  }, [input]);

  return (
    <>
      <FieldContainer
        outlined={outlined}
        isFilled={!!input}
        isFocused={isFocused}
        colors={largeInputColors}
        width={width}
        onClick={() => inputRef.current.focus()}
      >
        <label>{label}</label>
        <FieldInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          colors={largeInputColors}
          outlined={outlined}
          placeholder={placeholder}
          {...props}
        ></FieldInput>
      </FieldContainer>
    </>
  );
};

const FieldContainer = styled.div<InputProps>`
  all: unset;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 3px;
  box-sizing: border-box;
  height: 50px;
  width: ${({ width }) => (!!width ? width : "auto")};
  padding: ${({ isFocused, isFilled }) => {
    if (isFocused) return "7px 7px 7px 14px !important";
    if (isFilled) return "8px 8px 8px 15px";
    return "8px 8px 8px 15px";
  }};
  border: ${({ isFocused, isFilled, outlined, colors }) => {
    if (isFocused) return `2px solid ${colors.active} !important`;
    if (isFilled && outlined) return `1px solid ${colors.filled}`;
    if (outlined) return `1px solid ${colors.default}`;
    return "1px solid transparent";
  }};
  :hover {
    border: ${({ colors }) => `2px solid ${colors.hover}`};
    padding: 7px 7px 7px 14px;
  }
  :active {
    border: ${({ outlined, colors }) =>
      outlined ? `2px solid ${colors.active}` : "2px solid transparent"};
    padding: 7px 7px 7px 14px;
  }
  label {
    font-size: 11px;
    color: #53c3d0;
    width: 100%;
    margin-bottom: 2px;
  }
`;

const FieldInput = styled.input<InputProps>`
  all: unset;
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  line-height: 142%;
  color: #022b54;

  ::placeholder {
    color: #022b54;
    opacity: 0.3;
  }
`;
