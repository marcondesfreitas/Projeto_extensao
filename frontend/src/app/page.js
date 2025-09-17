'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
      <Link href="/login">login</Link>
      <ul>
        {posts.map((posts) => (
          <li key={posts.id}>
            <Link href={`/posts/${posts.id}`}>{posts.title}</Link><br></br>
            <a>{posts.body}</a>
          </li>

        ))}
      </ul>

    </div>
  );
}

