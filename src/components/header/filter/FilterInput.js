import { useCallback } from 'react';
import styled from 'styled-components';
import { FilterSelect } from './FilterSelect';

export function FilterInput({
  id,
  type,
  value,
  onChange,
  onClick,
  options = [],
  color = '#83BF46',
  text = 'Button'
}) {
  const handleInputChange = useCallback(
    (e) => {
      onChange(id, e.target.value);
    },
    [id, onChange]
  );
  const handleClick = useCallback(() => {
    if (onClick) onClick(id);
  }, [id, onClick]);

  if (type === 'select') {
    return (
      <FilterSelect
        options={options}
        id={id}
        value={value}
        onChange={onChange}
      />
    );
  } else if (type === 'text') {
    return (
      <Input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={id.charAt(0).toUpperCase() + id.slice(1)}
      />
    );
  } else if (type === 'button') {
    return (
      <Button onClick={handleClick} color={color}>
        {text}
      </Button>
    );
  }
}

const Input = styled.input`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
  font-size: 16px;
  height: 40px;
  background-color: #263750;
  color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #83bf46;
  &::placeholder {
    color: #b3b3b3;
  }
  &:focus {
    background-color: #334466;
    outline: none;
  }
  :not(:placeholder-shown) {
    background-color: #263750;
  }
  @media (max-width: 950px) {
    width: 150px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
`;
const Button = styled.button`
  width: 85px;
  height: 40px;
  background-color: transparent;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background-color: ${({ color }) => color};
    color: #fff;
  }
  @media (max-width: 950px) {
    width: 70px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
`;
