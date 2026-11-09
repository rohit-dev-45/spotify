import { LoginForm } from "@/components/auth/LoginForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { ui } from "@/lib/styles";
import Link from "next/link";
import React, { Suspense } from "react";

const Login = () => {
    return (
        <>
            <header className="flex flex-col gap-2 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-spotify-green-bright">
                    Welcome Back
                </p>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Log In To Spotify
                </h1>
                <p className="text-sm text-text-subdued">
                    Pick Up Where You Left Off - Your Library Is Waiting.
                </p>
            </header>

            <OAuthButtons />

            <div
                role="separator"
                className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-subdued"
            >
                <span className={ui.authDividerLine} />
                Or Continue With Email
                <span className={ui.authDividerLine} />
            </div>

            <Suspense
                fallback={
                    <div className="h-64 animate-pulse rounded-xl bg-white/5" />
                }
            >
                <LoginForm />
            </Suspense>

            <p className="text-center text-sm text-text-subdued">
                Don't Have An Account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-white underline-offset-4 hover:text-spotify-green-bright hover:underline"
                >
                    Sign Up For Spotify
                </Link>
            </p>
        </>
    );
};

export default Login;
