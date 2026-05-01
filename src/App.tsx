import { Component } from 'react';

class App extends Component {
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
        <div className="top-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search ..."
          />
          <button className="search-button">Search</button>
        </div>

        {/* Results */}
        <div className="results-grid">
          {mockResults.map((item) => {
            const statusClass =
              item.status === 'Alive'
                ? 'status-alive'
                : item.status === 'Dead'
                  ? 'status-dead'
                  : 'status-unknown';
            return (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.name} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-desc">
                    {item.species} —{' '}
                    <span className={statusClass}>{item.status}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Button */}
        <button className="error-button">!</button>
      </div>
    );
  }
}

export default App;
