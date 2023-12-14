"use client";
import VideoList from "@/components/Videolist";
import { AuthContext } from "@/features/auth/AuthContext";
import { useContext , useEffect} from "react";
import { useRouter } from "next/navigation";


const Dash = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  
  return (
    <>
      {isLoggedIn && 
        <>
          <div className="bg-purple-100 h-[calc(100vh-88px)]">
            <VideoList />
          </div>
        </>
      
      }
    </>
  );
};

export default Dash;
