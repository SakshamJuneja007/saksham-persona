import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import menuVideo from "./assets/Mainn.mp4";
import main1 from "./assets/main1.mp4";
import main2 from "./assets/main2.mp4";
import main3 from "./assets/main3.mp4";

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

          THESE CAN CHANGE / UNMOUNT FREELY
      ======================================================== */}

      <AnimatedRoutes />

      {/* ========================================================
          GLOBAL MUSIC PLAYER

          IMPORTANT:

          THIS IS THE ONLY <MusicPlayer /> INSTANCE IN THE
          ENTIRE APP.

          It lives here, as a sibling of AnimatedRoutes, OUTSIDE
          <Routes> and <AnimatePresence>. Because of that, it
          NEVER unmounts when the route changes — the audio
          element inside it keeps playing continuously.

          Do NOT import or render <MusicPlayer /> anywhere else
          (e.g. inside P3Menu, MenuScreen, or any page component).
          A second instance mounted inside a Route will die on
          navigation and will silently be the one you're actually
          interacting with, since it renders on top of this one —
          which is exactly the bug that caused audio to stop on
          route change.

          MusicPlayer itself decides (via useLocation) to show
          the visual controls only on "/", while the <audio>
          element itself always stays mounted regardless of route.
      ======================================================== */}

      <MusicPlayer />
    </>
  );
}