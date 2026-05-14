interface SearchInputProps {
  className?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
}

export const Input = (props: SearchInputProps) => {
  const {
    className,
    type = 'text',
    name = '',
    placeholder = '',
    value = '',
  } = props;
  return (
    <input
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
    />
  );
};
