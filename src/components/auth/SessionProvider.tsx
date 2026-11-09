"use client";

import { Session } from "next-auth";
import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface Props {
    session: Session | null;
    children: ReactNode;
}

export function SessionProvider({ session, children }: Props) {
    return (
        <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
            {children}
        </NextAuthSessionProvider>
    );
}
