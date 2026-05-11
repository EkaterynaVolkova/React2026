import { dataService } from '@api/data.service';
import { Button } from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import type { Character } from '@interfaces/shared/types';
import { Component } from 'react';

interface SearchState {
  searchQuery: string;
  tasks: Character[];
  isLoading: boolean;
  shouldCrash: boolean;
  errorMessage: string;
}

export const SEARCH_QUERY_KEY = 'search_query';

export class SearchContainer extends Component<object, SearchState> {
  timerId: number | null = null;

  state = {
    searchQuery: localStorage.getItem(SEARCH_QUERY_KEY) ?? '',
    tasks: [],
    isLoading: false,
    shouldCrash: false,
    errorMessage: '',
  };

  loadData = async (query: string = '') => {
    this.setState({ isLoading: true });
    this.timerId = setTimeout(async () => {
      try {
        const tasks = await dataService.getCharacters(query);
        this.setState({ tasks, isLoading: false });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Something went wrong';

        this.setState({
          tasks: [],
          errorMessage: message,
          isLoading: false,
        });
      }
    }, 500);
  };

  componentDidMount() {
    this.loadData(this.state.searchQuery);
  }

  componentWillUnmount() {
    if (this.timerId) clearTimeout(this.timerId);
  }

  onSearch = async (query: string) => {
    const newQuery = query.trim();
    const existingQuery = this.state.searchQuery;
    if (newQuery !== existingQuery) {
      localStorage.setItem(SEARCH_QUERY_KEY, newQuery ?? '');
      this.setState({ searchQuery: newQuery });
      this.loadData(newQuery);
    }
  };

  onError = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('I crashed!');
    }

    return (
      <div className="container">
        <h1>Rick and Morty</h1>

        {/* Top controls */}
        <TopControls
          onSearch={this.onSearch}
          initialValue={this.state.searchQuery}
        />

        {/*Error message */}
        {this.state.errorMessage && (
          <ErrorMessage className="error-message">
            {this.state.errorMessage}
          </ErrorMessage>
        )}

        {/* Results Grid */}
        {this.state.isLoading ? (
          <div id="spinner" className="spinner"></div>
        ) : (
          <ResultsGrid searchResults={this.state.tasks} />
        )}

        {/* Error Button */}
        <Button className="error-button" onClick={this.onError}>
          !
        </Button>
      </div>
    );
  }
}
