import { ErrorBoundary } from '@components/ErrorBoundary';
import { Search } from './pages/Search';
import { Route, Routes } from 'react-router';
import { NotFound } from './pages/NotFound';
import { About } from './pages/About';
import { Layout } from '@components/Layout';
import { CharacterDetails } from '@components/CharacterDetails';
import { ThemeProvider } from './context/ThemeProvider';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Search />}>
                <Route path="" element={<CharacterDetails />} />
              </Route>

              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};

export default App;
