import { Metadata } from "next";
import Header1 from "@/components/headers/Header1";
import ParallaxBackground from "@/components/backgrounds/ParallaxBackground";
import Profile from "@/components/profile/Profile";
import Intro from "@/components/intro/Intro";
import About from "@/components/about/About";
import Tools from "@/components/resume/Tools";
import Education from "@/components/resume/Education";
import Experience from "@/components/resume/Experience";
import Portfolio from "@/components/portfolio/Portfolio";
import Certifications from "@/components/certifications/Certifications";
import ResumeHeading from "@/components/resume/ResumeHeading";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Vinodkumar Chavan | Embedded Software Engineer",
  description:
    "Professional portfolio of Vinodkumar Chavan, an Embedded Software Engineer with experience at TUCKIT Lockers and knowledge of AWS, Python, Linux, SQL, software development, testing, debugging, and cloud computing.",
};

export default function Home() {
  return (
    <>
      <Header1 />
      <ParallaxBackground />
      <Profile profileImage="/img/avatars/vinodkumar-chavan.jpg" />
      <div id="content" className="content">
        <div className="content__wrapper">
          <Intro />
          <About />
          <Tools />
          <Education />
          <Experience />
          <Portfolio />
          <Certifications />
          <section id="resume" className="inner resume">
            <ResumeHeading />
          </section>
          <Contact />
        </div>
      </div>
    </>
  );
}
