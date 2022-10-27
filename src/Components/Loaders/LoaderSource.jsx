import * as React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const LoaderSource = (props) => {
  const { currentColor } = useStateContext();

  return (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     style={{
    //       margin: "auto",
    //       background: "0 0",
    //       display: "block",
    //       shapeRendering: "auto",
    //     }}
    //     width={200}
    //     height={200}
    //     viewBox="0 0 100 100"
    //     preserveAspectRatio="xMidYMid"
    //     {...props}
    //   >
    //     <path
    //       fill="none"
    //       stroke={currentColor}
    //       strokeWidth={8}
    //       strokeDasharray="42.76482137044271 42.76482137044271"
    //       d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
    //       strokeLinecap="round"
    //       style={{
    //         transform: "scale(.8)",
    //         transformOrigin: "50px 50px",
    //       }}
    //     >
    //       <animate
    //         attributeName="stroke-dashoffset"
    //         repeatCount="indefinite"
    //         dur="1s"
    //         keyTimes="0;1"
    //         values="0;256.58892822265625"
    //       />
    //     </path>
    //   </svg>
    // );
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
      }}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <g transform="rotate(0 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9166666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(30 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8333333333333334s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(60 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5833333333333334s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(150 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4166666666666667s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(210 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.16666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(300 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.08333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(330 50 50)">
        <rect
          x="47"
          y="24"
          rx="3"
          ry="6"
          width="6"
          height="12"
          fill={currentColor}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
    </svg>
  );
};

export default LoaderSource;
