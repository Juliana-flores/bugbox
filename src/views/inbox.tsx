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

interface InboxResponse {
  mails: Mail[];
}
export function Inbox() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [cookies] = useCookies(['user']);
  const {} = useRouteMatch();

  useEffect(() => {
    console.log('salve');
    const payload = {
      username: cookies!.user.username,
    };

    const socket = io(env.url, {
      transports: ['websocket'],
    });

    socket.connect();

    socket.emit('inbox', payload);

    socket.once('inbox', (response: InboxResponse) => {
      setMails([...response.mails]);
    });

    return;
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <Grid container direction="row" rowSpacing={5}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item xs>
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
