import { ErrorBoundary } from '@components/ErrorBoundary';
import { SearchContainer } from '@components/SearchContainer';

const App = () => {
  return (
    <ErrorBoundary>
      <SearchContainer />
    </ErrorBoundary>
  );
};

export default App;
