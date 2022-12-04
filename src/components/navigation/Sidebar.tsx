import Link from "next/link";
import React, { useState } from "react";
import cx from "classnames";

export interface SidebarProps {
  activeTab: "email" | "qualify" | "search" | "home";
  sidebarOpen: boolean;
  setSidebarOpen: (state: ((prevState: boolean) => boolean) | boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const sidebarClosed = !sidebarOpen;
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebarOpen = () => setSidebarOpen((s) => !s);

  const [parentLinkExpanded, setParentLinkExpanded] = useState(false);
  const toggleParentLinkExpanded = () => setParentLinkExpanded(!parentLinkExpanded);

  const expandSidebarOrParentLink = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      return;
    }
    toggleParentLinkExpanded();
  };

  return (
    <div>
      <div
        className={cx(
          "fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200",
          {
            "opacity-100": sidebarOpen,
            "opacity-0 pointer-events-none": sidebarClosed,
          }
        )}
        aria-hidden="true"
      />

      <div
        id="sidebar"
        className={cx(
          "flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar sidebar-expanded:w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out",
          {
            "translate-x-0 sidebar-expanded": sidebarOpen,
            "-translate-x-64": sidebarClosed,
            "lg:w-20": sidebarClosed,
            "w-64": sidebarOpen,
          }
        )}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={closeSidebar}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <Link className="block" href="/">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              <Link href="/">
                <li
                  className={cx("px-3 py-3 rounded-sm mb-0.5 last:mb-0", {
                    "bg-slate-900": activeTab === "home",
                  })}
                >
                  <span
                    className={cx(
                      "block text-slate-200 hover:text-white truncate transition duration-150",
                      { "hover:text-slate-200": activeTab === "home" }
                    )}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 w-6 h-6" viewBox="3 0 21 21">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path
                          className={cx("fill-current", {
                            "text-indigo-500": activeTab === "home",
                            "text-slate-600": activeTab !== "home",
                          })}
                          d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Home
                      </span>
                    </div>
                  </span>
                </li>
              </Link>
              <Link href="/search">
                <li
                  className={cx("px-3 py-3 rounded-sm mb-0.5 last:mb-0", {
                    "bg-slate-900": activeTab === "search",
                  })}
                >
                  <span
                    className={cx(
                      "block text-slate-200 hover:text-white truncate transition duration-150",
                      { "hover:text-slate-200": activeTab === "search" }
                    )}
                  >
                    <div className="flex items-center">
                      <svg
                        className="shrink-0 w-6 h-6"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className={cx("fill-current", {
                            "text-indigo-500": activeTab === "search",
                            "text-slate-600": activeTab !== "search",
                          })}
                          d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                        />
                        <path
                          className={cx("fill-current", {
                            "text-indigo-500": activeTab === "search",
                            "text-slate-600": activeTab !== "search",
                          })}
                          d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Creator Search
                      </span>
                    </div>
                  </span>
                </li>
              </Link>
              <Link href="/qualify">
                <li
                  className={cx("px-3 py-3 rounded-sm mb-0.5 last:mb-0", {
                    "bg-slate-900": activeTab === "qualify",
                  })}
                >
                  <span
                    className={cx(
                      "block text-slate-200 hover:text-white truncate transition duration-150",
                      { "bg-slate-900": activeTab === "qualify" }
                    )}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={cx("fill-current text-slate-400", {
                            "text-indigo-300": activeTab === "qualify",
                          })}
                          d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                        />
                        <path
                          className={cx("fill-current", {
                            "text-indigo-500": activeTab === "qualify",
                            "text-slate-600": activeTab !== "qualify",
                          })}
                          d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                        />
                        <path
                          className={cx("fill-current text-slate-600", {
                            "text-indigo-600": activeTab === "qualify",
                          })}
                          d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Creator Qualify
                      </span>
                    </div>
                  </span>
                </li>
              </Link>
              <Link href="/email">
                <li
                  className={cx("px-3 py-3 rounded-sm mb-0.5 last:mb-0", {
                    "bg-slate-900": activeTab === "email",
                  })}
                >
                  <span
                    className={cx(
                      "block text-slate-200 hover:text-white truncate transition duration-150",
                      { "hover:text-slate-200": activeTab === "email" }
                    )}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="-10 0 140 105">
                        <path
                          className={cx("fill-current", {
                            "text-indigo-500": activeTab === "email",
                            "text-slate-600": activeTab !== "email",
                          })}
                          d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"
                          data-name="Layer 2"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Email
                      </span>
                    </div>
                  </span>
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              <div
                className={cx(
                  "block text-slate-200 hover:text-white truncate transition duration-150",
                  { "hover:text-slate-200": parentLinkExpanded }
                )}
                onClick={expandSidebarOrParentLink}
              >
                <div
                  className={cx(
                    "flex items-center justify-between transition-none",
                    {
                      "flex-col": sidebarClosed,
                      "2xl:flex-row": sidebarClosed,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className="fill-current text-slate-600"
                        d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                      />
                      <path
                        className="fill-current text-slate-400"
                        d="M15 12L8 6v5H0v2h8v5z"
                      />
                    </svg>
                    <span
                      className={cx(
                        "text-sm font-medium ml-3 duration-200 2xl:block",
                        {
                          "sm:block": sidebarOpen,
                          "sm:hidden": sidebarClosed,
                        }
                      )}
                    >
                      Authentication
                    </span>
                  </div>
                  <div className="flex shrink-0 ml-2">
                    <button onClick={toggleParentLinkExpanded}>
                      <svg
                        className={cx(
                          "w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 2xl:block",
                          {
                            "rotate-180": parentLinkExpanded,
                            hidden: sidebarClosed,
                          }
                        )}
                        viewBox="0 0 12 12"
                      >
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul className={cx("pl-9 mt-1", { hidden: !parentLinkExpanded })}>
                  <Link href="/reset-password">
                    <li className="mb-1 last:mb-0">
                      <span className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                        <span className="text-sm font-medium lg:hidden lg:sidebar-expanded:block 2xl:opacity-100 duration-200">
                          Reset Password
                        </span>
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            </ul>
          </div>
        </div>

        <div className="pt-3 sm:hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={toggleSidebarOpen}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className={cx("w-6 h-6 fill-current", { "rotate-180": sidebarOpen })}
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
