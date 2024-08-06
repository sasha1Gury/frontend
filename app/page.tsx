'use client'

import { Chat } from "@/components/shared/chat";
import { Container } from "@/components/shared/container";
import { FriendsList } from "@/components/shared/friend-list";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const[token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		setToken(storedToken);
	}, [])
	
  return (
		<Container className="pb-14">

			{
				token ? (
				<>
					<Link href="/users">
					<div className="group inline-block">
						<div className="inline-block group-hover:bg-gray-200  p-1 m-1 rounded-sm">
							добавть друзей
						</div>
					</div>
					</Link>
				</>
				) : (
				<></>
				)
			}
			{/* <div className="flex gap-[60px]">

				
				<div className="w-[400px]">
					<FriendsList/>
				</div>

				
				<div className="flex-1">
					<div className="flex flex-col gap-16">
						<Chat/>
					</div>
				</div>

			</div> */}
				
		</Container>
		
  );
}
