import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Cookies from "./components/Cookies";

const pages = {
  home: {
    header_name: "About Us",
    header: "Recruiting Without Limits",
    subHeader: "Speed and Scale.",
    body: `We’re building a new model for recruitment. One that combines revenue sharing, a marketing engine, a competitive broker community, and an AI-driven learning platform. This is recruitment rewritten for the modern era.`,
  },
  community: {
    header: "Community",
    subHeader: "Connecting Brokers",
    body: "Imagine a place where brokers exchange insights, share leads, and grow together — powered by AI recommendations.",
  },
  ai: {
    header: "AI-Driven",
    subHeader: "Smarter Recruitment",
    body: "AI helps match candidates faster and better, learning from data and market trends to optimize every hire.",
  },
  privacy: {
    header: "Privacy Policy",
    subHeader: "Your Data. Your Rights.",
    body: `
          At EnergyRec, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.

          We collect personal and non-personal data to improve our services.
          We use cookies for analytics and functionality.
          We never sell your data. Only trusted third parties may access it to help operate our platform.
          You have rights to access, modify, or delete your data.
          Contact us at privacy@energyrec.com for questions.

          This policy may be updated periodically. Continued use of our services means you accept the terms.
    `,
  }
};

export default function App() {

const [page, setPage] = useState("home");

  return (
    <div
      style={{
        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
        color: "#111",
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem",
      }}
    >
      {/* NAVIGATION */}
      <Navbar pages={pages} page_name={page} page_key={setPage}/>

      {/* MAIN SECTION */}
      <Main pages={pages} page_name={page}/>
      
      {/* Cookies */}
      <Cookies page_name={page} onShowPrivacy={()=>{ setPage("privacy") }}/>
      
      {/* FOOTER */}
      <Footer page_key={setPage}/>
      
    </div>
  );
}
