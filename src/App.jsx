import React from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import MobileWarning from "./MobileWarning";
import Project from "./Project";
import P3Menu from "./P3Menu";
import VideoPage from "./VideoPage";
import ResumePage from "./ResumePage";
import PageTransition from "./PageTransition";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import MusicPlayer from "./MusicPlayer";

import "./App.css";

// ============================================================
// EXTERNAL VIDEO URLS
// ============================================================

const menuVideo = "";

// Replace these with your actual VideoToURL links
const main1 = "YOUR_MAIN1_VIDEO_URL";
const main2 = "YOUR_MAIN2_VIDEO_URL";
const main3 = "YOUR_MAIN3_VIDEO_URL";

// ============================================================
// MENU SCREEN
// ============================================================

function MenuScreen() {
  const navigate = useNavigate();

  return (
    <div id="menu-screen">
      <video
        src={menuVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <P3Menu
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </div>
  );
}

// ============================================================
// ANIMATED ROUTES
// ============================================================

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >

        {/* ======================================================
            HOME
        ====================================================== */}

        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen />
            </PageTransition>
          }
        />

        {/* ======================================================
            ABOUT
        ====================================================== */}

        <Route
          path="/about"
          element={
            <PageTransition variant="about">
              <AboutMe />
            </PageTransition>
          }
        />

        {/* ======================================================
            RESUME
        ====================================================== */}

        <Route
          path="/resume"
          element={
            <PageTransition>
              <ResumePage src={main2} />
            </PageTransition>
          }
        />

        {/* ======================================================
            SOCIALS
        ====================================================== */}

        <Route
          path="/socials"
          element={
            <PageTransition variant="socials">
              <Socials />
            </PageTransition>
          }
        />

        {/* ======================================================
            PROJECT
        ====================================================== */}

        <Route
          path="/project"
          element={
            <PageTransition variant="projects">
              <Project />
            </PageTransition>
          }
        />

        {/* ======================================================
            PROJECTS
        ====================================================== */}

        <Route
          path="/projects"
          element={
            <PageTransition variant="projects">
              <Project />
            </PageTransition>
          }
        />

        {/* ======================================================
            VIDEO
        ====================================================== */}

        <Route
          path="/video"
          element={
            <PageTransition>
              <VideoPage />
            </PageTransition>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

// ============================================================
// APP
// ============================================================

export default function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [deviceChecked, setDeviceChecked] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);
      setDeviceChecked(true);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // ============================================================
  // WAIT FOR DEVICE CHECK
  // ============================================================

  if (!deviceChecked) {
    return null;
  }

  // ============================================================
  // MOBILE TERMINAL
  //
  // IMPORTANT:
  // AnimatedRoutes and MusicPlayer do NOT mount on mobile.
  // This prevents your videos and portfolio UI from loading.
  // ============================================================

  if (isMobile) {
    return <MobileWarning />;
  }

  // ============================================================
  // DESKTOP PORTFOLIO
  // ============================================================

  return (
    <>
      {/* ========================================================
          ROUTES
      ======================================================== */}

      <AnimatedRoutes />

      {/* ========================================================
          GLOBAL MUSIC PLAYER

          This is the ONLY MusicPlayer instance.

          It stays outside Routes and AnimatePresence so it
          remains mounted while navigating between pages.
      ======================================================== */}

      <MusicPlayer />
    </>
  );
}