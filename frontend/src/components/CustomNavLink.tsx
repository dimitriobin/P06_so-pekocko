import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
}

function CustomNavLink({ to, children }: Props) {
  return (
    <NavLink
      to={to}
      className={({
        isActive,
        isPending,
        isTransitioning,
      }: {
        isActive: boolean;
        isPending: boolean;
        isTransitioning: boolean;
      }) =>
        [
          isPending ? "pending" : "",
          isActive ? "text-blue-600" : "",
          isTransitioning ? "transitioning" : "",
          "first:mr-5",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default CustomNavLink;
