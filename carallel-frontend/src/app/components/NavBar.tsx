'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<string | null>("");

  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem('token')) {
        setIsLogin(localStorage.getItem('token'));
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push("/");
    window.location.reload();
  }

  return (
    <nav className="w-full bg-gray-800 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="#" className="">
              <div className="avatar">
                <div className="w-16 rounded">
                  <h1 className="text-3xl text-white font-bold">Carallel</h1>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div>
          <div className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 block">
            <ul suppressHydrationWarning={false} className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white">
                    <Link href={"/"}>Home</Link>
                </li>
                { isLogin ? 
                    <li className="text-white cursor-pointer" onClick={logout}>Logout</li>
                   :
                  <li className="text-white">
                      <Link href={"/login"}>Login</Link>
                  </li>
                }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
