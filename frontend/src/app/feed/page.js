"use client"

import './feed.css'

import React from 'react'
import { useState, useEffect } from 'react'
import { getPosts } from '../service/posts'
import PostsCard from '../posts_card/posts_card';


export default function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
      async function Carregar() {
        try {
          const data = await getPosts()
          setPosts(data)
          console.log(data); 
        }catch (err){
          console.error(err);
        }
      }

      Carregar()

    }, [])

  return (
    <div className='div-feed'>
        {posts.map(post => (
             <PostsCard key={post.id} post={post} />
        ))}
    </div>
  )
}
