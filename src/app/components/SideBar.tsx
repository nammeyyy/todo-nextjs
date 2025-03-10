import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  UserCircleIcon, 
  CogIcon, 
  ChevronDoubleLeftIcon, 
  ArrowRightEndOnRectangleIcon, 
  ArrowRightStartOnRectangleIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

interface Profile {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  sex: string;
  timestamp: string;
  status: string;
}
interface SidebarProps {
    onSearch: (query: string) => void;  
  }

export default function Sidebar({ onSearch }: SidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleLogin = () => {
    const newProfile: Profile = {
      firstName: "John",
      lastName: "Doe",
      age: 25,
      birthDate: "1999-01-01",
      sex: "Male",
      timestamp: new Date().toISOString(),
      status: "Active",
    };
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    setProfile(newProfile);
    router.push("/profile"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setProfile(null);
    router.push("/"); 
  };

  return (
    <aside className={`bg-white h-screen transition-all ${isCollapsed ? "w-16" : "w-64"} shadow-lg`}>
      <div className="p-4 flex justify-between items-center bg-purple-600 text-white">
        {!isCollapsed && <span className="font-semibold">User Profile</span>}
        <ChevronDoubleLeftIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      <div className="p-4 flex flex-col items-center">
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
        {!isCollapsed && (
          <div className="text-center mt-2">
            {profile ? (
              <>
                <p className="font-bold">{profile.firstName} {profile.lastName}</p>
                <p className="text-sm text-gray-500">{profile.status}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No Profile</p>
            )}
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา Task..."
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      <nav className="p-4">
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <CogIcon className="h-5 w-5 mr-2" />
            {!isCollapsed && <span>Settings</span>}
          </li>
        </ul>
      </nav>

      <div className="mt-auto p-4 relative">
        <button
          className="w-full flex items-center justify-between p-2 bg-gray-200 rounded-lg"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {!isCollapsed && <span>{profile ? "Account" : "Guest"}</span>}
          {isDropdownOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute bottom-14 left-4 w-48 bg-white shadow-lg rounded-lg">
            {profile ? (
              <button
                className="w-full flex items-center p-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2 text-red-500" />
                Logout
              </button>
            ) : (
              <button
                className="w-full flex items-center p-2 hover:bg-gray-100"
                onClick={handleLogin}
              >
                <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2 text-green-500" />
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
