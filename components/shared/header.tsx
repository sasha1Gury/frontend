'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

	const router = useRouter();

	const handleSignUpRedirect = () => {
		router.push("/auth/signup");
		fetchUserData();
	};

	const handleSignInRedirect = () => {
		router.push("/auth/signin");

		fetchUserData();
	}

	const handleProfileRedirect = () => {
		router.push("/profile")
	}

	const [user, setUser] = useState<string | null>(null); // Состояние для хранения строки
	const [loading, setLoading] = useState(true);
	const fetchUserData = async () => {
		try {
			const response = await fetch('http://localhost:8080/secured/user', {
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			});

			// Проверка типа контента ответа
			const contentType = response.headers.get('Content-Type');
			if (contentType && contentType.includes('text/plain')) {
				const data = await response.text();
				setUser(data); // Установите строку в состояние
			} else {
				console.error('Получен ответ не в формате строки:', await response.text());
			}
		} catch (error) {
			console.error('Ошибка при получении данных пользователя:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, [localStorage]);

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	}

	return (
		<header className={cn('border, border-b', className)}>
			<Container className='flex items-center justify-between py-8'>

				{/* Левая часть */}
				<Link href={"/"}>
					<div className='flex items-center gap-2'>
						<Image src="/logo.svg" alt='logo' width={35} height={35}></Image>
						<div>
							<h1 className='text-2xl uppercase font-black'>VK2</h1>
							<p className='text-sm text-gray-400 leading-3'>DINAHU</p>
						</div>
					</div>
				</Link>

				{/* Правая часть */}
				<div className='flex items-center gap-3'>
					{user ? (
						<>
							<Button variant='outline'
								className='flex items-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100'
								onClick={handleProfileRedirect}>
								<User size={16} />
								{user}
							</Button>

							<Button variant='outline'
								className='flex items-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100'
								onClick={logout}>
								<LogOut size={16} />
								Выйти
							</Button>
						</>
					) : (
						<>
							{/* Sign In Button */}
							<Button
								variant="outline"
								className='flex items-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100'
								onClick={handleSignInRedirect}
							>
								<User size={16} />
								Вход
							</Button>

							{/* Sign Up Button */}
							<Button
								variant="outline"
								className='flex items-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100'
								onClick={handleSignUpRedirect}
							>
								<User size={16} />
								Регистрация
							</Button>
						</>
					)}
				</div>
			</Container>
		</header>
	);
};