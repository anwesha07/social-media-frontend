import React from "react";

function CardLayout(props) {
  return (
    <div className="bg-black w-full max-w-[540px] rounded-[8px] shadow-lg p-4 h-[fit-content]">
      {props.children}
    </div>
  );
}

export default CardLayout;
