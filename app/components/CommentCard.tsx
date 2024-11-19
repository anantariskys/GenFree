import React from "react";
import avatarBoy from "~/assets/avatar_boy.png";
import avatarGirl from "~/assets/avatar_girl.png";
import { formatDistanceToNowStrict } from "date-fns";
import { Form } from "@remix-run/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  profiles: {
    display_name: string;
    gender: number;
    role:boolean
  };
  votes: {
    agree: boolean;
  };
}

interface User {
  name: string;
  display_name: string;
  user_id: number;
  gender: number;
  role: boolean;
}

const CommentCard: React.FC<{ comment: Comment; user: User }> = ({
  comment,
  user,
}) => {
  const timeAgo = formatDistanceToNowStrict(new Date(comment.created_at), {
    addSuffix: true,
  });

  return (
    <div
      className={`${
        comment.votes.agree ? "bg-green-400" : "bg-red-400"
      } border shadow-md rounded-lg p-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={comment.profiles.gender === 1 ? avatarBoy : avatarGirl}
            alt="gender-img"
            className="w-10 border rounded-full"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-bold">
                {comment.profiles.display_name}
              </h3>
              {comment.profiles.role && <Icon icon={"material-symbols:verified"} />}
            </div>
            <small>{timeAgo}</small>
          </div>
        </div>
        {comment.user_id === user.user_id ||
          (user.role && (
            <Form>
              <Icon icon={"material-symbols:delete"} className="text-2xl" />
            </Form>
          ))}
      </div>
      <small className="text-right">{comment.content}</small>
    </div>
  );
};

export default CommentCard;
