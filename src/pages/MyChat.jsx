import React , { useEffect, useRef,  useState} from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

const MyChat = () => {
  const ref = useRef(null);
  const [messages, setMessages] = useState({});
  const [contactList, setContactList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [contactId, setContactId] = useState([]);
  const [currentDialogue, setCurrentDialogue] = useState([]);
  
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('/api/Message');
      const data = await response.json();
      setMessages(data);
      setContactId(Object.keys(data));
      setSelectedIndex
      setSelectedContactId(contactId[selectedIndex]);
      setCurrentDialogue(selectedIndex, messages[selectedContactId]);
      return data;
  }
    fetchMessages();
  }, []);

  useEffect(() => {
    async function fetchContacts() {
      for (let i = 0; i < contactId.length; i++) {
        const response = await fetch(`/api/UserInfo/${contactId[i]}`);
        const data = await response.json();
        setContactList(current => [...current, data.firstName+" "+data.lastName]);
        } 
      }
    fetchContacts();
  }, [messages]);

  const handleAvatarClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedContactId(contactId[selectedIndex]);
  }, [selectedIndex, messages]);

  useEffect(() => {
    setCurrentDialogue(messages[selectedContactId]);
    
  }, [selectedIndex, selectedContactId, messages]);

  const ShowDialogue = () => {
    try {
      const dialogue = currentDialogue.map(({ content, receiverId }, index) => (
        <Box key={index} sx={{m:1}}> 
            <Chip size='large' variant="filled" label={content} color={receiverId === selectedContactId ? 'success' : 'default'}
              sx={{
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                },}}
            />
        </Box>
      ));
      return dialogue;
    } catch (error) {
      console.log(error);      
    }
    return ;
  };

  useEffect(() => {
    ShowDialogue();
  }, [currentDialogue]);

  
  const appendMessage = (message) => {
    const newDialogue = [...currentDialogue, message];
    setCurrentDialogue(newDialogue);
    postMessage(message);
    lockScrollAtBottom();
  };
  const lockScrollAtBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    lockScrollAtBottom();
  }, [currentDialogue]);

  const postMessage = async (message) => {
    const requestBody = {
      content: message.content,
      receiverId: message.receiverId,
    };
    const response = await fetch('/api/Message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{ flexGrow: 1, p: 1, pb: 1, borderRight: 1} }
        ref={ref}
        >
        <List>
          {contactList.map((item, index) => (
            <ListItem key={item }>
              <ListItemButton selected={selectedIndex === index} onClick={(event) => handleAvatarClick(event, index)}>
              <ListItemText primary={item}/>
            </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Box>
      <Box sx={{flexGrow: 10, m: 3, display: 'flex'}}>
        <Paper sx={{flexGrow: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto', height: '500px'}} ref={messagesContainerRef}>
          <div>
            <ShowDialogue/>
          </div>
          <SendBox>
          <TextField
            id="filled-multiline-flexible"
            multiline
            rows={3}
            variant="filled"
            fullWidth
            onKeyUp={(event) => {if (event.key === 'Enter') {appendMessage(
              {
                content: event.target.value,
                messageId: null,
                receiverId: selectedContactId,
                senderId: null,
                sentAt: null,
              }); 
              event.target.value = '';}}}
          />
          </SendBox>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyChat;

const SendBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
