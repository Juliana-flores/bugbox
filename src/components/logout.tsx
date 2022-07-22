import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
export function Logout() {
  return (
    <Button color="primary" variant="outlined" startIcon={<LogoutIcon />}>
      Sair
    </Button>
  );
}
