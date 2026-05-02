import { Button } from '@components/Button';
import { ResultsGrid } from '@components/ResultsGrid';
import { TopControls } from '@components/TopControls';
import { Component } from 'react';

export class SearchContainer extends Component {
  onSearchInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Searching!');
  };

  onError = () => {
    console.log('Error!');
  };

  render() {
    const mockResults = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
          'https://rickandmortyapi.com/api/episode/3',
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
      {
        id: 48,
        name: 'Black Rick',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'unknown', url: '' },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/48.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/22',
          'https://rickandmortyapi.com/api/episode/28',
        ],
        url: 'https://rickandmortyapi.com/api/character/48',
        created: '2017-11-05T11:15:26.044Z',
      },
      {
        id: 72,
        name: 'Cool Rick',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (K-83)',
          url: 'https://rickandmortyapi.com/api/location/26',
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/72.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/28'],
        url: 'https://rickandmortyapi.com/api/character/72',
        created: '2017-11-30T11:41:11.542Z',
      },
    ];

    return (
      <div className="container">
        <h1>Rick and Morty</h1>
        {/* Top controls */}
        <TopControls onSearchInput={this.onSearchInput} />

        {/* Results */}
        <ResultsGrid searchResults={mockResults} />

        {/* Error Button */}
        <Button className="error-button" onClick={this.onError}>
          !
        </Button>
      </div>
    );
  }
}
