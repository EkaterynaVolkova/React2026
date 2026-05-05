import { Component } from 'react';

interface SearchInputProps {
  className?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
}

export class Input extends Component<SearchInputProps> {
  render() {
    const {
      className,
      type = 'text',
      name = '',
      placeholder = '',
      value = '',
    } = this.props;

    return (
      <input
        name={name}
        className={className}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      />
    );
  }
}
