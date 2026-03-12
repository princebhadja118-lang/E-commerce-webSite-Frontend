import React from "react";

const About = () => {
  return (
    <div className="mb-5 md:m-5">
      <div className="md:max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-12 lg:h-250">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          <span className="underline">ABOUT</span>
          <span className="text-red-500"> US</span>
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed md:text-xl">
          <p>
            <span className="font-bold text-red-500">RK Polyplast</span> is a
            trusted name in the field of agrochemical packaging, known for
            delivering superior packaging solutions that combine functionality,
            durability, and design excellence. Established with the vision of
            providing innovative packaging for the agriculture and chemical
            sectors, we have grown into a leading manufacturer serving clients
            across domestic and international markets.
          </p>

          <p>
            With a strong focus on quality and safety, we produce packaging that
            meets the stringent demands of fertilizers, pesticides, herbicides,
            fungicides, and other agrochemical products. Our solutions are
            engineered to be leak-proof, UV-resistant, tamper-evident, and
            chemically compatible, ensuring the safe storage and transportation
            of agricultural inputs.
          </p>

          <p>
            Our state-of-the-art manufacturing facility is equipped with
            advanced technology and quality control systems, allowing us to
            consistently meet industry standards and deliver customized
            solutions. Based on client needs. From small-volume packaging to
            bulk containers, we offer a comprehensive range of bottle sizes and
            designs to suit various product requirements. What sets RK Polyplast
            apart is our customer-centric approach. We work closely with our
            clients to understand their challenges and offer packaging that not
            only safeguards their products but also enhances shelf appeal
            through smart design, vibrant printing, and thoughtful branding
            elements.
          </p>

          <p>
            At <span className="font-bold text-red-500">RK Polyplast</span>,
            sustainability is also a growing focus. We are actively exploring
            eco-friendly materials and recyclable solutions to reduce our
            environmental footprint and support a more sustainable future for
            agriculture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
