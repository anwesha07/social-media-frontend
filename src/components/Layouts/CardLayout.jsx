import React from "react";

function CardLayout(props) {
  return (
    <div className="bg-[#ffff] w-[500px] rounded-[8px] shadow-md mb-[30px]">
      {props.children}
    </div>
  );
}

export default CardLayout;
