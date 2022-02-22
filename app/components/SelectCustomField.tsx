import { RefObject, useRef, useState } from "react";
import styled from "styled-components";

interface FieldProps {
  label: string;
  value?: string;
  outlined?: boolean;
  placeholder?: string;
  width?: string;
  modalWidth?: string;
  selectRef?: RefObject<HTMLDivElement>;
}

interface InputProps {
  outlined?: boolean;
  isFocused?: boolean;
  isFilled?: boolean;
  width?: string;
  modalWidth?: string;
  colors: { default: string; hover: string; active: string; filled: string };
}

export const SelectCustomField: React.FC<
  FieldProps & React.HTMLAttributes<HTMLInputElement>
> = ({
  label,
  width,
  modalWidth,
  outlined = false,
  value,
  placeholder = "Select...",
  children,
  selectRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontClose, setDontClose] = useState(false);

  const divRef = !!selectRef ? selectRef : useRef<HTMLDivElement | null>(null);

  const colors = {
    default: "#E8EFF5",
    hover: "#D1EFF2",
    active: "#A3DFE6",
    filled: "#E8EFF5",
  };

  return (
    <>
      <FieldContainer
        outlined={outlined}
        isFilled={!!value}
        tabIndex={1}
        colors={colors}
        width={width}
        ref={divRef}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <label>{label}</label>
        <span>{!!value ? value : placeholder}</span>
        {(isOpen || dontClose) && (
          <Modal
            modalWidth={modalWidth}
            onMouseEnter={() => !selectRef && setDontClose(true)}
            onMouseLeave={() => !selectRef && setDontClose(false)}
          >
            {children}
          </Modal>
        )}
      </FieldContainer>
    </>
  );
};

const Modal = styled.div<{ modalWidth?: string }>`
  display: flex;
  position: absolute;
  overflow: auto;
  margin-top: 10px;
  background-color: #ffffff;
  margin-right: 4px;
  width: ${({ modalWidth }) => (!!modalWidth ? modalWidth : "auto")};
  top: 44px;
  border: 1px solid #e8eff5;
  border-radius: 2px;
  cursor: default;
`;

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
    if (isFilled) return "7px 7px 7px 14px";
    return "7px 7px 7px 14px";
  }};
  border: ${({ isFocused, isFilled, outlined, colors }) => {
    if (isFocused) return `1px solid ${colors.active} !important`;
    if (isFilled && outlined) return `1px solid ${colors.filled}`;
    if (outlined) return `1px solid ${colors.default}`;
    return "1px solid transparent";
  }};
  :hover {
    border: ${({ colors }) => `1px solid ${colors.hover}`};
    padding: 7px 7px 7px 14px;
  }
  :active {
    border: ${({ outlined, colors }) =>
      outlined ? `1px solid ${colors.active}` : "1x solid transparent"};
    padding: 7px 7px 7px 14px;
  }
  label {
    font-size: 11px;
    color: #53c3d0;
    width: 100%;
    margin-bottom: 2px;
  }

  > span {
    width: 100%;
    font-weight: 400;
    font-size: 13px;
    line-height: 142%;
    color: #022b54;
    opacity: ${({ isFilled }) => (isFilled ? 1 : 0.3)};
    cursor: default;
  }
`;
