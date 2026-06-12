import { memo, useCallback, useMemo, useState } from "react";
import { useCo2Data } from "../../hooks/useCo2Data";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { SearchBar } from "../search-bar/search-bar";
import { YearSelector } from "../year-selector/year-selector";
import { CountryList } from "../country-list/country-list";
import { ColumnModal } from "../column-modal/column-modal";
import {
  getAvailableYears,
  getAvailableColumns,
} from "../../utils/data-transformers";

import styles from "./app.module.css";
import type { Country } from "../../types";

type AppState = {
  searchQuery: string;
  selectedRegion: string;
  selectedYear: number;
  sortField: "name" | "population";
  sortOrder: "asc" | "desc";
  selectedColumns: string[];
  isColumnModalOpen: boolean;
};

export const App = () => {
  const { data, isLoading, error } = useCo2Data();

  const [state, setState] = useState<AppState>({
    searchQuery: "",
    selectedRegion: "",
    selectedYear: 2020,
    sortField: "population",
    sortOrder: "desc",
    selectedColumns: ["year", "population", "co2", "co2_per_capita"],
    isColumnModalOpen: false,
  });

  const years = useMemo(() => {
    return data ? getAvailableYears(data) : [];
  }, [data]);

  const availableColumns = useMemo(() => getAvailableColumns(), []);

  const handleSearch = useCallback((value: string) => {
    setState((prevState) => ({ ...prevState, searchQuery: value }));
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setState((prevState) => ({ ...prevState, selectedYear: year }));
  }, []);

  const handleSortFieldChange = useCallback((field: "name" | "population") => {
    setState((prevState) => ({ ...prevState, sortField: field }));
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedColumns: prevState.selectedColumns.includes(column)
        ? prevState.selectedColumns.filter((c) => c !== column)
        : [...prevState.selectedColumns, column],
    }));
  }, []);

  const handleModalToggle = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isColumnModalOpen: !prevState.isColumnModalOpen,
    }));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={styles.noDataMessage}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CO₂ Emissions Data Explorer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <MemoizedSearchBar value={state.searchQuery} onChange={handleSearch} />
        <MemoizedYearSelector
          year={state.selectedYear}
          years={years}
          onChange={handleYearChange}
        />

        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            value={state.sortField}
            onChange={(e) =>
              handleSortFieldChange(e.target.value as "name" | "population")
            }
            className={styles.sortSelect}
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>

          <button onClick={handleSortOrderToggle} className={styles.sortButton}>
            {state.sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

        <div className={styles.columnButtonContainer}>
          <button onClick={handleModalToggle} className={styles.columnButton}>
            Select columns ({state.selectedColumns.length} selected)
          </button>
        </div>
      </div>

      {/* Country List */}
      <MemoizedCountryList
        countries={data}
        searchQuery={state.searchQuery}
        selectedColumns={state.selectedColumns}
        selectedRegion={state.selectedRegion}
        selectedYear={state.selectedYear}
        sortField={state.sortField}
        sortOrder={state.sortOrder}
        onYearChange={handleYearChange}
      />

      {/* Column Modal */}
      <MemoizedColumnModal
        isOpen={state.isColumnModalOpen}
        availableColumns={availableColumns}
        selectedColumns={state.selectedColumns}
        onToggle={handleColumnToggle}
        onClose={handleModalToggle}
      />
    </div>
  );
};

const MemoizedYearSelector = memo(
  ({
    year,
    years,
    onChange,
  }: {
    year: number;
    years: number[];
    onChange: (year: number) => void;
  }) => <YearSelector year={year} years={years} onChange={onChange} />,
);

const MemoizedSearchBar = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => <SearchBar value={value} onChange={onChange} />,
);

const MemoizedColumnModal = memo(
  ({
    isOpen,
    availableColumns,
    selectedColumns,
    onToggle,
    onClose,
  }: {
    isOpen: boolean;
    availableColumns: string[];
    selectedColumns: string[];
    onToggle: (value: string) => void;
    onClose: () => void;
  }) => (
    <ColumnModal
      isOpen={isOpen}
      availableColumns={availableColumns}
      selectedColumns={selectedColumns}
      onToggle={onToggle}
      onClose={onClose}
    />
  ),
);

const MemoizedCountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
    onYearChange,
  }: {
    countries: Country[];
    searchQuery: string;
    selectedColumns: string[];
    selectedRegion: string;
    selectedYear: number;
    sortField: "name" | "population";
    sortOrder: "asc" | "desc";
    onYearChange: (year: number) => void;
  }) => (
     <CountryList
        countries={countries}
        searchQuery={searchQuery}
        selectedColumns={selectedColumns}
        selectedRegion={selectedRegion}
        selectedYear={selectedYear}
        sortField={sortField}
        sortOrder={sortOrder}
        onYearChange={onYearChange}
      />
  ),
);
