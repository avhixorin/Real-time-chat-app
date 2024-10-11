import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';
import { useDispatch } from 'react-redux';
import { setLogoutUser } from '../../../../Redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearAllMessages } from '../../../../Redux/features/messagesSlice';
import { clearAllNotifications } from '../../../../Redux/features/notificationsSlice';

interface Props {
  handleFriendRequestPanelClick: () => void
}

const RightSideBar: React.FC<Props> = ({handleFriendRequestPanelClick}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.loggedInUser);

  const handleLogout = () => {
    navigate('/login');
    dispatch(setLogoutUser());

  };


  return (
    <div className='w-full h-full flex flex-col items-center p-6 bg-white shadow-lg rounded-e-lg'>
      {/* Profile Picture */}
      <div className="w-24 h-24 mb-4">
        <img
          src={'https://via.placeholder.com/150'} // Replace with actual profile image URL from user object if available
          alt={`${user?.name}'s Profile`}
          className="rounded-full w-full h-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">{user?.name || 'Guest User'}</h2>
        <p className="text-gray-600">{user?.email || 'guest@example.com'}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          View Appointments
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <div className='mt-4'>
        <button 
        className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
        onClick={() => {dispatch(clearAllMessages())}}
        >Clear All messages for all the friends</button>
      </div>
      <div className='mt-4'>
        <button 
        className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
        onClick={() => {dispatch(clearAllNotifications())}}
        >Clear all Notifications</button>
      </div>
      <div className='mt-4'>
        <button 
        className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
        onClick={handleFriendRequestPanelClick}
        >Show all friend requests</button>
      </div>
    </div>
  );
};

export default RightSideBar;
