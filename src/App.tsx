import { ErrorBoundary } from '@components/ErrorBoundary';
import { SearchContainer } from '@components/SearchContainer';
import { Route, Routes } from 'react-router';
import { NotFound } from './pages/NotFound';
import { About } from './pages/About';
import { Layout } from '@components/Layout';
import { CharacterDetails } from '@components/CharacterDetails';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<SearchContainer />}>
              <Route path="" element={<CharacterDetails />} />
            </Route>

            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
