import React from "react";
import AvatarBoy from "~/assets/avatar_boy.png";
import AvatarGirl from "~/assets/avatar_girl.png";

type Props = {
  user: {
    user: {
      gender: number;
      name: string;
    };
    userProfile: {
      user: {
        email: string;
      };
    };
  };
};
const ProfileSection: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={user.user.gender === 1 ? AvatarBoy : AvatarGirl}
        className="border-2 rounded-full w-28"
        alt="avatar-img"
        draggable="false"
      />
      <div>
        <h3 className="text-3xl font-medium">{user.user.name}</h3>
        <p>{user.userProfile.user.email}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
