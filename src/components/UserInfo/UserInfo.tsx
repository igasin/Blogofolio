import { FC } from 'react';
import './UserInfo.scss';

interface IUserInfo {
  username: string;
}

export const UserInfo: FC<IUserInfo> = ({ username }) => {
  const generateInitials = (name: string) => name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="userinfo">
      <div className="userinfo__initials">{generateInitials(username)}</div>
      <div className="userinfo__name">{username}</div>
    </div>
  );
};
