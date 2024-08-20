import { Toaster } from "react-hot-toast"
import CampaignPage from "./components/CampaignAndEventPage"
import Footer from "./components/Footer"
import GalleryPage from "./components/GalleryPage"
import Homepage from "./components/HomePage"
import TeamAndTestimonialPage from "./components/TeamAndTestimonialPage"

function App() {
  return (
    <div className="gallery-scroll-area scrollbar-thin overflow-y-auto h-screen">
      <Toaster />
      <Homepage />
      <CampaignPage />
      <GalleryPage />
      <TeamAndTestimonialPage />
      <Footer />
    </div>
  )
}

export default App
