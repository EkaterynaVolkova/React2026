import { Button } from '@components/Button';
import { Input } from '@components/Input';
import './TopControls.css';

interface TopControlsProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const TopControls = (props: TopControlsProps) => {
  const { initialValue, onSearch } = props;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search-input') as string;
    onSearch(query.trim());
  };

  return (
    <form className="top-controls" onSubmit={handleSubmit}>
      <Input
        className="search-input"
        name="search-input"
        type="text"
        placeholder="Search ..."
        value={initialValue}
      />
      <Button className="primary-button">Search</Button>
    </form>
  );
};
