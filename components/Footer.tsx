"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-muted border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-black text-white text-center">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex-1 ">
            <span className=" font-bold">
              &copy; {new Date().getFullYear()} All rights reserved. ParkPoolX
              Inc.
            </span>
          </div>
        </motion.div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
            prefetch={false}
          >
            Terms
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
