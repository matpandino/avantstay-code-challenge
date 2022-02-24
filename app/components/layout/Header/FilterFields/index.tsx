import { useMemo } from "react";
import useHomes from "../../../../contexts/HomesContext/useHomes";
import { InputField } from "../../../InputField";
import SelectCounterField from "../../../SelectCounterField";
import SelectDateRangeField from "../../../SelectDateRangeField";
import SelectField from "../../../SelectField";
import {
  Divider,
  Filters,
  FiltersHome,
  Stack,
  FiltersHomeBorder,
} from "./styles";

const FiltersFields = () => {
  const { regionsData, filters, setFilters } = useHomes();

  const regionsOptions = useMemo(() => {
    const parsedRegions = regionsData?.regions.map((region: any) => ({
      label: `${region.name}, ${region.stateCode}`,
      value: { id: region.id, name: region.name },
    }));
    if (!!parsedRegions)
      return [
        { label: "All regions", value: { id: null, name: "all" } },
        ...parsedRegions,
      ];
    return [{ label: "All regions", value: { id: null, name: "all" } }];
  }, [regionsData]);

  const orderOptions = [
    { value: "RELEVANCE", label: "Relevance" },
    { value: "PRICE_ASC", label: "Price: lowest first" },
    { value: "PRICE_DESC", label: "Price: highest first" },
  ];

  return (
    <Filters>
      <FiltersHome>
        <FiltersHomeBorder />
        <Stack>
          <SelectField
            options={regionsOptions}
            label="Where"
            width="33%"
            placeholder="Select..."
            onChange={(value) => {
              setFilters({
                ...filters,
                region: value.id,
                regionName: value.name,
              });
            }}
          />
          <Divider />
          <SelectDateRangeField
            label="When"
            width="33%"
            placeholder="Select..."
            onChange={(value) => {
              setFilters({
                ...filters,
                checkIn: value.startDate,
                checkOut: value.endDate,
              });
            }}
          />
          <Divider />
          <SelectCounterField
            label="Who"
            width="22%"
            counterText="Guests"
            placeholder="Select..."
            onChange={(value) => {
              setFilters({ ...filters, guests: value });
            }}
          />
          <Divider />
          <SelectField
            defaultValue={"RELEVANCE"}
            options={orderOptions}
            label="Order"
            width="22%"
            placeholder="Select..."
            onChange={(value) => {
              setFilters({ ...filters, order: value });
            }}
          />
        </Stack>
      </FiltersHome>
      <InputField
        label="Coupon"
        width="14%"
        placeholder="Got a code?"
        onChangeValue={(value) => {
          setFilters({ ...filters, coupon: value });
        }}
        outlined
      />
    </Filters>
  );
};

export default FiltersFields;
