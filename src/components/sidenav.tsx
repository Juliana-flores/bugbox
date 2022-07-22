import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

export function SideNav() {
  return (
    <Drawer variant="permanent">
      <Toolbar />
      <List>
        <ListItem key={'Caixa de entrada'} disablePadding button component={Link} to="/inbox">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'Caixa de entrada'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Enviados'} disablePadding button component={Link} to="/outbox">
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={'Enviados'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={'Lixeira'} disablePadding button component={Link} to="/trashcan">
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={'Lixeira'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
