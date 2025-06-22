import React from 'react'
import Container from '../helper/Container'
import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { BiCertification, BiSelectMultiple } from 'react-icons/bi'
import Title from '../helper/Title'

const Features = () => {
  return (
    <div>
      <Container>
        <div className=" flexCol gap-6">
          {/* title */}
          <Title
            title1={"Few Steps To Your New Home"}
            title2={"This Is How It Can Be"}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <Item
              icon={
                <MdOutlineQuestionAnswer className="text-[50px] mb-1 text-primary" />
              }
              title={"Answer Questions"}
              desc={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem labore, perferendis quia nostrum at repellat!"
              }
            />
            <Item
              icon={
                <BiSelectMultiple className="text-[50px] mb-1 text-primary" />
              }
              title={"Select Property"}
              desc={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem labore, perferendis quia nostrum at repellat!"
              }
            />
            <Item
              icon={
                <BiCertification className="text-[50px] mb-1 text-primary" />
              }
              title={"Enjoy Living"}
              desc={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem labore, perferendis quia nostrum at repellat!"
              }
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

const Item = ({icon, title, desc}) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {icon}
      <h4 className="text-[18px] font-bold">{title}</h4>
      <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default Features