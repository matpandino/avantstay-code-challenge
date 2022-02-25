import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SelectCustomField } from "./SelectCustomField";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format, parse } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface SelectFieldProps {
  label: string;
  width?: string;
  placeholder?: string;
  checkIn?: string;
  checkOut?: string;
  onChange?: (value: { startDate: string; endDate: string }) => void;
}

const SelectDateRangeField: React.FC<SelectFieldProps> = ({
  label,
  width,
  placeholder,
  onChange,
  checkIn: givenCheckIn,
  checkOut: givenCheckOut,
}) => {
  const [alreadySearched, setAlreadySearched] = useState(false);
  const [parsedValue, setParsedValue] = useState("");
  const [state, setState] = useState({
    startDate: givenCheckIn
      ? parse(givenCheckIn, "yyyy-MM-dd", new Date())
      : new Date(),
    endDate: givenCheckOut
      ? parse(givenCheckOut, "yyyy-MM-dd", new Date())
      : new Date(),
    key: "selection",
  });

  const formatedValue = (startDate: Date, endDate: Date) =>
    `${format(startDate, "LLL dd, yyyy")} - ${format(endDate, "LLL dd, yyyy")}`;

  useEffect(() => {
    if (givenCheckIn && givenCheckOut) {
      const givenCheckInDate = parse(givenCheckIn, "yyyy-MM-dd", new Date());
      const givenCheckOutDate = parse(givenCheckOut, "yyyy-MM-dd", new Date());
      setState({
        ...state,
        startDate: givenCheckInDate,
        endDate: givenCheckOutDate,
      });
      setAlreadySearched(true);

      formatedValue(givenCheckInDate, givenCheckOutDate);
    }
  }, [givenCheckIn, givenCheckOut]);

  useEffect(() => {
    onChange &&
      onChange({
        endDate: format(state.endDate, "yyyy-MM-dd"),
        startDate: format(state.startDate, "yyyy-MM-dd"),
      });

    if (!!state.startDate && !!state.endDate && alreadySearched) {
      const dateStringValues = formatedValue(state.startDate, state.endDate);
      setParsedValue(dateStringValues);
    }
  }, [state.startDate, state.endDate]);

  return (
    <SelectCustomField
      value={parsedValue}
      label={label}
      width={width}
      placeholder={placeholder}
    >
      <Container>
        <DateRange
          rangeColors={["#53C3D0"]}
          showMonthAndYearPickers={false}
          minDate={new Date()}
          onChange={(item) => {
            const { startDate, endDate, key } = item.selection;
            if (startDate && endDate && key) {
              setState({ ...state, startDate, endDate, key });
            }
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
