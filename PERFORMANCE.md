# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A
- **Render duration**: 324.1 ms
- **Screenshot**: ![screenshot](src/screenshots/baseline/sort.png)

### Interaction B: Search countries

- **Commit duration**: N/A
- **Render duration**: 153.3 ms
- **Screenshot**: ![screenshot](src/screenshots/baseline/search.png)

### Interaction C: Change year

- **Commit duration**: N/A
- **Render duration**: 301.8 ms
- **Screenshot**: ![screenshot](src/screenshots/baseline/change_year.png)

### Interaction D: Toggle column

- **Commit duration**: N/A
- **Render duration**: 338.5 ms
- **Screenshot**: ![screenshot](src/screenshots/baseline/toggle_column.png)


## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A
- **Render duration**: 50.7 ms
- **Screenshot**: ![screenshot](src/screenshots/optimized/sort.png)

### Interaction B: Search countries

- **Commit duration**: N/A
- **Render duration**: 28 ms
- **Screenshot**: ![screenshot](src/screenshots/optimized/search.png)

### Interaction C: Change year

- **Commit duration**: N/A
- **Render duration**: 55.1 ms
- **Screenshot**: ![screenshot](src/screenshots/optimized/change_year.png)

### Interaction D: Toggle column

- **Commit duration**: N/A
- **Render duration**: 18.3 ms
- **Screenshot**: ![screenshot](src/screenshots/optimized/toggle_column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 324.1        | 50.7            | 84.36%     |
| Search countries | 153.3        | 16.5            | 89.24%     |
| Change year      | 301.8        | 55.1            | 81.74%     |
| Toggle column    | 338.5        | 18.3            | 94.59%     |
| **Average**      | **279.4**    | **35.2**        | **87.40%** |