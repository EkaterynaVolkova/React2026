import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Component } from 'react';
import './TopControls.css';

interface TopControlsProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export class TopControls extends Component<TopControlsProps> {
  handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search-input') as string;
    this.props.onSearch(query.trim());
  };

  render() {
    return (
      <form className="top-controls" onSubmit={this.handleSubmit}>
        <Input
          className="search-input"
          name="search-input"
          type="text"
          placeholder="Search ..."
          value={this.props.initialValue}
        />
        <Button className="primary-button">Search</Button>
      </form>
    );
  }
}
