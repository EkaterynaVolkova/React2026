import { ErrorBoundary } from '@components/ErrorBoundary';
import { SearchContainer } from '@components/SearchContainer';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchContainer />
      </ErrorBoundary>
    );
  }
}

export default App;
