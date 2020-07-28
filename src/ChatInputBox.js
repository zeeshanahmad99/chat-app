import React from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';

function ChatInputBox({ user }) {
  const { channelId } = useParams();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const value = event.target.elements[0].value;
        if (value.trim() === '') return;
        db.collection('channels')
          .doc(channelId)
          .collection('messages')
          .add({
            user: db.collection('users').doc(user.uid),
            text: value,
            createdAt: new Date(),
          });
        event.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder={`Message #${channelId}`} />
    </form>
  );
}

export default ChatInputBox;
