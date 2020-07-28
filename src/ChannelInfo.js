import React from 'react';
import { useParams } from 'react-router-dom';

import useDoc from './useDoc';

function ChannelInfo() {
  const { channelId } = useParams();
  const channel = useDoc(`channels/${channelId}`);

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input
          onChange={() => {}}
          className="TopicInput"
          defaultValue={channel?.topic}
        />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

export default ChannelInfo;
