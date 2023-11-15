import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
}

function CustomNavLink({ to, children, className }: Props) {
  return (
    <NavLink
      to={to}
      className={({
        isActive,
        isPending,
        isTransitioning
      }: {
        isActive: boolean;
        isPending: boolean;
        isTransitioning: boolean;
      }) =>
        [
          isPending ? 'pending' : '',
          isActive ? 'text-blue-600' : '',
          isTransitioning ? 'transitioning' : '',
          'first:mr-5',
          className
        ].join(' ')
      }>
      {children}
    </NavLink>
  );
}

export default CustomNavLink;
