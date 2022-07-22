import { Redirect, useRouteMatch } from 'react-router-dom';
import { SideNav } from '../components/sidenav';
import { useCookies } from 'react-cookie';
import { CssBaseline, Grid } from '@mui/material';
import { Header } from '../components/header';
import { Fragment } from 'react';
export function Home() {
  const [cookies] = useCookies(['user']);
  const {} = useRouteMatch();

  return (
    <Fragment>
      <CssBaseline />
      <Header />

      <Grid container direction="row">
        <Grid item xs={1.5}>
          <SideNav />
        </Grid>
      </Grid>
      {!cookies.user && <Redirect to="/signin" />}
    </Fragment>
  );
}
