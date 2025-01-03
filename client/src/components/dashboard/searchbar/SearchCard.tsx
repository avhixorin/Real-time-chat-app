import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { User } from '@/Redux/features/allUsersSlice';
import { setNotification } from '@/Redux/features/notificationsSlice';

interface SearchCardProps {
  user: User;
}

const SearchCard:React.FC<SearchCardProps> = ({ user }) => {
  const defaultProfilePic = "https://res.cloudinary.com/avhixorin/image/upload/v1724570240/profile-default_uo3gzg.png"; 
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const dispatch = useDispatch();
  
  const handleFriendRequest = async() => {

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/sendfriendrequest",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({from: loggedInUser?._id, to: user._id})
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to send friend request`);
      }


      const data = await response.json();
      dispatch(setNotification(data.notification));

    } catch (error) {
      console.log("The error is ", (error as Error).message);
    }
  }
  return (
    <div className='w-full flex py-3 px-4 gap-6 items-center justify-around transition-colors duration-300 border-b border-gray-300 cursor-pointer'>

      <img src={user.profilePic || defaultProfilePic} alt="User Avatar" className='w-10 h-10 rounded-full shadow-lg' />
      
      <div className='flex flex-col flex-grow'>
        <p className='font-semibold text-base text-gray-800'>{user.name}</p>
      </div>
      <div className='flex flex-col flex-grow'>
        <p className='font-semibold text-base text-gray-800'>{user.username}</p>
      </div>
      <div className='h-full flex items-center'>
        <button className='px-4 py-2 rounded-md bg-red-400 hover:bg-red-600 text-white text-base'
        onClick={handleFriendRequest}
        >
          Send Request 
        </button>
      </div>
      
    </div>
  );
}

export default SearchCard;
