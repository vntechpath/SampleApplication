import { useState, useRef, useEffect } from "react";
import { User, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover-elevate rounded-full"
        data-testid="button-profile-menu"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-popover-border rounded-lg shadow-lg py-1 z-50">
          <button
            className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
            onClick={() => {
              console.log("My Profile clicked");
              setIsOpen(false);
            }}
            data-testid="button-my-profile"
          >
            <User className="h-4 w-4" />
            My Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
            onClick={() => {
              console.log("Login clicked");
              setIsOpen(false);
            }}
            data-testid="button-login"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
        </div>
      )}
    </div>
  );
}
