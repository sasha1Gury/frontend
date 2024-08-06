// /pages/auth/signin.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, MouseEvent } from 'react';
import Head from 'next/head';

// Define the types for your state
interface SignInState {
	email: string;
	password: string;
}

const SignIn = () => {
	const router = useRouter();

	// Initialize state with TypeScript type
	const [state, setState] = useState<SignInState>({
		email: '',
		password: ''
	});

	// Handle input changes
	const fill = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	// Handle form submission
	const handle = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // Prevent the default form submission behavior
		const res = await fetch('http://localhost:8080/auth/signin', {
			method: 'POST',
			body: JSON.stringify(state),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const json = await res.text();

			localStorage.setItem('token', json);
			router.push('/');
		}
	};

	return (
		<>

			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
					<h1 className="text-2xl font-semibold mb-6 text-center">Вход</h1>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Почта
						</label>
						<input
							type="text"
							name="email"
							placeholder="email"
							value={state.email}
							onChange={fill}
							autoComplete="off"
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Пароль
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={state.password}
							onChange={fill}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>

					<button
						onClick={handle}
						className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
					>
						Вход
					</button>
				</div>
			</div>
		</>
	);
};

export default SignIn;
