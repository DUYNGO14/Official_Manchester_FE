'use client';
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./HeroSection"
import Matches from "./Matches"
import RecentPost from "./RecentPost"
import { useEffect } from "react";
import { getPostsAction, makeSelectPosts } from "@/app/stores/reduces/posts";
import { IPosts } from "@/app/types/IPosts";
import FootballMatchBanner from "@/app/components/containers/Banner/FootballMatchBanner";
import NewsBanner from "@/app/components/containers/Banner/NewsBanner";


function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction({ page: 1, limit:5 }));
  },[])
  const {isCalling, posts}  = useSelector(makeSelectPosts);
  return (
    <>
      <HeroSection />
      <RecentPost listPost ={posts as IPosts[]} isCalling={isCalling} />
      <FootballMatchBanner  image="./football-match-banner.jpg" />
      {/* <Matches  /> */}
      <NewsBanner image="./newBanner.webp"/>
    </>
  )
}

export default Home
