import React from "react";

function AboutUs() {
  return (
    <section className="bg-gray-700 text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div>
          <center>
            <h2 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              About Us
            </h2>
          </center>
        </div>
        <div>
          <p className="bg-white bg-clip-text text-2xl font-bold sm:text-2xl">
            BSIT ShareHub is a centralized platform designed to streamline the
            admissions process, improve efficiency, and empower informed
            decision-making. To revolutionize the admissions process at PUP
            Lopez Quezon for BSIT by providing a secure, organized, and
            collaborative web platform for document management, file sharing,
            and data-driven decision-making.
          </p>
        </div>
      </div>
    </section>
  );
}
export default AboutUs;
