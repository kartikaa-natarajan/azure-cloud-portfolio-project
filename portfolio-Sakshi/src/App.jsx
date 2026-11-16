import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SparkleCanvas from "./components/SparkleCanvas";

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 flex flex-col selection:bg-lavender-200 selection:text-lavender-900 relative">
      {/* Slow-mo Lavender Sparkles on Cursor Touch */}
      <SparkleCanvas />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
