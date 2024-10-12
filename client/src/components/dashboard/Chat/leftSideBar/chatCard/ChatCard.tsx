import { Circle } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedUser,SelectedUser } from '../../../../../Redux/features/selectedUserSlice';

interface Props {
  user: SelectedUser;
}

const ChatCard: React.FC<Props> = ({ user }) => {
  const defaultProfilePic = "https://res.cloudinary.com/avhixorin/image/upload/v1724570240/profile-default_uo3gzg.png";
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div 
      className={`w-full flex py-3 px-4 gap-4 items-center justify-around bg-white hover:bg-gray-100 transition-colors duration-300 border-b border-gray-300 cursor-pointer`}
      onClick={onClick}
    >
      <img src={user.profilePic || defaultProfilePic} alt="User Avatar" className="w-10 h-10 rounded-full shadow-lg" />

      <div className="flex flex-col flex-grow">
        <p className="font-semibold text-base text-gray-800">{user.name}</p>
      </div>

      <div className="flex items-center justify-center mr-4">
        <Circle size={10} color="#00A884" fill="#00A884" />
      </div>
    </div>
  );
};

export default ChatCard;
