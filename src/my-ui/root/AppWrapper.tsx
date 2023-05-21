"use client"

import { usePbAuthListener } from "@/state/hooks/usePbAuthListener";
import { Sidebar } from "./navigation/Sidebar";
import { PBUserRecord } from "@/state/user";
import { Toolbar } from "./navigation/Toolbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react";


interface AppWrapperProps {
    children: React.ReactNode
    user: PBUserRecord
}

export function AppWrapper({ children,user }: AppWrapperProps) {
    const [queryClient] = React.useState(() => new QueryClient())
    usePbAuthListener()

    return (
        <QueryClientProvider client={queryClient}>
        <div className='w-full h-screen flex flex-col md:flex-row  items-center justify-center'>
            <div className='w-full md:hidden h-14 flex items-center justify-start bg-secondary'>
            <Toolbar user={user}/>
            </div>
            <div className='md:w-[250px] hidden h-full md:flex flex-col items-center justify-center bg-secondary'>
                <Sidebar user={user}/>
            </div>
            <div className="w-full h-screen overflow-y-scroll">
                {children}
            </div>
  
            </div>

        </QueryClientProvider>
    );
}
