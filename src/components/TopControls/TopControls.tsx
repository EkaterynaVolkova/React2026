import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Component } from 'react';

interface TopControlsProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export class TopControls extends Component<TopControlsProps> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector(
      'input'
    ) as HTMLInputElement;
    this.props.onSearch(input.value);
  };

  render() {
    return (
      <form className="top-controls" onSubmit={this.handleSubmit}>
        <Input
          className="search-input"
          type="text"
          placeholder="Search ..."
          value={this.props.initialValue}
        />
        <Button className="primary-button">Search</Button>
      </form>
    );
  }
}
