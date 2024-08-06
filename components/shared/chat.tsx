// components/shared/Chat.tsx
"use client";

import { useSearchParams } from 'next/navigation'; // Импортируйте useSearchParams
import { useState, useEffect } from 'react';
import { FriendsList } from './friend-list';


interface Message {
  sender: string;
  content: string;
}

export const Chat: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (id) {
      // Замените это на запрос ваших данных чата
      const fakeMessages: Message[] = [
        { sender: 'Alice', content: 'Hello!' },
        { sender: 'Me', content: 'Hi, how are you?' },
        { sender: 'Alice', content: 'I am fine, thank you!' }
      ];
      setMessages(fakeMessages);
    }
  }, [id]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessages = [...messages, { sender: 'Me', content: newMessage }];
    setMessages(newMessages);
    setNewMessage('');
  };

  return (
    <div className="flex">
      {/*<FriendsList selectedId={Number(id)} />*/}
      <div className="flex-1 p-4">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'Me' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
