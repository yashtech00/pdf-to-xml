"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FileCode, LogOut, PanelRightClose, PanelRightOpen, Home, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const sidebarLinks = [
    { name: "Home", href: "/dashboard/home", Icon: Home },
    { name: "Profile", href: "/dashboard/profile", Icon: User },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const session = useSession();
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <aside
            className={clsx(
                "bg-gray-900 transition-all duration-300 flex flex-col h-full pb-0",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            
            {/* Header */}
            <div className="flex justify-between items-center gap-2 p-4 pr-0">
                {!isCollapsed && (
                    <Link href="/" className="flex items-center gap-2">
                        <FileCode width={28} height={28} className="text-white" />
                        <span className="bg-clip-text bg-gradient-to-r from-white to-neutral-500 font-medium text-xl text-white">
                            PDF-XML
                        </span>
                    </Link>
                )}
                {!isMobile && (
                    <Button
                        size="icon"
                        onClick={toggleSidebar}
                        className="hidden md:flex bg-transparent hover:bg-[#1E1F23] p-1 text-gray-300"
                    >
                        {isCollapsed ? (
                            <PanelRightClose style={{ width: "20px", height: "20px" }} />
                        ) : (
                            <PanelRightOpen style={{ width: "20px", height: "20px" }} />
                        )}
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="mt-6">
                <ul>
                    {sidebarLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    "block p-3 rounded-md text-white",
                                    pathname === link.href
                                        ? "bg-blue-500"
                                        : "hover:bg-gray-700"
                                )}
                            >
                                {!isCollapsed ? (
                                    <div className="flex items-center gap-2">
                                        <link.Icon /> 
                                        {link.name}
                                    </div>
                                ) : (<>{<link.Icon/>}</>)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-gray-800">
                <div
                    className={clsx(
                        "flex items-center text-white",
                        isCollapsed ? "justify-center" : "space-x-3"
                    )}
                >
                    <Avatar>
                        <AvatarImage
                            src={session.data?.user?.image || ""}
                            alt="User Avatar"
                        />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div>
                            <h3 className="font-medium text-sm">{session.data?.user?.name}</h3>
                            <p className="text-xs text-gray-400">
                                {session.data?.user?.email}
                            </p>
                        </div>
                    )}
                </div>
                <Button
          onClick={async () => await signOut()}
          size="sm"
          className={`mt-2 text-left w-fit bg-transparent text-sm hover:bg-transparent ${
            isCollapsed ? "p-2" : ""
          } text-red-700 `}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
            </div>
        </aside>
    );
}
