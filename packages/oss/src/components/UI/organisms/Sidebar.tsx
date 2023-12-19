import React from 'react';
import { Transition } from 'react-transition-group';
import { Flex, Text, Button } from '@radix-ui/themes';
import {useSidebarStore } from '@/store/sidebarStore';
import Logo from "@/assets/images/featured-controller.png";

import {SidebarMenuItem} from '../molecules/SidebarMenuItem'

interface MenuItem {
    route: `/${string}`;
    label: React.ReactNode;
    icon: string;
    disabled?: boolean;
}

interface SidebarProps {
    title: string;
    items: MenuItem[];
}

export const  Sidebar = ({title, items}: SidebarProps) => {

    const {sidebarOpen} = useSidebarStore();
    const duration = 100;

   
    const defaultStyle = {
        transition: 'transform 0.5s',
        visibility: 'visible',
        width: '300px'
    };

    const transitionStyles = {
        entering: { width: 0 },
        entered: { transform: 'translate3d(0, 0, 0)', 
        width: '300px'},
        exiting: { transform: 'translate3d(-100%, 0, 0)' },
        exited: { width: 0 ,transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden'},
    };
    return (
        <>
            <Transition in={sidebarOpen} timeout={duration}>
            {(state) => (
                <div
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                >
                    <div className="h-full no-scrollbar flex flex-nowrap border-slate-500 px-3 py-6 md:border-r">
                        <div>
                            {/* Evo primera jednog za radix */}
                        <Flex
                            align="center"
                            gap="2"
                            justify="between"
                            px="6"
                            py="2">
                            <img src={Logo} alt="Logo" width="40" />Oss Project</Flex>
                            <div className="my-3 text-xs font-semibold uppercase text-slate-400">{title}</div>
                            <ul className="submenu mr-3 flex flex-nowrap md:mr-0 md:block">
                                {items.map(({route, label, icon, disabled = false}) => (
                                    <SidebarMenuItem
                                        key={route}
                                        route={route}
                                        label={label}
                                        icon={icon}
                                        disabled={disabled}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
        </>
        
    );
}
