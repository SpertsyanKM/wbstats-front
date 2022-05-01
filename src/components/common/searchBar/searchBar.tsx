import React from 'react';
import Input from '../input';
import {ButtonType} from '../button';
import {Container, StyledButton} from './searchBarStyles';
import {MdSearch} from 'react-icons/md';

type Props = {
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<Props> = ({placeholder, className}) => {
  return (
    <Container className={className}>
      <Input placeholder={placeholder}/>
      <StyledButton buttonType={ButtonType.Secondary} onClick={()=>{}} icon={<MdSearch />} />
    </Container>
  );
};

export default SearchBar;
