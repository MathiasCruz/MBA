import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSearch from '../lib/UseSearch';
import SearchIcon from '../SVG/SearchIcon.component';

interface ISearchInputProps {
  error: boolean;
}

interface InputSearchProps {
  found: boolean;
}
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input<ISearchInputProps>`
  width: 80%;
  border-radius: 100px;
  height: 1rem;
  background-color: ${({ error }) =>
    `${error ? `var(--primary)` : `var(--grey-dark-3)`}`};
  padding: 0.75rem 2rem;
  outline: none;
  transition: 0.2s;
  margin-right: -2rem;
  &:focus {
    width: 100%;
  }
`;

const InputSearch: React.FC<InputSearchProps> = ({ found }) => {
  const [name, setName] = useState('');
  const { filterCities } = useSearch();

  useEffect(() => {
    filterCities(name);
  }, [name]);

  return (
    <SearchBar>
      <SearchInput
        value={name}
        onChange={e => setName(e.target.value)}
        error={!found}
      />
      <SearchIcon />
    </SearchBar>
  );
};
export default InputSearch;
