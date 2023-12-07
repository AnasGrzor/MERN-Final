import Hero from "../components/Hero";
import Videoplayer from "../components/Videoplayer";


export default function Home() {
  return (
    <main>
      <Videoplayer videoUrl="http://localhost:4000/api/video/stream/657068374e20102d9dc9d2a2" />
      {/* <Hero /> */}
    </main>
  );
}
