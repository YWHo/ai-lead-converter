import React from "react";

function LandingPageFooter() {
  return (
    <div className="border-t border-gray-200 bg-white px-5 py-4 text-right">
      <span className="text-gray-600">Contact: </span>
      <span className="font-bold text-purple-500">
        <a href="mailto:demo-no-reply@example.com">demo@example.com</a>
      </span>
      <br />
      <span className="font-light text-gray-400 text-sm">
        (Note: not real email; Credit: brandonhancock.io/ai_lead_magnet)
      </span>
    </div>
  );
}

export default LandingPageFooter;
