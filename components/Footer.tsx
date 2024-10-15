import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 absolute bottom-0 w-full bg-black text-white">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} All rights reserved. Commvault Pune
        </p>
      </div>
    </footer>
  );
};

export default Footer;
