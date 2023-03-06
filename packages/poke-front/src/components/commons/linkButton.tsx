import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkButton = styled(Link)`
  font-size: 1rem;
  padding: 10px 5px;
  width: 100%;
  text-align: center;
  background-color: #010124;
  color: #ffcb05;
  text-decoration: none;
  background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
  border-radius: 15px;

  &:hover {
    background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
  }

  &:visited {
    color: #ffcb05;
  }
`;

export default LinkButton;
