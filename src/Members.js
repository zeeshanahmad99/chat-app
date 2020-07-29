import React from 'react';
import { useParams } from 'react-router-dom';

import useCollection from './useCollection';

function Members() {
  const { channelId } = useParams();
  const members = useCollection('users', undefined, [
    `channels.${channelId}`,
    '==',
    true,
  ]);

  return (
    <div className="Members">
      <div>
        {members.map(
          (memeber) =>
            console.log(memeber) || (
              <div key={memeber.uid} className="Member">
                <div className={`MemberStatus ${memeber.status.state}`} />
                {memeber.displayName}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Members;
