import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../api/auth/mutations";
import useCookie from "react-use-cookie";
import { useRouter } from "next/router";
import cx from "classnames";

const UserMenu: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleOpenDropdown = () => setDropdownOpen((open) => !open);

  const [authToken, setAuthToken] = useCookie("authToken");
  const [signOutRequest] = useMutation(LOGOUT_USER);

  const router = useRouter();
  const handleSignOut = () =>
    signOutRequest({
      variables: {},
    }).then((res) => {
      if (res.data?.logoutUser?.success) {
        setAuthToken("");
        router.push("/");
      }
    });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // close on click outside
    const clickHandler = (event: MouseEvent) => {
      if (!dropdownRef.current) {
        return;
      }
      if (
        !dropdownOpen ||
        dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onFocus={toggleOpenDropdown}
        aria-expanded={dropdownOpen}
      >
        <Image
          className="w-8 h-8 rounded-full"
          src="/auth/user-avatar-32.png"
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800"></span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>
      <div
        className={cx(
          "transition ease-out transform origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0",
          {
            "opacity-0 -translate-y-2": !dropdownOpen,
            "opacity-100 translate-y-0": dropdownOpen,
          }
        )}
      >
        <ul>
          <li>
            <button
              className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
