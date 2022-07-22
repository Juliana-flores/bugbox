import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';

export function Login() {
  return (
    <Button color="primary" variant="outlined" startIcon={<LoginIcon />}>
      Entrar
    </Button>
  );
}
