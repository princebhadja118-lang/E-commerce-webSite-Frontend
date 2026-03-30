import React from "react";

const navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Colored Email Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Colored Email Envelope Icon */}
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="2"
            fill="#4285F4"
            stroke="#4285F4"
          />
          <path
            d="M22 7L12 13L2 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span>Contact Us</span>
      </div>
    </nav>
  );
};

export default navbar;
