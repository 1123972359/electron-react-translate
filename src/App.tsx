import { FC } from 'react';
import { Home } from './pages/home';
import { Result } from './pages/result';
import { query } from './utils';

const App: FC = () => {
  const isResult = query.get('result');

  if (isResult) {
    return <Result />;
  }

  return <Home />;
};

export default App;
