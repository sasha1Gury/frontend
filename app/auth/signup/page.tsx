'use client'

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';

interface SignUpState {
  name: string;
	secondName: string;
  password: string;
  email: string;
}

export default function SignUp() {
  const router = useRouter();

  const [state, setState] = useState<SignUpState>({
    name: '',
		secondName: '',
    password: '',
    email: ''
  });

  // Обработка изменения полей ввода 
  function extract(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  // Обработка отправки формы
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const res = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      alert('Success');
      router.push('/auth/signin');
    } else {
      alert('Failed to sign up');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md w-full max-w-md rounded-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={extract}
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

					<div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondName">
              Фамилия
            </label>
            <input
              type="text"
              name="secondName"
              placeholder="Second name"
              value={state.secondName}
              onChange={extract}
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={extract}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Почта
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={extract}
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Регистрация
          </button>
        </form>
      </div>
    </div>
  );
}
