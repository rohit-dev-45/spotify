import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ui } from "@/lib/styles";
import Link from "next/link";
import React from "react";

const Register = () => {
    return (
        <>
            <header className="flex flex-col gap-2 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-spotify-green-bright">
                    Join Free
                </p>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Create Your Spotify Account
                </h1>
                <p className="text-sm text-text-subdued">
                    It Only Takes a Moment. No Credit Card, No Upgrades - Just
                    Music.
                </p>
            </header>

            <OAuthButtons />

            <div
                role="separator"
                className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-subdued"
            >
                <span className={ui.authDividerLine} />
                Or Sign Up With Email
                <span className={ui.authDividerLine} />
            </div>

            <RegisterForm />

            <p className="text-center text-sm text-text-subdued">
                Already Have An Account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-white underline-offset-4 transition hover:text-spotify-green-bright hover:underline"
                >
                    Log In
                </Link>
            </p>
        </>
    );
};

export default Register;
