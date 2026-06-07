import { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Modal } from './components/Modal/Modal';
import { REACT_HOOK_FORM, UNCONTROLLED_FORM } from './constants/global';
import { UncontrolledForm } from './components/UncontrolledForm';
import { ReactHookForm } from './components/ReactHookForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formToOpen, setFormToOpen] = useState('uncontrolled');
  const handleOpenForm = (
    type: typeof UNCONTROLLED_FORM | typeof REACT_HOOK_FORM
  ) => {
    setFormToOpen(type);
    setIsOpen(true);
  };
  const handleModalClose = () => setIsOpen(false);

  return (
    <>
      <Header onOpenForm={handleOpenForm} />
      <Main />
      <Modal isOpen={isOpen} handleClose={handleModalClose}>
        {formToOpen === UNCONTROLLED_FORM && (
          <UncontrolledForm onSubmit={() => handleModalClose()} />
        )}

        {formToOpen === REACT_HOOK_FORM && (
          <ReactHookForm onSubmit={() => handleModalClose()} />
        )}
      </Modal>
    </>
  );
}

export default App;
