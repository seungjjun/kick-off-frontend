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
    border-radius: 5px;  
    border: 1px solid #64C2EB;
    background-color: #64C2EB;
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
