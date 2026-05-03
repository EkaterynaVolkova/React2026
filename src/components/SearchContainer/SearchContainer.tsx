import { dataService } from '@api/data.service';
import { Button } from '@components/Button';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import type { Character } from '@interfaces/shared/types';
import { Component } from 'react';

interface SearchState {
  searchQuery: string;
  tasks: Character[];
}

const SEARCH_QUERY_KEY = 'search_query';

export class SearchContainer extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem(SEARCH_QUERY_KEY) ?? '',
      tasks: [],
    };
  }

  loadData = async (query: string = '') => {
    const tasks = await dataService.getCharacters(query);
    this.setState({ tasks });
  };

  componentDidMount() {
    this.loadData(this.state.searchQuery);
  }

  onSearch = async (query: string) => {
    const newQuery = query.trim();
    const existingQuery = localStorage.getItem(SEARCH_QUERY_KEY);
    if (newQuery !== existingQuery) {
      console.log(`searching ${query.trim()}...`);
      localStorage.setItem(SEARCH_QUERY_KEY, query.trim() ?? '');
      this.setState({ searchQuery: query.trim() });
      this.loadData(query.trim());
    }
  };

  onError = () => {
    console.log('Error!');
  };

  render() {
    return (
      <div className="container">
        <h1>Rick and Morty</h1>
        {/* Top controls */}
        <TopControls
          onSearch={this.onSearch}
          initialValue={this.state.searchQuery}
        />

        {/* Results */}
        <ResultsGrid searchResults={this.state.tasks} />

        {/* Error Button */}
        <Button className="error-button" onClick={this.onError}>
          !
        </Button>
      </div>
    );
  }
}
