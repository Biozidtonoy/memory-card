import MemoryCard from "./components/MemoryCard"
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {
  return (
    <>
     <MemoryCard/>
     <SpeedInsights />
    </>
  )
}

export default App