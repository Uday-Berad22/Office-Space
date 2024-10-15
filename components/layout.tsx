// "use client";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">

//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
