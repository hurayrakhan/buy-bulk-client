import React from "react";
import {
  ShieldCheckIcon,
  UsersIcon,
  EyeIcon,
  LightBulbIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import mission from "../assets/mission.webp";
import { Helmet } from "react-helmet";

const teamsData = [
  {
    name: "Hurayra Khan",
    role: "Founder & CEO",
    email: "hurayra@buybulk.com",
    address: "Dhaka, Bangladesh",
    image:
      "https://i.ibb.co.com/zh641sgL/de248a20-fe13-4e29-a4b9-a6a8244fcdda.jpg",
  },
  {
    name: "Maruf Khan",
    role: "Chief Technology Officer",
    email: "maruf@buybulk.com",
    address: "Chittagong, Bangladesh",
    image:
      "https://i.ibb.co.com/m5NNCL9T/1715741617155.jpg",
  },
  {
    name: "Jhankar Mahbub",
    role: "Senior Advisor",
    email: "jhankar@buybulk.com",
    address: "New York, USA",
    image:
      "https://i.ibb.co.com/BK4wZ0qn/467444869-10160351769061891-3964624160658220491-n.jpg",
  },
];

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Us | Buy&Bulk</title>
        <meta
          name="description"  
          content="Learn more about Buy&Bulk, our mission, vision, and the team behind the platform."
        />
      </Helmet>
      {/* Header */}
      <div className="bg-[url(https://i.ibb.co/6JTPTp5g/wave-haikei.png)] min-h-80 bg-cover  text-base-100 py-16 text-center flex flex-col justify-center">
        <h1 className="text-4xl font-bold">About Buy&Bulk</h1>
        <p className="mt-4 text-lg">
          Connecting bulk buyers with trusted suppliers — seamlessly and efficiently.
        </p>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20 bg-base-100">


        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Image Section */}
          <div className="flex-1 h-96 relative w-full rounded-lg overflow-hidden shadow-lg">
            <img
              src={mission}
              alt="Team working together"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 w-full space-y-6">
            <h2 className="text-3xl font-bold text-[#FF3F33] mb-6 text-center">
            Our Mission & Vision
          </h2>
            <div className="bg-base-300 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#FF3F33] mb-2 text-center">
                Our Mission
              </h3>
              <p className="text-gray-700 text-center">
                To bridge the gap between talent and opportunity by creating a transparent,
                efficient, and user-friendly platform that connects qualified candidates with
                their ideal employers.
              </p>
            </div>
            <div className="bg-base-300 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#FF3F33] mb-2 text-center">
                Our Vision
              </h3>
              <p className="text-gray-700 text-center">
                To become the world's most trusted job marketplace, where every professional
                can find meaningful work and every organization can build exceptional teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-base-200 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#FF3F33] mb-4">Our Story</h2>
        <p className="text-center mb-12 text-gray-600">
          The journey of building the future of wholesale
        </p>

        <div className="relative border-l-3 border-[#FF3F33] ml-4">
          {[
            {
              year: "2023",
              title: "The Beginning",
              desc: "Buy&Bulk was founded to simplify bulk sourcing for retailers and suppliers through trust and transparency.",
            },
            {
              year: "2023",
              title: "First 1,000 Users",
              desc: "We reached our first milestone with 1,000 registered users and 100+ successful B2B transactions.",
            },
            {
              year: "2024",
              title: "Platform Expansion",
              desc: "Rolled out AI-based recommendations, streamlined UX, and expanded into global supply chains.",
            },
          ].map((item, idx) => (
            <div key={idx} className="mb-12 ml-6 relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-[#FF3F33] rounded-full border-4 border-white shadow-md"></div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  {item.year}
                </span>
                <h3 className="mt-2 font-bold text-lg text-black">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-[#FF3F33] mb-10 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            {
              icon: ShieldCheckIcon,
              title: "Integrity & Trust",
              desc: "We operate with honesty and uphold the highest ethical standards.",
            },
            {
              icon: UsersIcon,
              title: "Customer First",
              desc: "Every decision we make starts with our customers' success.",
            },
            {
              icon: EyeIcon,
              title: "Transparency",
              desc: "Open processes, fair dealings, and clear communication always.",
            },
            {
              icon: LightBulbIcon,
              title: "Innovation",
              desc: "We constantly adapt and evolve to serve you better.",
            },
            {
              icon: HandRaisedIcon,
              title: "Collaboration",
              desc: "Together, we create greater value — teamwork fuels our growth.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] text-center"
            >
              <div className="flex justify-center mb-4">
                <value.icon className="h-10 w-10 text-[#FF3F33]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-[#FF3F33] mb-6 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamsData.map((member, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-[1.03] overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
                <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                <p className="text-sm text-gray-500">{member.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
<section className="py-12 px-6 md:px-20 bg-white">
  <h2 className="text-3xl font-semibold text-[#FF3F33] mb-10 text-center">
    What Our Customers Say
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Card 1 */}
    <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Arjun"
          className="w-14 h-14 rounded-full object-cover border-2 border-[#FF3F33]"
        />
        <div>
          <h3 className="font-semibold text-lg">Arjun</h3>
          <p className="text-sm text-gray-500">Retailer</p>
        </div>
      </div>
      <p className="text-gray-700 italic">
        "Buy&Bulk has helped streamline our sourcing process. It's fast, trustworthy, and affordable!"
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Fatima"
          className="w-14 h-14 rounded-full object-cover border-2 border-[#FF3F33]"
        />
        <div>
          <h3 className="font-semibold text-lg">Fatima</h3>
          <p className="text-sm text-gray-500">Supplier</p>
        </div>
      </div>
      <p className="text-gray-700 italic">
        "We've expanded our business thanks to the access and exposure we got through Buy&Bulk."
      </p>
    </div>
  </div>
</section>

    </div>
  );
};

export default About;
