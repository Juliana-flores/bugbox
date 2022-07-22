import { Typography, Link } from '@mui/material';

interface CopyrightProps {
  sx: {
    mt: number;
  };
}

export function Copyright(props: CopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Bugbox
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
