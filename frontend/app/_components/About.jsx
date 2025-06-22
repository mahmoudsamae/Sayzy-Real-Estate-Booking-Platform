import React from 'react'
import Container from '../helper/Container'
import Image from 'next/image'
import Title from '../helper/Title'
import { BiCheckCircle } from 'react-icons/bi'

const About = () => {
  return (
    <div id='about'>
      <Container>
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex-1 relative">
            <Image src={"/assets/about.png"} alt="about-image" fill />
          </div>
          <div className="flex-1">
            <Title
              title1={"Few Steps To Your New Home"}
              title2={"This Is How Easy It Can Be"}
            />
            <div className="mt-5 flexCol gap-2 ml-2 sm:ml-10">
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Access exclusive property listings
                </p>
              </div>
              <div className="flex items-center gap-1.5 ">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Expert advice from local real estate professionals
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Find your dream home in prime locations
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Seamless online property search experience
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Get personalized property recommendations
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Transparent and hassle-free transctions
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  24/7 customer support for all your inquiries
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <BiCheckCircle className="text-[13px] text-gray-400" />
                <p className="text-[13px] text-gray-400 font-medium">
                  Comprehensive market analysis and reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About