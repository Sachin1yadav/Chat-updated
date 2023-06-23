const Option = ({ title, description, icon, style, click }) => {
    return (
      <button
        className={`flex gap-1 px-3 py-4 rounded-sm  ${style}`}
        onClick={click}
      >
        <div className="pr-2">
          <img src={icon} alt={title} className="w-[45px] h-[35px]"/>
        </div>
        <div className="flex flex-col  w-full scale-90">
          <p className="font-bold text-white text-start w-full ">{title}</p>
          <span className=" text-white text-xs text-start">{description}</span>
        </div>
      </button>
    );
  };

  export default Option;