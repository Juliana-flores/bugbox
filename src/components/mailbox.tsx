interface Mail {
  subject: string;
  from: string;
  body: string;
  to: string;
  sid: string;
}

interface MailBoxProps {
  mails: Mail[];
}

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Fragment } from 'react';
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Accordion,
  Divider,
  Box,
} from '@mui/material';

export function MailBox({ mails }: MailBoxProps) {
  return (
    <Fragment>
      {mails.map(({ from, to, subject, body, sid: id }) => (
        <Accordion key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            key={id + '-header'}
            id={id + '-header'}
          >
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ flexShrink: 0 }}>
                De: <Typography sx={{ color: 'text.secondary' }}>{from}</Typography>
              </Typography>

              <Divider />
              <Typography sx={{ flexShrink: 0 }}>
                Para: <Typography sx={{ color: 'text.secondary' }}>{to}</Typography>
              </Typography>
              <Divider />
              <Typography sx={{ flexShrink: 0 }}>Assunto:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{subject}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails key={id + '-details'}>
            <Box>
              {body.split('\\n').map((value, index) => (
                <Typography variant={'body2'} key={index + '-' + value}>
                  {value}
                </Typography>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Fragment>
  );
}
