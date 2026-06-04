import { REACT_HOOK_FORM, UNCONTROLLED_FORM } from '../../constants/global';
import { Button } from '../Button';
import './Header.css';

interface HeaderProps {
  onOpenForm: (
    formType: typeof UNCONTROLLED_FORM | typeof REACT_HOOK_FORM
  ) => void;
}

export const Header = ({ onOpenForm }: HeaderProps) => {
  return (
    <header>
      <h1>React Forms</h1>
      <div className="controls">
        <Button
          className="primary-btn"
          onClick={() => onOpenForm(UNCONTROLLED_FORM)}
        >
          Uncontrolled Form
        </Button>
        <Button
          className="primary-btn"
          onClick={() => onOpenForm(REACT_HOOK_FORM)}
        >
          React Hook Form
        </Button>
      </div>
    </header>
  );
};
