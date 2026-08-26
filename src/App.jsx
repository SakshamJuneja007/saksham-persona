import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

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

const menuVideo =
  "";

// Replace these with your actual VideoToURL links
const main1 =
  "YOUR_MAIN1_VIDEO_URL";

const main2 =
  "YOUR_MAIN2_VIDEO_URL";

const main3 =
  "YOUR_MAIN3_VIDEO_URL";

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
  return (
    <>
      {/* ========================================================
          ROUTES

          These can change / unmount freely.
      ======================================================== */}

      <AnimatedRoutes />

      {/* ========================================================
          GLOBAL MUSIC PLAYER

          IMPORTANT:

          THIS IS THE ONLY <MusicPlayer /> INSTANCE IN THE
          ENTIRE APP.

          It lives here, as a sibling of AnimatedRoutes,
          OUTSIDE <Routes> and <AnimatePresence>.

          Because of that, it NEVER unmounts when the route
          changes and the audio element keeps playing.

          Do NOT import or render <MusicPlayer /> anywhere else.

          MusicPlayer itself decides via useLocation() whether
          to show the visual controls on "/".

          The audio element remains mounted across routes.
      ======================================================== */}

      <MusicPlayer />
    </>
  );
}