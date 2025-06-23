import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronUp } from '../../../assets/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../../../assets/chevronDown.svg';
import { ReactComponent as Cross } from '../../../assets/cross.svg';

const OptionItem = React.memo(function OptionItem({
  option,
  idx,
  selected,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}) {
  return (
    <Option
      $selected={selected}
      $hovered={hovered}
      data-idx={idx}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {option}
    </Option>
  );
});

export function FilterSelect({ options, id, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        setHoveredIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectBoxClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange(id, '');
      setOpen(false);
    },
    [id, onChange]
  );

  const handleClearMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setHoveredIndex(Number(e.currentTarget.dataset.idx));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleOptionClick = useCallback(
    (e) => {
      const idx = Number(e.currentTarget.dataset.idx);
      onChange(id, options[idx]);
      setOpen(false);
      setHoveredIndex(null);
    },
    [id, options, onChange]
  );

  let icon = null;
  if (open) {
    icon = (
      <IconWrapper>
        <ChevronUp width={20} height={20} />
      </IconWrapper>
    );
  } else if (value) {
    icon = (
      <IconWrapper
        className="clear"
        onClick={handleClear}
        onMouseDown={handleClearMouseDown}
      >
        <Cross width={20} height={20} />
      </IconWrapper>
    );
  } else {
    icon = (
      <IconWrapper>
        <ChevronDown width={20} height={20} />
      </IconWrapper>
    );
  }

  return (
    <Wrapper ref={ref}>
      <SelectBox $active={open} tabIndex={0} onClick={handleSelectBoxClick}>
        {value || (
          <Placeholder>{id[0].toUpperCase() + id.slice(1)}</Placeholder>
        )}
        {icon}
      </SelectBox>
      {open && (
        <Dropdown>
          {options.map((option, idx) => (
            <OptionItem
              key={option}
              option={option}
              idx={idx}
              selected={value === option}
              hovered={hoveredIndex === idx}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleOptionClick}
            />
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  font-family: sans-serif;
  @media (max-width: 950px) {
    width: 150px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
`;

const SelectBox = styled.div`
  width: 100%;
  padding: 12px 16px;
  background: #263750;
  height: 100%;
  box-sizing: border-box;
  color: #fff;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  outline: none;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  ${({ $active }) =>
    $active &&
    `
      background: #334466;
    `}
  &:hover {
    background: #334466;
  }
`;

const Placeholder = styled.span`
  color: #b0b0b0;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 16px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &.clear:hover svg {
    color: #83bf46;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  background: #fff;
  color: #222;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  &:hover {
    background: #e0f7da;
  }
`;
