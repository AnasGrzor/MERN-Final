import Hero from "../components/Hero";
import Videoplayer from "../components/Videoplayer";


export default function Home() {
  return (
    <main>
      <Videoplayer videoUrl="http://localhost:4000/api/video/stream/6569f6047f457620b5aac9b6" />
      {/* <Hero /> */}
    </main>
  );
}
