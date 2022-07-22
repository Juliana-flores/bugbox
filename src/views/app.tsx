import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import type { Theme } from '@mui/material';

import { TrashCan } from './trashcan';
import { SignIn } from './signin';
import { SignUp } from './signup';
import { OutBox } from './outbox';
import { Inbox } from './inbox';
import { Home } from './home';

export function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  }) as Theme;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/outbox">
            <OutBox />
          </Route>
          <Route path="/trashcan">
            <TrashCan />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
