import styled from 'styled-components';
import { FilterInput } from './FilterInput';
import { useData } from '../../providers';
import { useState, useCallback } from 'react';

const FILTER_OPTIONS = [
  { id: 'status', type: 'select', options: ['Alive', 'Dead', 'Unknown'] },
  { id: 'gender', type: 'select', options: ['Female', 'Male', 'Genderless'] },
  {
    id: 'species',
    type: 'select',
    options: [
      'Human',
      'Alien',
      'Humanoid',
      'Animal',
      'Robot',
      'Mythological Creature',
      'unknown',
      'Poopybutthole',
      'Cronenberg',
      'Disease'
    ]
  },
  { id: 'name', type: 'text' },
  { id: 'type', type: 'text' }
];

export function Filter() {
  const { apiURL, setApiURL, setActivePage } = useData();
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleChange = useCallback((id, value) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleApply = useCallback(() => {
    const URLWithFilters = new URL(apiURL);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        URLWithFilters.searchParams.set(key, value);
      } else {
        URLWithFilters.searchParams.delete(key);
      }
    });
    setApiURL(URLWithFilters);
    setActivePage(0);
  }, [apiURL, filters, setApiURL, setActivePage]);

  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setApiURL('https://rickandmortyapi.com/api/character');
    setActivePage(0);
  }, [setApiURL, setActivePage]);

  return (
    <FilterWrapper>
      {FILTER_OPTIONS.map((option) => (
        <FilterInput
          key={option.id}
          id={option.id}
          type={option.type}
          options={option.options}
          value={filters[option.id]}
          onChange={handleChange}
        />
      ))}
      <ButtonWrapper>
        <FilterInput
          onClick={handleApply}
          type="button"
          color="#83BF46"
          text="Apply"
        />
        <FilterInput
          onClick={handleReset}
          type="button"
          color="#ff5152"
          text="Reset"
        />
      </ButtonWrapper>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 90px;
  gap: 10px;
  align-items: space-between;
  @media (max-width: 950px) {
    gap: 15px;
    width: 480px;
    height: 95px;
  }
  @media (max-width: 530px) {
    flex-direction: column;
    height: 370px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 530px) {
    flex-direction: column;
    gap: 15px;
  }
`;
