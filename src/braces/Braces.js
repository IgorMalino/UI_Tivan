import React from "react";

import "./braces.css";

const Braces = () => {
  return (
    <div className="braces">
      <div style={{ margin: "-1px" }} className="inner_Braces">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
          <defs>
            <lineargradient id="glowInner" x1="0" x2="0" y1="0" y2="1">
              <stop className="svg-stop" offset="0%" stopColor="red" />
              <stop
                className="svg-stop svg-stop-fade"
                offset="10%"
                stopColor="red"
              />
              <stop
                className="svg-stop svg-stop-fade"
                offset="90%"
                stopColor="red"
              />
              <stop className="svg-stop" offset="100%" stopColor="red" />
            </lineargradient>
            <lineargradient id="linearInner">
              <stop className="svg-stop" offset="0%" />
              <stop className="svg-stop svg-stop-fade" offset="35%" />
              <stop className="svg-stop svg-stop-fade" offset="65%" />
              <stop className="svg-stop" offset="100%" />
            </lineargradient>
            <lineargradient id="linearOuter">
              <stop className="svg-stop svg-stop-fade" offset="0%" />
              <stop className="svg-stop" offset="50%" />
              <stop className="svg-stop svg-stop-fade" offset="100%" />
            </lineargradient>
          </defs>
          <circle
            cx="500"
            cy="500"
            r="380"
            stroke="url(#linearInner)"
            strokeWidth="0.25"
            fill="none"
            className="faded50"
            id="bracket-inner"
          />
          <circle
            cx="500"
            cy="500"
            r="499"
            stroke="url(#linearOuter)"
            strokeWidth="0.5"
            fill="none"
            className="faded50"
          />
          <circle
            cx="500"
            cy="500"
            r="490"
            stroke="url(#linearOuter)"
            strokeWidth="0.5"
            fill="none"
            className="faded75"
          />
          <circle
            style={{
              strokeDashoffset: "-615.952",
              strokeDasharray: "307.976px, 3089.76px",
            }}
            cx="500"
            cy="500"
            r="490"
            stroke="#00CCFF"
            strokeWidth="1"
            fill="none"
            className="svg-ring faded50"
            id="bracket-left"
          />
          <circle
            style={{
              strokeDashoffset: "-2155.83",
              strokeDasharray: "307.976px, 3089.76px",
            }}
            cx="500"
            cy="500"
            r="490"
            stroke="#00CCFF"
            strokeWidth="1"
            fill="none"
            className="svg-ring faded50"
            id="bracket-right"
          />
          <line
            style={{ visibility: "hidden", opacity: "0" }}
            fill="none"
            stroke="#00CCFF"
            x1="150"
            y1="150"
            x2="850"
            y2="850"
            className="cross"
            id="cross1"
          />
          <line
            style={{ visibility: "hidden", opacity: "0" }}
            fill="none"
            stroke="#00CCFF"
            x1="150"
            y1="850"
            x2="850"
            y2="150"
            className="cross"
            id="cross2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Braces;
