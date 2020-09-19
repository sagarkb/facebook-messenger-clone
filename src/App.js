import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';

import Message from './Message';
import db from './firebase';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt('Enter your username to join chat: '));
  }, []);

  const addMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt='logo'
      />
      <h3>Facebook Messenger</h3>
      <h4>welcome {username}</h4>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input
            className='app__input'
            placeholder='Enter message'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className='app__iconButton'
            variant='contained'
            color='primary'
            type='submit'
            disabled={!input}
            onClick={addMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
