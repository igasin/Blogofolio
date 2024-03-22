import { FC, useState } from 'react';
import './UserInfo.scss';
import { UserInfoModal } from '../UserInfoModal/UserInfoModal';

interface IUserInfo {
  username: string;
}

export const UserInfo: FC<IUserInfo> = ({ username }) => {
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);

  const generateInitials = (name: string) => name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const handleOpenUserModal = () => setIsOpenUserModal(true);
  const handleCloseUserModal = () => setIsOpenUserModal(false);

  return (
    <>
      <div className="userinfo" onKeyDown={handleOpenUserModal} role="button" tabIndex={0} onClick={handleOpenUserModal}>
        <div className="userinfo__initials">{generateInitials(username)}</div>
        <div className="userinfo__name">{username}</div>
      </div>
      {isOpenUserModal && <UserInfoModal onClose={handleCloseUserModal} />}
    </>
  );
};
