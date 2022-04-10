import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
a { color: inherit; } 
a:hover { color: inherit; } 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  *:focus {
    outline: none !important;
    outline-offset: none !important;
}
  
  body {
    font-family: Ubuntu, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  #root{
    min-height: 100%;
    display:flex;
    width: 100%;
  }
  
  // @font-face {
  //   font-family: 'Ubuntu-Medium';
  //   src: local('Ubuntu-Medium'), url("../../assets/fonts/Ubuntu-Medium.ttf") format('ttf');
  // }
  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: white; 
    border-top-right-radius:20px;
    border-bottom-right-radius:20px;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: red; 
  }
`;
