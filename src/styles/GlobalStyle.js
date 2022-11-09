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
    cursor: pointer;
  }
  /* button:hover {
    color: #000;
  }
  button:active {
    color: #fff;
  } */
`;

export default GlobalStyle;
