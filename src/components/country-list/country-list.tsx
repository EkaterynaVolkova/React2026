import type { Country } from "../../types";
import { CountryCard } from "../country-card/country-card";
import {
  getPopulationForYear,
  createYearDataMap,
} from "../../utils/data-transformers";
import styles from "./country-list.module.css";
import { memo, useMemo } from "react";
import {
  List,
  useDynamicRowHeight,
  type RowComponentProps,
} from "react-window";

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

type RowDataProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const CountryRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<RowDataProps>) => {
  const country = countries[index];

  if (!country) {
    return null;
  }

  return (
    <div style={style}>
      <CountryCard
        key={country.id}
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const filteredCountries = useMemo(() => {
      return countries
        .filter((c) => {
          const matchesSearch = c.id
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesRegion =
            !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === "name") {
            return sortOrder === "asc"
              ? a.id.localeCompare(b.id)
              : b.id.localeCompare(a.id);
          } else {
            const popA =
              getPopulationForYear(createYearDataMap(a.data), selectedYear) ||
              0;
            const popB =
              getPopulationForYear(createYearDataMap(b.data), selectedYear) ||
              0;
            return sortOrder === "asc" ? popA - popB : popB - popA;
          }
        });
    }, [
      countries,
      searchQuery,
      selectedRegion,
      selectedYear,
      sortField,
      sortOrder,
    ]);

    const rowHeight = useDynamicRowHeight({
      defaultRowHeight: 300,
    });

    const countryRowProps = useMemo<RowDataProps>(
      () => ({
        countries: filteredCountries,
        selectedYear,
        selectedColumns,
      }),
      [filteredCountries, selectedYear, selectedColumns],
    );

    return (
      <div className={styles.countryList} style={{ height: "600px" }}>
        <List
          rowComponent={CountryRow}
          rowCount={filteredCountries.length}
          rowHeight={rowHeight}
          rowProps={countryRowProps}
        />
      </div>
    );
  },
);
