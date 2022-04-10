
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}

declare global {
    interface Window {
      $electron: any
      
    }
  }
ReactDOM.render(<App />, document.getElementById('root'));

