import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
import { 
  Home2, 
  Message, 
  Calendar, 
  Heart, 
  AddSquare, 
  Profile2User, 
  User, 
  Setting2, 
  Logout,
  CloseCircle
} from "iconsax-react";

interface ProfileDropdownProps {
  open: boolean;
  onClose: () => void;
}

// Define an interface for the menu items
interface MenuItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ open, onClose }) => {
  const [user] = useAtom(userAtom);
  const { signOut } = useAuth();

  const getMenuItems = (): MenuItem[] => {
    const role = user?.role;
    let items: MenuItem[] = [];

    if (role === 'host') {
      items = [
        { label: 'Dashboard', to: '/dashboard/host', icon: <Home2 size={20} /> },
        { label: 'Messages', to: '/dashboard/guest/messages', icon: <Message size={20} /> },
        { label: 'Calendar', to: '/dashboard/host/calendar', icon: <Calendar size={20} /> },
        
        { label: 'Add a Listings', to: '/flapabay-your-home', icon: <AddSquare size={20} /> },
        { label: 'Experiences', to: '/dashboard/host/experiences', icon: <Profile2User size={20} /> },
        { label: 'Profile', to: '/dashboard/host/profile', icon: <User size={20} /> },
        { label: 'Account Settings', to: '/dashboard/host/account', icon: <Setting2 size={20} /> },
      ];
    } else if (role === 'guest') {
      items = [
        { label: 'Dashboard', to: '/dashboard/guest', icon: <Home2 size={20} /> },
        
        { label: 'Messages', to: '/dashboard/guest/messages', icon: <Message size={20} /> },
        { label: 'Trips', to: '/dashboard/guest/trips', icon: <Calendar size={20} /> },
        { label: 'Wishlist', to: '/dashboard/guest/wishlist', icon: <Heart size={20} /> },
        { label: 'Become a Host', to: '/flapabay-your-home', icon: <AddSquare size={20} /> },
        { label: 'Profile', to: '/dashboard/guest/profile', icon: <User size={20} /> },
      ];
    } else {
      items = [
        // e.g., { label: 'Home', to: '/', icon: <Home2 size={20} /> }
      ]; 
    }
    return items;
  };

  const currentMenuItems = getMenuItems();

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:static">
      {/* Overlay for mobile to close dropdown */}
      <div
        className="fixed inset-0 bg-black/30 md:hidden"
        onClick={onClose}
      />
      <div
        className={
          `${
            // Mobile: fixed top, full width; Desktop: absolute right
            'md:absolute md:right-0 md:mt-16 md:w-64 md:rounded-xl md:shadow-lg md:border md:bg-white' +
            ' fixed top-0 right-0 w-full bg-white' +
            ' transition-all duration-200'
          }
          ${open ? 'block' : 'hidden'}
        `
        }
        style={{
          maxWidth: '100vw',
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        <div className="px-4 py-4 border-b border-gray-100 md:rounded-t-xl flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <div className="font-medium text-black text-base md:text-sm">{user?.user_metadata?.name}</div>
            <div className="text-xs text-gray-500 break-all">{user?.email}</div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
          >
            <CloseCircle size={24} />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {currentMenuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 text-sm md:text-xs flex items-center"
              onClick={onClose}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { signOut(); onClose(); }}
            className="px-4 py-2.5 text-left text-red-600 hover:bg-gray-100 text-sm md:text-xs flex items-center"
          >
            <span className="mr-3"><Logout size={20} /></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown; 