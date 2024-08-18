import CampaignPage from "./components/CampaignPage"
import Footer from "./components/Footer"
import GalleryAndSponsorsPage from "./components/GalleryAndSponserPage"
import Homepage from "./components/HomePage"
import TeamAndTestimonialPage from "./components/TeamAndTestimonialPage"

function App() {
  return (
    <div className="gallery-scroll-area scrollbar-thin overflow-y-auto h-screen">
      <Homepage />
      <CampaignPage />
      <GalleryAndSponsorsPage />
      <TeamAndTestimonialPage />
      <Footer />
    </div>
  )
}

export default App
