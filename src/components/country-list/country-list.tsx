import type { Country } from "../../types";
import { CountryCard } from "../country-card/country-card";
import {
  getPopulationForYear,
  createYearDataMap,
} from "../../utils/data-transformers";
import { List, useDynamicRowHeight, type RowComponentProps } from "react-window"; 

import styles from "./country-list.module.css";
import { memo, useMemo} from "react";

type RowDataProps = {
  filteredCountries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

type CountryRowProps = RowComponentProps & RowDataProps;

const CountryRow = ({
  index,
  style,
  filteredCountries,
  selectedYear,
  selectedColumns,
}: CountryRowProps) => {
  const country = filteredCountries[index];

  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: "name" | "population";
  sortOrder: "asc" | "desc";
  onYearChange: (year: number) => void;
};

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {

 const filteredCountries = useMemo(() => {
  const filtered = countries.filter((c) => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
    return matchesSearch && matchesRegion;
  });

  if (sortField === "name") {
    return [...filtered].sort((a, b) => 
      sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );
  }

  const populationCache: Record<string, number> = {};
  
  filtered.forEach((c) => {
    populationCache[c.id] = getPopulationForYear(createYearDataMap(c.data), selectedYear) || 0;
  });

  return [...filtered].sort((a, b) => {
    const popA = populationCache[a.id];
    const popB = populationCache[b.id];
    return sortOrder === "asc" ? popA - popB : popB - popA;
  });

}, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const countryRowHeight = useDynamicRowHeight({
    defaultRowHeight: 300
  });

  const countryRowProps = useMemo<RowDataProps>(() => ({
    filteredCountries,
    selectedYear,
    selectedColumns
  }), [filteredCountries, selectedYear, selectedColumns]);

  return (
    <div className={styles.countryList}>
       <List
        rowComponent={CountryRow}
        rowCount={filteredCountries.length}
        rowHeight={countryRowHeight}
        rowProps={countryRowProps}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});
