import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    word-break: keep-all;
    margin: 0;
    padding: 0;
    font-size: 16px;
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
  
  button {
    border: none;
    border-radius: 7px;
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
  button:hover {
    background-color: #CD2C2C;
  }
  /* button:active {
    color: #fff;
  } */
`;

export default GlobalStyle;
