import "./global.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";

const About = lazy(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About })),
);
const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects })),
);
const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({ default: m.Experience })),
);
const Services = lazy(() =>
  import("@/components/sections/Services").then((m) => ({ default: m.Services })),
);
const Process = lazy(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process })),
);
const Certifications = lazy(() =>
  import("@/components/sections/Certifications").then((m) => ({
    default: m.Certifications,
  })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);

function SectionFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Muhammad Aqib Aziz — Frontend Developer | React & TypeScript</title>
        <meta
          name="description"
          content="Muhammad Aqib Aziz — Premium frontend developer specializing in React, TypeScript, Tailwind CSS, and modern UI/UX. Available for remote work."
        />
        <meta
          name="keywords"
          content="Muhammad Aqib Aziz, frontend developer portfolio, React developer, TypeScript, Tailwind CSS, remote frontend developer"
        />
        <meta name="theme-color" content="#050816" />
        <meta property="og:title" content="Muhammad Aqib Aziz — Frontend Developer" />
        <meta
          property="og:description"
          content="Building fast, scalable, and pixel-perfect web experiences with React and modern UI engineering"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aqib-portfolio.com" />
        <meta property="og:image" content="/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Muhammad Aqib Aziz — Frontend Developer" />
        <meta
          name="twitter:description"
          content="Premium frontend developer building pixel-perfect web experiences"
        />
        <link rel="canonical" href="https://aqib-portfolio.com" />
        <link rel="manifest" href="/manifest.json" />
      </Helmet>

      <LoadingScreen isLoading={isLoading} />
      <ScrollProgressBar />
      <CustomCursor />

      <SmoothScrollProvider>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Services />
            <Process />
            <Certifications />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </SmoothScrollProvider>
    </HelmetProvider>
  );
};

export default App;
