import React from 'react';
import './style.css'


function Modal(props) {
    return (
        <div className='modalPage'>
            <div className='overlay'></div>
            <div className='modal'>
                {props.displayButton}
                {props.displayHeading}
                {/* {
                    (props.displayHeading) ? (
                        <header>
                            
                        </header>
                    ) : null
                    (props.displayHeading && props.displayButton) ? (
                        <header>
                            {props.displayButton}
                            {props.displayHeading}
                        </header>
                    ) : null
                } */}
                <div>
                    {props.children}
                </div>
            </div>
        </div>

    )
}

export default Modal