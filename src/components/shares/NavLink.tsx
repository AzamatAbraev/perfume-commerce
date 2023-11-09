import { ChildrenType } from "@/types/children";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }: { href: string } & ChildrenType) => {
  const pathname = usePathname();
  return (
    <Link href={href} className={pathname === href ? "active" : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
