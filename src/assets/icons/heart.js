const SvgHeart = props =>{
    const { color = "#000", fillColorNone = "none", fillColorRead="red", width = "30.239px", height ="30.239px", isLiked=false } = props;
    return (
        <svg
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 241.59736 220.05746"
            // style="enable-background:new 0 0 30.239 30.239;"
        >
            <g
                id="layer1"
                transform="translate(-175.32265,-1696.4765)">
                <path
                    stroke={isLiked? fillColorRead : color}
                    opacity="0.98000004"
                    fill={isLiked? fillColorRead : fillColorNone}
                    strokeWidth="10"
                    strokeLinecap ="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="4"
                    strokeOpacity="1"
                    strokeDasharray="none"
                    // stroke-dashoffset="0"
                    d="m 243.45243,1708.9786 c -26.9341,0.2312 -51.58009,21.4767 -55.08178,48.2939 -3.11346,23.844 7.32949,47.3995 23.96855,64.2142 27.5148,27.8054 61.22631,49.7939 83.44686,82.5473 4.39089,-4.6889 9.27818,-12.0655 14.22742,-17.529 25.22951,-27.8509 58.1653,-48.0133 80.86454,-78.1545 17.17546,-22.8065 19.10279,-58.1138 -0.53802,-80.4051 -18.24975,-20.7125 -51.76012,-25.1712 -74.36972,-9.2543 -8.22594,5.791 -15.27469,13.3707 -19.93251,22.3123 -10.05314,-19.3195 -30.53412,-32.2142 -52.58534,-32.0248 z"
                    id="path3925-8"
                />
            </g>
        </svg>
    )

}

export default SvgHeart;
