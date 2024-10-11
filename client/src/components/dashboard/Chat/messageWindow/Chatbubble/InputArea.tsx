import React from 'react';

interface InputAreaProps {
    message: string;
    setMessage: (msg: string) => void;
    handleSendMessage: () => void;
  }
  
  const InputArea: React.FC<InputAreaProps> = ({ message, setMessage, handleSendMessage }) => {
    return (
      <footer className="w-full py-2 px-4 flex items-center gap-2 bg-[#00A884] text-slate-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 rounded-lg bg-slate-100 text-slate-900"
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className="bg-white text-[#00A884] px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </footer>
    );
  };

  export default InputArea;