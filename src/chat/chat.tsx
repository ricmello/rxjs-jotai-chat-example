import React, { Suspense, useEffect } from 'react';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { chatsError, fetchChatsAtom } from './atoms';

export const Chats = () => {
  const [chats, fetchChats] = useAtom(fetchChatsAtom);
  const [error] = useAtom(chatsError);

  const reload = () => fetchChats();

  useEffect(() => {
    fetchChats();
  }, []);

  if (error) {
    return <p>There has been an error: {error}</p>;
  }

  if (chats?.length === 0) {
    return <p>No chat found...</p>;
  }

  return (
    <Suspense fallback={<p>Starting request...</p>}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chats?.map((chat) => (
          <React.Fragment key={chat.id}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt={chat.name} src={chat.avatar} />
              </ListItemAvatar>
              <ListItemText primary={chat.name} secondary={chat.lastMessage} />
            </ListItem>
            <Divider variant='inset' component='li' />
          </React.Fragment>
        ))}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label='Refresh'
              icon={<Refresh />}
              onClick={reload}
            />
          </BottomNavigation>
        </Paper>
      </List>
    </Suspense>
  );
};
