'use client'

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { Title } from './title';
import Link from 'next/link';

interface FriendsListProps {
  selectedId?: number;
}

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  lastMessage: string;
}

export const FriendsList: React.FC<FriendsListProps> = ({ selectedId }) => {

	const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

	useEffect(() => {
    // Используем фиктивные данные
    const fakeFriends: Friend[] = [
      { id: 1, firstName: 'Alice', lastName: 'Smith', lastMessage: 'See you tomorrow!' },
      { id: 2, firstName: 'Bob', lastName: 'Johnson', lastMessage: 'Let\'s catch up later.' },
      { id: 3, firstName: 'Charlie', lastName: 'Brown', lastMessage: 'Got it, thanks!' },
      { id: 4, firstName: 'Dave', lastName: 'Williams', lastMessage: 'How was your day?' },
      { id: 5, firstName: 'Eve', lastName: 'Davis', lastMessage: 'Talk to you soon!' },
      { id: 6, firstName: 'Frank', lastName: 'Miller', lastMessage: 'Are we still on for tonight?' },
      { id: 7, firstName: 'Grace', lastName: 'Hopper', lastMessage: 'Good morning!' },
      { id: 8, firstName: 'Hank', lastName: 'Moody', lastMessage: 'See you at the meeting.' },
      { id: 9, firstName: 'Ivy', lastName: 'Ross', lastMessage: 'Can you send me the files?' },
      { id: 10, firstName: 'Jack', lastName: 'White', lastMessage: 'Happy Birthday!' }
    ];

    // Имитация задержки загрузки данных
    
		setFriends(fakeFriends);
		setLoading(false);
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (friends.length === 0) {
    return <div className="p-4">У вас нет друзей</div>;
  }

	return (
		<div>
			<Title text='Друзья' size='sm' className='my-10 mb-5 font-bold' />
			<div className='flex flex-col gap-4 overflow-y-auto h-96 scrollbar pr-5'>
			<ul>
          {friends.map((friend) => (
            <li key={friend.id} className="mb-4">
							<Link 
								key={friend.id} 
								href={`/chat/${friend.id}`} 
								className={`block p-4 rounded-lg shadow transition ${selectedId === friend.id ? 'bg-blue-100' : 'bg-white'} hover:bg-gray-100`}
							>
								<div className="text-lg font-semibold">{friend.firstName} {friend.lastName}</div>
								<div className="text-sm text-gray-600">{friend.lastMessage}</div>
							</Link>
            </li>
          ))}
        </ul>
			</div>

		</div>
	);
};
