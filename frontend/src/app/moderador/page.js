"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getPosts } from "../../service/posts";
import PostsCard from "../../components/posts_card/posts_card";

import "./moderador.css";
import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";

const Page = () => {
  const pathname = usePathname();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function Carregar() {
      try {
        const data = await getPosts();
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }

    Carregar();
  }, []);
  return (
    <div>

      <div>
        <Menu_lateral_esquerdo />
      </div>

      <div> 
        <Menu_bar_topo />
      </div>
      
      <div className="div-feed-principal">
        <div className="div-feed">
          {posts.map((post) => (
            <PostsCard key={post.id} post={post} Status="Pendente" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
