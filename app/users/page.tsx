// app/friends/page.tsx
'use client'

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number; // Идентификатор пользователя
  name: string;
  secondName: string;
  isFriend: boolean; // Статус дружбы
}

const Users = () => {
	const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8080/secured/users', {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }); // Замените на ваш реальный API-эндпоинт
        if (!res.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const users: User[] = await res.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddFriend = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/secured/friends/add/${userId}`, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });
      if (!res.ok) {
        throw new Error('Ошибка при добавлении в друзья');
      }
      // Обновление состояния для отражения изменений
      setUsers(users.map(user =>
        user.id === userId ? { ...user, isFriend: true } : user
      ));
      alert('Пользователь добавлен в друзья!');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить пользователя в друзья');
    }
  };

  const handleSendMessage = (userId: number) => {
    // Реализуйте логику отправки сообщения
    //alert(`Сообщение пользователю с ID: ${userId}`);
		router.push('/im/: ${userId}');
  };

  return (
    <>
      <Head>
        <title>Users List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Users List</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Second Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.secondName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.isFriend ? (
                        <>
                          <span className="text-green-500 font-semibold">Friend</span>
                          <button
                            onClick={() => handleSendMessage(user.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
                          >
                            Message
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAddFriend(user.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Add Friend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
