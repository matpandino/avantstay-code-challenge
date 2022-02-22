import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html, body {
    height: 100%;
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    background: #FFFFFF;
    font-family: 'Source Sans Pro', sans-serif;
    letter-spacing: -0.01em;
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export default GlobalStyle;
