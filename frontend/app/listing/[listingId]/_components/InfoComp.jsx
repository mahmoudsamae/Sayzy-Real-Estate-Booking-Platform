const InfoComp = ({ value, text, icon }) => {
  return (
    <span className="flexCol justify-center items-center">
      {icon}
      <p className="pt-2 font-medium text-[12px] text-gray-400">
        <span className="text-[16px] text-primary font-bold">{value}</span>{" "}
        {text}
      </p>
    </span>
  );
};

export default InfoComp
