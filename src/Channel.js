import React, { useEffect } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';

import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';

function Channel({ user }) {
  const { channelId } = useParams();

  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [user.uid, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
}

export default Channel;
