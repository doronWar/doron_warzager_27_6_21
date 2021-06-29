import React from "react";

const SvgMapPin = (props) => (
    <svg width={40} height={40} viewBox="0 0 91 91" {...props}>
        <g fill="black" fillRule="evenodd" opacity={props.opacity}>

            <path
                stroke={props.color1 || "#FDFDFE"}
                strokeLinecap="round"
                strokeWidth={3}
                d="M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z    M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z"
            />
        </g>
    </svg>
);

export default SvgMapPin;


