import * as React from "react";

import FilterItem from "./../../molecules/FilterItem";

type Props = {
  children: React.ReactNode,
  filterOptions: { key: string, name: string, options: { key: string, name: string }[] }[],
  filters: any,
  enables: any,
  handleFilter: any,
  className?: string,
}

const FilterPart = (props: Props) => {
  const { children, handleFilter, filterOptions, filters, enables } = props;
  return (
    <>
      {children}
      {filterOptions.map((filterOption, index) => {
        return <FilterItem filterOption={filterOption} filters={filters} enables={enables} key={index} handleFilter={handleFilter}> </FilterItem>
      })}
    </>
  )
}

export default FilterPart;
