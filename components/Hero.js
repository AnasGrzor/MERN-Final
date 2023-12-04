import Link from "next/link";
import { Button } from "../components/ui/button";

const Hero = () => {
  return (
    <section className="w-full h-[calc(100vh-88px)] bg-[url(https://images.unsplash.com/photo-1617957796182-4b6047098686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHB1cnBsZSUyMGhlcm8lMjBzZWN0aW9ufGVufDB8fDB8fHww)] bg-cover bg-center bg-no-repeat ">
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="w-1/3 h-1/3">
          <h1 className="text-5xl font-bold ">Wiz App</h1>
          <p className="text-2xl pt-2 pb-2">
            A Secure Video Streaming Platform
          </p>
          <Button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
