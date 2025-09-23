import FootballMatchBanner from "@/app/components/containers/Banner/FootballMatchBanner";
import NewsBanner from "@/app/components/containers/Banner/NewsBanner";
import Matches from "@/app/components/containers/Home/Matches";
import HeroSection from "./HeroSection";
import RecentPost from "./RecentPost";


function Home() {
  
  return (
    <>
      <HeroSection />
      <RecentPost />
      <FootballMatchBanner  image="./football-match-banner.jpg"  />
      <Matches  />
      <NewsBanner image="./newBanner.webp" isDisabled={false}/>
    </>
  )
}

export default Home