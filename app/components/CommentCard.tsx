import React from 'react';
import avatarBoy from '~/assets/avatar_boy.png';
import avatarGirl from '~/assets/avatar_girl.png';
import {  formatDistanceToNowStrict } from 'date-fns';

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  profiles: {
    display_name: string;
    gender: number;
  };
  votes: {
    agree: boolean;
  };
}

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const timeAgo = formatDistanceToNowStrict(new Date(comment.created_at),{addSuffix:true});

  return (
    <div
      className={`${
        comment.votes.agree ? 'bg-green-400' : 'bg-red-400'
      } border shadow-md rounded-lg p-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={comment.profiles.gender === 1 ? avatarBoy : avatarGirl}
            alt="gender-img"
            className="w-10 border rounded-full"
          />
          <h3 className="text-sm font-bold">{comment.profiles.display_name}</h3>
        </div>
        <small>{timeAgo}</small>
      </div>
      <small>{comment.content}</small>
    </div>
  );
};

export default CommentCard;
