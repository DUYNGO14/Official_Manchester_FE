'use client';
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./HeroSection"
import Matches from "./Matches"
import RecentPost from "./RecentPost"
import { useEffect } from "react";
import { getPostsAction, makeSelectPosts } from "@/app/stores/reduces/posts";


function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, limit:5 }));
  },[])
  const posts = useSelector(makeSelectPosts);
  console.log('posts', posts.posts);
  return (
    <>
      <HeroSection />
      <RecentPost listPost ={posts.posts} />
      <Matches  />
    </>
  )
}

export default Home
