import { Redirect, useRouteMatch } from 'react-router-dom';
import { CssBaseline, Grid, Toolbar } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { SideNav } from '../components/sidenav';
import { MailBox } from '../components/mailbox';
import { Header } from '../components/header';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { env } from '../config/env';
interface Mail {
  subject: string;
  body: string;
  from: string;
  to: string;
  sid: string;
}

interface OutboxResponse {
  mails: Mail[];
}
export function OutBox() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [cookies] = useCookies(['user']);
  const {} = useRouteMatch();

  useEffect(() => {
    const payload = {
      username: cookies!.user.username,
    };

    const socket = io(env.url, {
      transports: ['websocket'],
    });

    socket.connect();

    socket.emit('outbox', payload);

    socket.once('outbox', (response: OutboxResponse) => {
      setMails([...response.mails]);
    });
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <Grid container direction="row" rowSpacing={5}>
        <Grid item md={15}>
          <Header />
        </Grid>
        <Grid item xs={1.5}>
          <Toolbar />
          <SideNav />
        </Grid>
        <Grid item xs>
          <Toolbar />

          <MailBox mails={mails} />
        </Grid>
      </Grid>
      {!cookies.user && <Redirect to="/signin" />}
    </Fragment>
  );
}
