import React from "react";

import "./Anchor.css";

export interface IAnchorProps {
  text: string | React.ReactNode;
  href: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  color?: string;
  target?: string;
}

const Anchor = ({ text, href, isLoading = false, target, isDisabled, color }: IAnchorProps) => {
  return (
    <a
      className="anchor"
      target={target}
      href={href}
      style={{
        pointerEvents: isLoading ? "none" : "all",
        cursor: isLoading || isDisabled ? "not-allowed" : "pointer",
        color: color,
      }}
    >
      {text}
    </a>
  );
};

export default Anchor;
