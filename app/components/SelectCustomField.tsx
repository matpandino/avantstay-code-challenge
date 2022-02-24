import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import styled from "styled-components";
import chevronDown from "../assets/chevron_down.svg";
import chevronUp from "../assets/chevron_up.svg";

interface FieldProps {
  label: string;
  value?: string;
  outlined?: boolean;
  placeholder?: string;
  width?: string;
  modalWidth?: string;
  selectRef?: RefObject<HTMLDivElement>;
}

interface ContainerProps {
  outlined?: boolean;
  isOpen?: boolean;
  isFilled?: boolean;
  width?: string;
  modalWidth?: string;
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

  const containerRef = !!selectRef
    ? selectRef
    : useRef<HTMLDivElement | null>(null);
  const closeAll = () => {
    setIsOpen(false);
    setDontClose(false);
  };
  return (
    <>
      <FieldContainer
        outlined={outlined}
        isFilled={!!value}
        tabIndex={1}
        width={width}
        isOpen={isOpen || dontClose}
        ref={containerRef}
        onBlur={() => !dontClose && closeAll()}
      >
        <SelectTextContainer
          onClick={() => {
            !isOpen ? setIsOpen(true) : closeAll();
          }}
        >
          <div>
            <label>{label}</label>
            <TextValue isFilled={!!value}>
              {!!value ? value : placeholder}
            </TextValue>
          </div>
          <ArrowWrapper>
            {isOpen ? (
              <Image src={chevronUp} width={16} height={16} />
            ) : (
              <Image src={chevronDown} width={16} height={16} />
            )}
          </ArrowWrapper>
        </SelectTextContainer>
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

const ArrowWrapper = styled.div`
  margin-top: 20px;
`;

const TextValue = styled.span<{ isFilled: boolean }>`
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  line-height: 142%;
  color: #022b54;
  opacity: ${({ isFilled }) => (isFilled ? 1 : 0.3)};
  cursor: default;
`;
const SelectTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
  /* margin-bottom: 5px; */

  div:first-child {
    display: flex;
    flex-direction: column;
    label {
      font-size: 11px;
      color: #53c3d0;
      width: 100%;
      margin-bottom: 2px;
    }
  }
`;

const Modal = styled.div<{ modalWidth?: string }>`
  transition: all 3s ease-in-out;
  display: flex;
  position: absolute;
  margin-top: 10px;
  background-color: #ffffff;
  margin-right: 4px;
  width: ${({ modalWidth }) => (!!modalWidth ? modalWidth : "auto")};
  top: 44px;
  border: 2px solid #a3dfe6;
  border-radius: 2px;
  cursor: default;
`;

const FieldContainer = styled.div<ContainerProps>`
  all: unset;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 3px;
  box-sizing: border-box;
  min-height: 50px;
  width: ${({ width }) => (!!width ? width : "auto")};
  padding: 7px 7px 7px 14px;
  border: 2px solid ${({ isOpen }) => (isOpen ? "#a3dfe6" : "transparent")};
  :hover {
    border: 2px solid ${({ isOpen }) => (isOpen ? "#a3dfe6" : "#d1eff2")};
  }
  :active {
    border: 2px solid #a3dfe6;
  }
`;
