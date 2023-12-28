import c from 'classnames';
import React from 'react';
import {NavLink} from 'react-router-dom';

interface MenuItemProps {
    route: string;
    label: React.ReactNode | string;
    icon: string;
    disabled?: boolean;
}

export const SidebarMenuItem = ({route, label, icon, disabled = false}: MenuItemProps) => {
    return (
        <li className="mr-0.5 md:mb-0.5 md:mr-0">
            <NavLink
                to={route}
                className={c(
                    'block',
                    'px-2.5',
                    'py-2',
                    'rounded',
                    'whitespace-nowrap',
                    'text-sm',
                    'font-medium',
                    'hover:text-slate-700',
                    {'pointer-events-none': disabled},
                )}
            >
                
                <i className={c('fa-solid', `fa-${icon}`)} /> {label}
            </NavLink>
        </li>
    );
}
