import React from "react";

export default function Landing() {
    return (
        <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center">
            <div className="space-y-8">
                <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl">
                    <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Powered
                    </span>
                    <span className="block">By Intellect</span>
                    <span className="block">Driven By Values</span>
                </h1>
            </div>
        </section>
    );
}
