import React from "react";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <section>
        <div className="flex items-center justify-center md:flex h-screen">
          <h1 className="text-white flex flex-col justify-center text-center">
            <span className="text-4xl font-extrabold" >
              The Ultimate <br /> Cryptocurrency Analysis Platform
            </span>
            <br />
            <span className="text-xl font-extrabold">
              Track Profits, Losses, and Market Trends
            </span>
          </h1>
        </div>
      </section>
    </div>
  );
}
