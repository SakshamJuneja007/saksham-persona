import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";



import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.png";

const CHARS = [char1, char2, char3];

const MAIN_IMAGES = [mainm, mainm2, mainf];
const bgVideo =
  "https://videotourl.com/videos/1787649295432-44bf7e72-7901-452e-8993-c2ceb12b7ee9.mp4";

const REVEAL_CONTENT = [
  {
    upper: [
      "name Saksham Juneja",
      "age: 19",
      "B.Tech in AI / ML",
      "Vaish College of Engineering",
      "MDU • 2024 — 2028",
    ],
    lower: "AI / ML student & developer",
  },
  {
    upper: [
      "I build things with AI.",
      "I enjoy experimenting with",
      "agents, computer vision & ML.",
      "Currently exploring LangGraph",
      "and multi-agent systems.",
    ],
    lower: "AI is where curiosity meets code",
  },
  {
    upper: [
      "Python • C++ • JavaScript",
      "React • Next.js • Tailwind",
      "OpenCV • TensorFlow • PyTorch",
      "LangChain • LangGraph",
      "RAG • Generative AI",
    ],
    lower: "always learning something new",
  },
];

const ROLES = [
  {
    text: "LEADER",
    color: "#e8c100",
    bg: "rgba(232,193,0,0.12)",
    border: "rgba(232,193,0,0.5)",
  },
  {
    text: "PARTY",
    color: "#4a8fff",
    bg: "rgba(74,143,255,0.12)",
    border: "rgba(74,143,255,0.5)",
  },
  {
    text: "PARTY",
    color: "#4a8fff",
    bg: "rgba(74,143,255,0.12)",
    border: "rgba(74,143,255,0.5)",
  },
];

const ITEMS = [
  {
    id: "about",
    label: "ABOUT ME",
    handle: "Saksham Juneja",
    href: "#",
    icon: "👤",
    barIcon: icon1,
    bars: 1,
    newBars: [0],
    counts: ["19"],
    links: [],
    stats: [
      {
        tag: "AGE",
        value: "19",
        color: "#e8c100",
      },
      {
        tag: "FIELD",
        value: "AI",
        color: "#bf94ff",
      },
    ],
  },
  {
    id: "funfacts",
    label: "FUN FACT ABOUT ME",
    handle: "Saksham",
    href: "#",
    icon: "✨",
    barIcon: icon2,
    bars: 5,
    newBars: [1, 2],
    counts: ["AI", "ML", "CV", "RAG", "AG"],
    links: [],
    stats: [
      {
        tag: "FOL",
        value: "AI",
        color: "#e1306c",
      },
      {
        tag: "PST",
        value: "ML",
        color: "#f77737",
      },
    ],
  },
  {
    id: "skills",
    label: "WIRED FACT ABOUT ME",
    handle: "Developer",
    href: "#",
    icon: "⚡",
    barIcon: icon3,
    bars: 7,
    newBars: [0, 3, 5, 6],
    counts: ["PY", "CPP", "JS", "AI", "CV", "RAG", "AG"],
    links: [],
    stats: [
      {
        tag: "SKL",
        value: "AI",
        color: "#00f2ea",
      },
      {
        tag: "DEV",
        value: "∞",
        color: "#ff0050",
      },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActive((i) => Math.max(0, i - 1));

        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActive((i) =>
          Math.min(ITEMS.length - 1, i + 1)
        );

        return;
      }

      /*
       * ENTER / RIGHT ARROW
       * Opens the panel.
       */
      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();

        setRevealed(true);

        return;
      }

      /*
       * LEFT ARROW
       */
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        if (revealed) {
          setRevealed(false);
        } else {
          navigate(-1);
        }

        return;
      }

      /*
       * ESC
       */
      if (e.key === "Escape") {
        e.preventDefault();

        if (revealed) {
          setRevealed(false);
        } else {
          navigate(-1);
        }

        return;
      }

      /*
       * BACKSPACE
       */
      if (e.key === "Backspace") {
        e.preventDefault();

        if (revealed) {
          setRevealed(false);
        } else {
          navigate(-1);
        }

        return;
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate, revealed]);

  return (
    <div id="menu-screen">

      {/* ================= VIDEO ================= */}

      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ================= PAGE GRAPHICS ================= */}

      {!revealed && (
        <>
          <div className="about-page-title">
            <div className="about-title-small">
              PERSONA // PROFILE
            </div>

            <div className="about-title-main">
              ABOUT
            </div>

            <div className="about-title-main about-title-red">
              ME
            </div>

            <div className="about-title-line" />
          </div>

          <div className="about-side-text">
            <span>PROFILE</span>
            <span>01 — 03</span>
          </div>

          <div className="about-corner">
            <span>AI / ML</span>
            <span>STUDENT</span>
            <span>DEVELOPER</span>
          </div>

          <div className="about-cross about-cross-1">
            +
          </div>

          <div className="about-cross about-cross-2">
            +
          </div>

          <div className="about-number">
            01
          </div>

          <div className="about-grid" />
        </>
      )}

      {/* ================= REVEAL DIM ================= */}

      {revealed && (
        <div
          key={`dim-${active}`}
          className="sc-dim"
        />
      )}

      {/* ================= REVEAL PANEL ================= */}

      {revealed && (
        <div
          key={`panel-${active}`}
          className={`sc-reveal-panel${
            mounted ? " mounted" : ""
          }`}
        >
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div
                className="sc-reveal-upper-line"
                key={line}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="sc-reveal-lower-bar">
            {REVEAL_CONTENT[active].lower}
          </div>
        </div>
      )}

      {/* ================= RIGHT NAV ================= */}

      {revealed && (
        <div
          key={`nav-${active}`}
          className="sc-right-nav"
        >
          <span className="sc-nav-arrow left">
            ◄
          </span>

          <span className="sc-nav-btn">
            LB
          </span>

          <span className="sc-nav-dot" />

          <span className="sc-nav-btn">
            RB
          </span>

          <span className="sc-nav-arrow right">
            ►
          </span>
        </div>
      )}

      {/* ================= PORTRAIT ================= */}

      {revealed && (
        <div
          key={`portrait-${active}`}
          className={`sc-main-portrait-shell${
            mounted ? " mounted" : ""
          }`}
        >
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}

      {/* ================= STYLES ================= */}

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300;400;500;700&display=swap');

        * {
          box-sizing: border-box;
        }

        /* =========================================================
           SCREEN
        ========================================================= */

        #menu-screen {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #000;
          isolation: isolate;
        }

        #menu-screen > video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        /* =========================================================
           GLOBAL SCREEN TEXTURE
        ========================================================= */

        #menu-screen::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;

          background:
            linear-gradient(
              rgba(0,0,0,0.08) 50%,
              rgba(255,255,255,0.015) 50%
            );

          background-size: 100% 4px;

          mix-blend-mode: overlay;
          opacity: 0.32;
        }

        #menu-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;

          background:
            radial-gradient(
              circle at center,
              transparent 35%,
              rgba(0,0,0,0.42) 100%
            );
        }

        /* =========================================================
           ABOUT PAGE TITLE
        ========================================================= */

        .about-page-title {
          position: absolute;
          top: 5vh;
          right: 5vw;

          width: 420px;

          z-index: 7;

          pointer-events: none;

          transform: rotate(-6deg);

          animation:
            about-title-in
            0.9s
            cubic-bezier(0.22,1,0.36,1)
            both;
        }

        @keyframes about-title-in {

          0% {
            opacity: 0;
            transform:
              translateX(80px)
              rotate(-12deg)
              skewX(-8deg);
          }

          100% {
            opacity: 1;
            transform:
              translateX(0)
              rotate(-6deg)
              skewX(0);
          }
        }

        .about-title-small {
          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 18px;

          letter-spacing: 7px;

          color: #fff;

          margin-left: 12px;

          opacity: 0.75;

          text-shadow:
            3px 3px 0 #000;
        }

        .about-title-main {
          position: relative;

          font-family:
            "Anton",
            sans-serif;

          font-size: clamp(90px, 11vw, 190px);

          line-height: 0.72;

          letter-spacing: -7px;

          color: #fff;

          text-align: right;

          -webkit-text-stroke: 3px #000;

          paint-order: stroke fill;

          text-shadow:
            10px 10px 0 #000;

          transform: skewX(-8deg);
        }

        .about-title-red {
          color: #d63232;

          margin-right: 36px;

          text-shadow:
            8px 8px 0 #000,
            14px 14px 0 rgba(255,255,255,0.15);

          -webkit-text-stroke: 2px #000;
        }

        .about-title-line {
          position: relative;

          width: 78%;

          height: 8px;

          margin-top: 24px;

          margin-left: auto;

          background: #d63232;

          transform: skewX(-25deg);

          box-shadow:
            8px 8px 0 #000;
        }

        .about-title-line::after {
          content: "";

          position: absolute;

          right: -22px;
          top: 0;

          width: 16px;
          height: 100%;

          background: #fff;
        }

        /* =========================================================
           SIDE TEXT
        ========================================================= */

        .about-side-text {
          position: absolute;

          left: 28px;
          top: 48%;

          z-index: 7;

          display: flex;

          flex-direction: column;

          gap: 8px;

          transform:
            rotate(-90deg)
            translateX(-50%);

          transform-origin: left top;

          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 15px;

          letter-spacing: 5px;

          color: rgba(255,255,255,0.72);

          text-shadow:
            2px 2px 0 #000;

          pointer-events: none;
        }

        .about-side-text span:first-child {
          color: #d63232;
        }

        /* =========================================================
           CORNER INFORMATION
        ========================================================= */

        .about-corner {
          position: absolute;

          right: 28px;
          bottom: 30px;

          z-index: 7;

          display: flex;

          gap: 12px;

          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 13px;

          letter-spacing: 3px;

          color: rgba(255,255,255,0.7);

          pointer-events: none;
        }

        .about-corner span {
          padding: 4px 8px;

          border-left:
            2px solid #d63232;

          background:
            rgba(0,0,0,0.45);
        }

        /* =========================================================
           DECORATIVE CROSSES
        ========================================================= */

        .about-cross {
          position: absolute;

          z-index: 7;

          color: #fff;

          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 30px;

          opacity: 0.55;

          pointer-events: none;

          text-shadow:
            2px 2px 0 #000;
        }

        .about-cross-1 {
          top: 14vh;
          left: 47vw;

          animation:
            cross-pulse
            2s
            ease-in-out
            infinite;
        }

        .about-cross-2 {
          bottom: 22vh;
          left: 55vw;

          animation:
            cross-pulse
            2.4s
            ease-in-out
            infinite;
        }

        @keyframes cross-pulse {

          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        /* =========================================================
           BIG NUMBER
        ========================================================= */

        .about-number {
          position: absolute;

          left: 50px;
          bottom: 38px;

          z-index: 7;

          font-family:
            "Anton",
            sans-serif;

          font-size: 90px;

          line-height: 0.8;

          color: transparent;

          -webkit-text-stroke:
            2px rgba(255,255,255,0.5);

          transform:
            skewX(-10deg);

          pointer-events: none;
        }

        /* =========================================================
           GRID
        ========================================================= */

        .about-grid {
          position: absolute;

          inset: 0;

          z-index: 2;

          pointer-events: none;

          opacity: 0.08;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            );

          background-size:
            70px 70px;

          mask-image:
            linear-gradient(
              90deg,
              #000,
              transparent 70%
            );
        }

        /* =========================================================
           MENU ROOT
        ========================================================= */

        .sc-root {
          position: absolute;

          inset: 0;

          z-index: 8;

          pointer-events: none;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          justify-content: center;

          gap: 6px;

          padding-left: 0;
        }

        /* =========================================================
           DIM
        ========================================================= */

        .sc-dim {
          position: absolute;

          inset: 0;

          z-index: 12;

          background:
            rgba(40,45,54,0.68);

          pointer-events: none;

          animation:
            sc-dim-in
            0.32s
            ease-out;
        }

        @keyframes sc-dim-in {

          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        /* =========================================================
           REVEAL BAR ANIMATION
        ========================================================= */

        @keyframes sc-reveal-bar-in {

          0% {
            opacity: 0;

            transform:
              translateX(-120px)
              rotate(-20deg)
              scaleX(0.72);
          }

          60% {
            opacity: 0.96;

            transform:
              translateX(18px)
              rotate(-20deg)
              scaleX(1.03);
          }

          100% {
            opacity: 0.92;

            transform:
              translateX(0)
              rotate(-20deg)
              scaleX(1);
          }
        }

        /* =========================================================
           PORTRAIT ANIMATION
        ========================================================= */

        @keyframes sc-portrait-in {

          0% {
            opacity: 0;

            transform:
              translateX(78px)
              skewX(-8deg)
              scale(0.94);

            filter: blur(8px);
          }

          55% {
            opacity: 0.9;

            transform:
              translateX(-8px)
              skewX(-8deg)
              scale(1.015);

            filter: blur(0);
          }

          100% {
            opacity: 0.96;

            transform:
              translateX(0)
              skewX(-8deg)
              scale(1);

            filter: blur(0);
          }
        }

        /* =========================================================
           ARROWS
        ========================================================= */

        @keyframes sc-arrow-left {

          0%,
          100% {
            transform: translateX(0);
            opacity: 1;
          }

          50% {
            transform: translateX(-5px);
            opacity: 0.4;
          }
        }

        @keyframes sc-arrow-right {

          0%,
          100% {
            transform: translateX(0);
            opacity: 1;
          }

          50% {
            transform: translateX(5px);
            opacity: 0.4;
          }
        }

        /* =========================================================
           MAIN PORTRAIT
        ========================================================= */

        .sc-main-portrait-shell {
          position: absolute;

          top: -20px;
          right: -3vw;

          z-index: 13;

          pointer-events: none;

          width: 38vw;
          height: 105vh;

          overflow: hidden;

          opacity: 0;

          transform:
            translateX(24px)
            skewX(-8deg)
            scale(0.98);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .sc-main-portrait-shell.mounted {
          opacity: 0.96;

          transform:
            translateX(0)
            skewX(-8deg)
            scale(1);

          animation:
            sc-portrait-in
            0.5s
            cubic-bezier(0.22,1,0.36,1);
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;

          object-fit: cover;

          object-position: top right;

          transform:
            skewX(8deg)
            scale(1.08);

          transform-origin: top right;
        }

        /* =========================================================
           REVEAL PANEL
        ========================================================= */

        .sc-reveal-panel {
          position: absolute;

          top: 44vh;
          left: -6vw;

          width: 88vw;
          height: 60vh;

          z-index: 12;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.98) 0%,
              rgba(243,246,252,0.98) 100%
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 88px) 100%,
              0 100%
            );

          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215,13,44,0.82),
            28px 0 0 rgba(255,255,255,0.26);

          opacity: 0;

          transform:
            translateX(-40px)
            rotate(-20deg);

          transform-origin: left bottom;

          transition:
            opacity 0.3s ease,
            transform 0.35s ease;
        }

        .sc-reveal-panel.mounted {
          opacity: 0.92;

          transform:
            translateX(0)
            rotate(-20deg);

          animation:
            sc-reveal-bar-in
            0.46s
            cubic-bezier(0.22,1,0.36,1);
        }

        .sc-reveal-panel::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 8px;

          background:
            linear-gradient(
              180deg,
              #e03d31 0%,
              #eb3333 100%
            );

          clip-path: inherit;
        }

        .sc-reveal-upper-bar {
          position: absolute;

          top: 10%;
          left: 0%;

          width: 100%;
          height: 40%;

          background:
            rgba(0,0,0,0.92);

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 22px) 100%,
              0 100%
            );

          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06);

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 10px;

          color: #fff;

          text-align: center;
        }

        .sc-reveal-upper-line {
          font-family:
            "Montserrat",
            sans-serif;

          font-weight: 300;

          font-size: 20px;

          letter-spacing: 0.5px;

          line-height: 1.15;
        }

        .sc-reveal-lower-bar {
          position: absolute;

          top: 58%;
          right: 0;

          width: 48%;
          height: 20%;

          background:
            rgba(0,0,0,0.92);

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 22px) 100%,
              0 100%
            );

          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06);

          display: flex;

          align-items: center;

          justify-content: flex-start;

          color: #fff;

          font-family:
            "Montserrat",
            sans-serif;

          font-weight: 300;

          font-size: 22px;

          letter-spacing: 0.4px;

          text-transform: lowercase;

          padding-left: 22px;
        }

        /* =========================================================
           RIGHT NAV
        ========================================================= */

        @keyframes sc-right-nav-pop {

          0% {
            opacity: 0;

            transform:
              scale(0.55)
              translateY(-10px);
          }

          65% {
            opacity: 1;

            transform:
              scale(1.1)
              translateY(2px);
          }

          100% {
            opacity: 1;

            transform:
              scale(1)
              translateY(0);
          }
        }

        .sc-right-nav {
          position: absolute;

          top: 10vh;
          left: 6vw;

          display: flex;

          align-items: center;

          gap: 6px;

          pointer-events: none;

          z-index: 14;

          transform:
            translateX(-40px)
            rotate(-20deg);

          transform-origin: left bottom;

          animation:
            sc-right-nav-pop
            0.38s
            cubic-bezier(0.22,1,0.36,1)
            both;
        }

        .sc-right-nav .sc-nav-btn {
          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 100px;

          letter-spacing: 3px;

          line-height: 1;

          user-select: none;

          color: #fff;

          -webkit-text-stroke: 2px #000;

          paint-order: stroke fill;

          background: none;

          border: none;

          padding: 0 6px;
        }

        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;

          border-radius: 999px;

          background: #111;

          margin: 0 10px;

          flex-shrink: 0;
        }

        .sc-right-nav .sc-nav-arrow {
          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 22px;

          color: #c4001a;

          display: inline-block;

          user-select: none;
        }

        .sc-right-nav .sc-nav-arrow.left {
          animation:
            sc-arrow-left
            0.8s
            ease-in-out
            infinite;
        }

        .sc-right-nav .sc-nav-arrow.right {
          animation:
            sc-arrow-right
            0.8s
            ease-in-out
            infinite;
        }

        /* =========================================================
           MENU BARS
        ========================================================= */

        .sc-bar {
          position: relative;

          width: 45vw;
          height: 64px;

          transition:
            height 0.3s
            cubic-bezier(0.22,1,0.36,1);

          background: #111;

          cursor: pointer;

          pointer-events: all;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 14px) 100%,
              0 100%
            );

          box-shadow:
            0 6px 24px rgba(0,0,0,0.65);

          z-index: 1;
        }

        .sc-bar-outer {
          position: relative;

          flex-shrink: 0;

          transform:
            translateX(-100%);

          transition:
            transform
            0.55s
            cubic-bezier(0.22,1,0.36,1);
        }

        .sc-bar-outer.active .sc-bar {
          height: 90px;
        }

        .sc-bar-outer.active .sc-bar-red {
          height: 90px;
        }

        .sc-bar-outer.mounted {
          transform:
            translateX(0);
        }

        .sc-bar-outer:nth-child(1) {
          transition-delay: 0ms;
        }

        .sc-bar-outer:nth-child(2) {
          transition-delay: 80ms;
        }

        .sc-bar-outer:nth-child(3) {
          transition-delay: 160ms;
        }

        /* =========================================================
           RED BAR
        ========================================================= */

        .sc-bar-red {
          position: absolute;

          top: 0;
          left: 0;

          width: 45vw;
          height: 64px;

          background: #c4001a;

          clip-path:
            polygon(
              50% 0,
              100% 0,
              100% 100%,
              calc(50% - 10px) 100%
            );

          transform:
            translateY(-7px);

          opacity: 0;

          transition:
            opacity
            0.2s
            ease;

          z-index: 0;

          pointer-events: none;
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
        }

        /* =========================================================
           WHITE FILL
        ========================================================= */

        .sc-bar-fill {
          position: absolute;

          inset: 0;

          width: 100%;

          background: #ffffff;

          clip-path:
            polygon(
              100% 0,
              100% 0,
              calc(100% - 32px) 100%,
              calc(100% - 32px) 100%
            );

          transition:
            clip-path
            0.35s
            cubic-bezier(0.22,1,0.36,1);

          z-index: 0;
        }

        .sc-bar-outer.active .sc-bar-fill {
          clip-path:
            polygon(
              22% 0,
              100% 0,
              calc(100% - 14px) 100%,
              calc(22% + 138px) 100%
            );
        }

        /* =========================================================
           BAR SHADE
        ========================================================= */

        .sc-bar-shade {
          position: absolute;

          top: 0;
          bottom: 0;

          left: 73%;

          width: 6%;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0) 100%
            );

          z-index: 1;

          pointer-events: none;

          opacity: 0;

          transition:
            opacity
            0.35s
            ease;
        }

        .sc-bar-outer.active .sc-bar-shade {
          opacity: 1;
        }

        /* =========================================================
           BAR BOTTOM SHADOW
        ========================================================= */

        .sc-bar::after {
          content: "";

          position: absolute;

          bottom: 0;
          left: 0;
          right: 0;

          height: 6px;

          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.55) 100%
            );

          z-index: 10;

          pointer-events: none;
        }

        /* =========================================================
           BAR CONTENT
        ========================================================= */

        .sc-bar-content {
          position: relative;

          z-index: 2;

          height: 100%;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            0
            20px
            0
            20px;
        }

        /* =========================================================
           ROLE
        ========================================================= */

        .sc-role {
          display: flex;

          align-items: center;

          flex-shrink: 0;

          font-family:
            "Anton",
            sans-serif;

          font-size: 50px;

          letter-spacing: -2px;

          color: #ffffff;

          transform:
            rotate(-30deg);

          user-select: none;

          line-height: 1;

          padding:
            0
            16px
            0
            8px;

          text-shadow:
            4px 4px 0 #000;
        }

        /* =========================================================
           MAIN LABEL
        ========================================================= */

        .sc-main {
          flex: 1;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 3px;

          padding-left: 78px;
        }

        .sc-main-top {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .sc-icon {
          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 22px;

          width: 32px;

          text-align: center;

          flex-shrink: 0;

          color:
            rgba(255,255,255,0.15);

          transition:
            color
            0.2s
            ease;

          user-select: none;
        }

        .sc-bar-outer.active .sc-icon {
          color:
            rgba(255,255,255,0.25);
        }

        .sc-label {
          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 28px;

          letter-spacing: 4px;

          line-height: 1;

          color:
            rgba(255,255,255,0.85);

          transition:
            color
            0.2s
            ease;

          user-select: none;
        }

        .sc-bar-outer.active .sc-label {
          color: #111111;
        }

        /* =========================================================
           CHARACTER IMAGES
        ========================================================= */

        .sc-char {
          position: absolute;

          top: 0;
          left: 110px;

          height: 100%;

          width: auto;

          max-width: 160px;

          object-fit: cover;

          object-position: top;

          pointer-events: none;

          z-index: 3;

          clip-path:
            polygon(
              20px 0%,
              100% 0%,
              calc(100% - 20px) 100%,
              0% 100%
            );

          filter:
            drop-shadow(5px 0 0 rgba(0,0,0,0.4));
        }

        /* =========================================================
           FOOTER
        ========================================================= */

        .sc-footer {
          position: fixed;

          bottom: 20px;
          right: 28px;

          display: flex;

          flex-direction: column;

          align-items: flex-end;

          gap: 5px;

          font-family:
            "Bebas Neue",
            sans-serif;

          z-index: 14;

          opacity: 0;

          transition:
            opacity
            0.4s
            ease
            0.6s;
        }

        .sc-footer.mounted {
          opacity: 1;
        }

        .sc-footer-row {
          display: flex;

          align-items: center;

          gap: 8px;

          font-size: 13px;

          letter-spacing: 2px;

          color:
            rgba(255,255,255,0.4);
        }

        .sc-footer-key {
          border:
            1px solid
            rgba(255,255,255,0.25);

          border-radius: 3px;

          padding:
            1px
            6px;

          font-size: 11px;

          color: #fff;

          background:
            rgba(0,0,0,0.35);
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 900px) {

          .about-page-title {
            top: 4vh;
            right: 3vw;
            width: 320px;
          }

          .about-title-main {
            font-size: 95px;
          }

          .about-title-small {
            font-size: 14px;
          }

          .sc-bar {
            width: 58vw;
          }

          .sc-bar-red {
            width: 58vw;
          }

          .sc-label {
            font-size: 22px;
          }

          .sc-role {
            font-size: 38px;
          }

          .about-number {
            left: 25px;
            bottom: 25px;
            font-size: 65px;
          }

          .about-corner {
            right: 15px;
            bottom: 15px;
            gap: 5px;
            font-size: 10px;
          }
        }

      `}</style>

      {/* =========================================================
          MENU
      ========================================================= */}

      <div
        className="sc-root"
        role="navigation"
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`
              sc-bar-outer
              ${active === i ? "active" : ""}
              ${mounted ? "mounted" : ""}
            `}
            onClick={() => {
              setActive(i);
              setRevealed(true);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />

            <div className="sc-bar">

              <img
                className="sc-char"
                src={CHARS[i]}
                alt=""
              />

              <div className="sc-bar-fill" />

              <div className="sc-bar-shade" />

              <div className="sc-bar-content">

                <div className="sc-role">
                  {ROLES[i].text}
                </div>

                <div className="sc-main">

                  <div className="sc-main-top">

                    <div className="sc-label">
                      {item.label}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <div
        className={`sc-footer${
          mounted ? " mounted" : ""
        }`}
      >

        <div className="sc-footer-row">

          <span className="sc-footer-key">
            ↑↓
          </span>

          <span>
            SELECT
          </span>

        </div>

        <div className="sc-footer-row">

          <span className="sc-footer-key">
            ↵
          </span>

          <span>
            REVEAL
          </span>

        </div>

        <div className="sc-footer-row">

          <span className="sc-footer-key">
            ESC
          </span>

          <span>
            BACK
          </span>

        </div>

      </div>

    </div>
  );
}