import { Redirect, useRouteMatch } from 'react-router-dom';
import { Copyright } from '../components/copyright';
import { Header } from '../components/header';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { env } from '../config/env';
import { useState } from 'react';

import {
  InputAdornment,
  CssBaseline,
  Typography,
  TextField,
  Container,
  Toolbar,
  Button,
  Alert,
  Grid,
  Link,
  Box,
} from '@mui/material';

import type { FormEvent, ChangeEvent } from 'react';

interface SignUpResponse {
  error?: string;
  user?: {
    username: string;
    password: string;
    name: string;
    outbox: [];
    inbox: [];
  };
}

export function SignUp() {
  const [cookies, setCookie] = useCookies(['user']);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const {} = useRouteMatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      username: `${email}@bugbox.com`,
      password,
      name,
    };

    const socket = io(env.url, {
      transports: ['websocket'],
    });

    socket.connect();

    socket.emit('signup', payload);

    socket.on('signup', (response: SignUpResponse) => {
      socket.disconnect();

      if (response.error) {
        setError(response.error);
        return;
      }

      setCookie('user', response.user, { secure: false });
      return;
    });
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handleName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toolbar />
          <Typography component="h1" variant="h5">
            Cadastrar-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">@bugbox.com</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePassword}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Cadastrar-se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Já possui conta?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        {cookies.user && <Redirect to="/" />}
      </Container>
    </>
  );
}
