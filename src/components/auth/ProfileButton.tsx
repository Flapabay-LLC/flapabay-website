import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from 'iconsax-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import ProfileDropdown from './ProfileDropdown';
import { useLocation } from 'react-router-dom';

const getInitials = (user: any) => {
  // Try to use name first, else email
  if (user?.user_metadata?.name) {
    return user.user_metadata.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  if (user?.email) {
    const username = user.email.split('@')[0];
    return username.slice(0, 2).toUpperCase();
  }
  return '';
};

export const ProfileButton = () => {
  const [user] = useAtom(userAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Check if we're on an auth page
  const isAuthPage = location.pathname.startsWith('/auth/');

  useEffect(() => {
    if (!isDropdownOpen) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  if (!user) {
    // Don't show sign-in button on auth pages
    if (isAuthPage) {
      return null;
    }
    return (
      <Button
        variant="default"
        data-bs-toggle="modal"
        data-bs-target="#loginSignupModal"
        role="button"
        className="rounded-2xl"
      >
        Sign in
        <ArrowRight className="fal fa-arrow-right-long transition-transform" />
      </Button>
    );
  }

  const profileImg = user.user_metadata?.picture;
  const altText = user.user_metadata?.name || user.email || 'Profile';

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsDropdownOpen((v) => !v)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="Open profile menu"
      >
        <Avatar className="h-9 w-9">
          {profileImg ? (
            <AvatarImage src={profileImg} alt={altText} />
          ) : (
            <AvatarFallback className="bg-[#ffc500] text-white">
              {getInitials(user)}
            </AvatarFallback>
          )}
        </Avatar>
      </button>
      <ProfileDropdown open={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
    </div>
  );
}; 