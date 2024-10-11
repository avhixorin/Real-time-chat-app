import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-full text-4xl flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700'>
            <p>Welcome to the chat app 😊</p>
            <button 
                className='rounded-md py-2 px-3 text-lg bg-white text-black hover:bg-gray-200 transition duration-300'
                onClick={() => navigate('/login')}
            >
                Continue
            </button>
        </div>
    )
}

export default Home;
