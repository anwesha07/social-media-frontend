import React from 'react';

function Modal(props) {
  return (
    <>
      <div className="fixed inset-0 bg-gray opacity-50 pointer-event-auto" />
      <div className="bg-neutral-800 w-[96%] max-w-[500px] fixed max-h-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg z-50">
        <div className="py-4 text-gray-100 text-center relative border-b border-y-white/20">
          <h2 className="text-xl">{props.displayHeading}</h2>
          <div className="absolute right-[10px] top-[50%] -translate-y-1/2">
            {props.displayButton}
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Modal;
