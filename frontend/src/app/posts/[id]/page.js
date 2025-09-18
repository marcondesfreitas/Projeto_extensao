    'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'

export default function Posts({ params }) {
  const { id } = use(params)  

  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  )
}
