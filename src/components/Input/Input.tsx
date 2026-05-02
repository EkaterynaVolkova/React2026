import { Component } from 'react';

interface SearchInputProps {
  className?: string;
  type?: string;
  placeholder?: string;
}

export class Input extends Component<SearchInputProps> {
  render() {
    const { className, type = 'text', placeholder = '' } = this.props;

    return (
      <input className={className} type={type} placeholder={placeholder} />
    );
  }
}
