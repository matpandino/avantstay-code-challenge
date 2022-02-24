import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SelectCustomField } from "./SelectCustomField";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface SelectFieldProps {
  label: string;
  width?: string;
  placeholder?: string;
  onChange?: (value: {
    startDate: string;
    endDate: string;
    key: string;
  }) => void;
}

const SelectDateRangeField: React.FC<SelectFieldProps> = ({
  label,
  width,
  placeholder,
  onChange,
}) => {
  const [alreadySearched, setAlreadySearched] = useState(false);
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    onChange &&
      onChange({
        endDate: format(state.endDate, "yyyy-MM-dd"),
        startDate: format(state.startDate, "yyyy-MM-dd"),
        key: state.key,
      });
  }, [state.startDate, state.endDate]);

  const formatedValue = alreadySearched
    ? `${format(state.startDate, "LLL dd, yyyy")} - ${format(
        state.endDate,
        "LLL dd, yyyy"
      )}`
    : "";

  return (
    <SelectCustomField
      value={formatedValue}
      label={label}
      width={width}
      placeholder={placeholder}
    >
      <Container>
        <DateRange
          rangeColors={["#53C3D0"]}
          showMonthAndYearPickers={false}
          minDate={new Date()}
          onChange={(item: any) => {
            setState(item.selection);
            setAlreadySearched(true);
          }}
          moveRangeOnFirstSelection={false}
          ranges={[state]}
        />
      </Container>
    </SelectCustomField>
  );
};

const Container = styled.div`
  .rdrDateDisplayWrapper {
    display: none;
  }
`;

export default SelectDateRangeField;
