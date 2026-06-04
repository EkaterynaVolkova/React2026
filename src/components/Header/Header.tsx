import { Button } from '../Button';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <h1>React Forms</h1>
      <div className="controls">
        <Button className="primary-btn">Uncontrolled Form</Button>
        <Button className="primary-btn">React Hook Form</Button>
      </div>
    </header>
  );
};
