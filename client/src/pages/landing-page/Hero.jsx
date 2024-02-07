import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              BSIT ShareHub
            </h1>

            <h1 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-3xl">
              Empowering through Seamless File Sharing
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/signin">
                <a
                  className="block w-full rounded border border-orange-600 bg-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                  href="/get-started"
                >
                  Get Started
                </a>
              </Link>

              <a
                className="block w-full rounded border border-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
