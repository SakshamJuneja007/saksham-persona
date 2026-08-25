import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";


import newsign from "./assets/newsign.png";

import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

const CHARS = [char1, char2, char3];
const ICONS = [icon1, icon2, icon3];
const bgVideo =
  "https://videotourl.com/videos/1787648911296-2addd9a1-9d20-47ad-8c07-6dd19d1ba369.mp4";

const ROLES = [
  {
    text: "AI",
    color: "#e8c100",
  },
  {
    text: "DEV",
    color: "#4a8fff",
  },
  {
    text: "SOCIAL",
    color: "#e1306c",
  },
  {
    text: "MAIL",
    color: "#ffffff",
  },
];

const ITEMS = [
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "@sakshamjuneja007",
    href: "https://www.linkedin.com/in/sakshamjuneja007/",
    icon: "in",
    barIcon: icon1,
    bars: 1,
    newBars: [0],
    counts: ["PROFILE"],
    links: ["www.linkedin.com/in/sakshamjuneja007/"],
    stats: [
      {
        tag: "TYPE",
        value: "PRO",
        color: "#0a66c2",
      },
      {
        tag: "ID",
        value: "007",
        color: "#4a8fff",
      },
    ],
  },

  {
    id: "github",
    label: "GITHUB",
    handle: "@SakshamJuneja007",
    href: "https://github.com/SakshamJuneja007/",
    icon: "GH",
    barIcon: icon2,
    bars: 1,
    newBars: [0],
    counts: ["CODE"],
    links: ["github.com/SakshamJuneja007/"],
    stats: [
      {
        tag: "TYPE",
        value: "DEV",
        color: "#ffffff",
      },
      {
        tag: "ID",
        value: "007",
        color: "#9b9b9b",
      },
    ],
  },

  {
    id: "instagram",
    label: "INSTAGRAM",
    handle: "@saksham_juneja007",
    href: "https://www.instagram.com/saksham_juneja007/",
    icon: "IG",
    barIcon: icon3,
    bars: 1,
    newBars: [0],
    counts: ["SOCIAL"],
    links: ["instagram.com/saksham_juneja007/"],
    stats: [
      {
        tag: "TYPE",
        value: "IG",
        color: "#e1306c",
      },
      {
        tag: "ID",
        value: "007",
        color: "#f77737",
      },
    ],
  },

  {
    id: "email",
    label: "EMAIL",
    handle: "saksham.juneja007@gmail.com",
    href: "mailto:saksham.juneja007@gmail.com",
    icon: "@",
    barIcon: icon1,
    bars: 1,
    newBars: [0],
    counts: ["MAIL"],
    links: ["saksham.juneja007@gmail.com"],
    stats: [
      {
        tag: "TYPE",
        value: "MAIL",
        color: "#e8c100",
      },
      {
        tag: "ID",
        value: "007",
        color: "#ffffff",
      },
    ],
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left");

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);

    return () => clearTimeout(t);
  }, []);

  const openCurrent = () => {
    const item = ITEMS[active];

    if (item.id === "email") {
      window.location.href = item.href;
    } else {
      window.open(item.href, "_blank");
    }
  };

  const openInfo = () => {
    const item = ITEMS[active];

    if (item.id === "email") {
      window.location.href = item.href;
    } else {
      window.open(
        "https://" + item.links[activeInfoBar],
        "_blank"
      );
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      /*
       * ESC / BACKSPACE
       * Always go back from this page.
       */
      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
        return;
      }

      if (focus === "left") {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((i) => Math.max(0, i - 1));
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((i) =>
            Math.min(ITEMS.length - 1, i + 1)
          );
        }

        if (e.key === "ArrowRight") {
          e.preventDefault();
          setFocus("right");
          setActiveInfoBar(0);
        }

        if (e.key === "Enter") {
          e.preventDefault();
          openCurrent();
        }
      } else {
        const barCount = ITEMS[active].bars;

        if (e.key === "ArrowUp") {
          e.preventDefault();

          setActiveInfoBar((i) =>
            Math.max(0, i - 1)
          );
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();

          setActiveInfoBar((i) =>
            Math.min(barCount - 1, i + 1)
          );
        }

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setFocus("left");
        }

        if (e.key === "Enter") {
          e.preventDefault();
          openInfo();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () =>
      window.removeEventListener("keydown", onKey);
  }, [active, focus, activeInfoBar, navigate]);

  return (
    <div id="menu-screen">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="social-bg-video"
      />

      <div className="social-bg-overlay" />

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        * {
          box-sizing: border-box;
        }

        #menu-screen {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #050505;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ====================================================== */

        .social-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1) scale(1.02);
          z-index: 0;
          pointer-events: none;
        }

        .social-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,0.72) 0%,
              rgba(0,0,0,0.35) 42%,
              rgba(0,0,0,0.15) 100%
            );
        }

        /* =====================================================
           PAGE HEADING
        ====================================================== */

        .sc-page-heading {
          position: fixed;
          top: 42px;
          left: 52px;
          z-index: 30;

          pointer-events: none;

          display: flex;
          flex-direction: column;
          align-items: flex-start;

          animation:
            heading-in
            0.65s
            cubic-bezier(0.22,1,0.36,1)
            both;
        }

        @keyframes heading-in {
          from {
            opacity: 0;
            transform:
              translateX(-70px)
              skewX(-8deg);
          }

          to {
            opacity: 1;
            transform:
              translateX(0)
              skewX(-8deg);
          }
        }

        .sc-heading-small {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 6px;
          color: #c4001a;
          margin-left: 8px;
          line-height: 1;
        }

        .sc-heading-main {
          position: relative;

          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 8vw, 138px);
          line-height: 0.78;
          letter-spacing: -2px;

          color: #ffffff;

          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;

          text-shadow:
            8px 8px 0 #000;
        }

        .sc-heading-main::after {
          content: 'SOCIAL';

          position: absolute;
          left: 10px;
          top: 10px;

          color: transparent;

          -webkit-text-stroke: 1px rgba(255,255,255,0.18);

          z-index: -1;
        }

        .sc-heading-line {
          width: 220px;
          height: 5px;

          margin-top: 14px;

          background: #c4001a;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 12px) 100%,
              0 100%
            );

          box-shadow:
            7px 7px 0 #000;
        }

        .sc-heading-sub {
          margin-top: 10px;
          margin-left: 5px;

          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 4px;

          color: rgba(255,255,255,0.55);
        }

        /* =====================================================
           MAIN LIST
        ====================================================== */

        .sc-root {
          position: absolute;
          inset: 0;

          z-index: 10;

          pointer-events: none;

          display: flex;
          flex-direction: column;

          align-items: flex-start;
          justify-content: center;

          gap: 6px;

          padding-left: 0;
        }

        /* =====================================================
           EACH BAR
        ====================================================== */

        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;

          transform: translateX(-100%);

          transition:
            transform 0.55s
            cubic-bezier(0.22,1,0.36,1);
        }

        .sc-bar-outer.mounted {
          transform: translateX(0);
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

        .sc-bar-outer:nth-child(4) {
          transition-delay: 240ms;
        }

        .sc-bar {
          position: relative;

          width: 45vw;
          min-width: 650px;

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

        .sc-bar-outer.active .sc-bar {
          height: 90px;
        }

        /* =====================================================
           RED UNDERLAY
        ====================================================== */

        .sc-bar-red {
          position: absolute;

          top: 0;
          left: 0;

          width: 45vw;
          min-width: 650px;

          height: 64px;

          background: #c4001a;

          clip-path:
            polygon(
              50% 0,
              100% 0,
              100% 100%,
              calc(50% - 10px) 100%
            );

          transform: translateY(-7px);

          opacity: 0;

          transition:
            opacity 0.2s ease,
            height 0.3s ease;

          z-index: 0;

          pointer-events: none;
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
          height: 90px;
        }

        /* =====================================================
           WHITE FILL
        ====================================================== */

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
            clip-path 0.35s
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

        /* =====================================================
           SELECTED GLOW
        ====================================================== */

        .sc-bar-outer.active .sc-bar {
          box-shadow:
            8px 8px 0 #000,
            0 0 30px rgba(196,0,26,0.28);
        }

        /* =====================================================
           SHADE
        ====================================================== */

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
            opacity 0.35s ease;
        }

        .sc-bar-outer.active .sc-bar-shade {
          opacity: 1;
        }

        /* =====================================================
           BOTTOM SHADOW
        ====================================================== */

        .sc-bar::after {
          content: '';

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

        /* =====================================================
           CONTENT
        ====================================================== */

        .sc-bar-content {
          position: relative;

          z-index: 2;

          height: 100%;

          display: flex;

          align-items: center;
          justify-content: space-between;

          padding: 0 20px;
        }

        /* =====================================================
           ROLE
        ====================================================== */

        .sc-role {
          display: flex;
          align-items: center;

          flex-shrink: 0;

          font-family: 'Bebas Neue', sans-serif;

          font-size: 50px;
          letter-spacing: -2px;

          color: #ffffff;

          transform: rotate(-30deg);

          user-select: none;

          line-height: 1;

          padding:
            0 16px 0 8px;

          transition:
            color 0.2s ease;
        }

        .sc-bar-outer.active .sc-role {
          color: #111;
        }

        /* =====================================================
           MAIN LABEL
        ====================================================== */

        .sc-main {
          flex: 1;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;
        }

        .sc-main-top {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 22px;

          width: 32px;

          text-align: center;

          flex-shrink: 0;

          color: rgba(255,255,255,0.15);

          transition:
            color 0.2s ease,
            transform 0.2s ease;

          user-select: none;
        }

        .sc-bar-outer.active .sc-icon {
          color: rgba(0,0,0,0.35);
          transform: scale(1.08);
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 28px;

          letter-spacing: 4px;

          line-height: 1;

          color: rgba(255,255,255,0.85);

          transition:
            color 0.2s ease,
            letter-spacing 0.2s ease;

          user-select: none;
        }

        .sc-bar-outer.active .sc-label {
          color: #111111;
          letter-spacing: 5px;
        }

        /* =====================================================
           STATS
        ====================================================== */

        .sc-stats {
          display: flex;

          align-items: center;

          gap: 10px;

          padding-right: 24px;

          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;

          flex-direction: column;

          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;

          align-items: baseline;

          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 9px;

          letter-spacing: 1.5px;

          padding: 1px 4px;

          border-width: 1px;

          border-style: solid;

          line-height: 1.4;

          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 26px;

          font-style: italic;

          line-height: 1;

          color: #ffffff;

          letter-spacing: 1px;

          user-select: none;

          transition:
            color 0.2s ease;
        }

        .sc-bar-outer.active .sc-stat-num {
          color: #111111;
        }

        .sc-stat-bars {
          width: 100%;

          display: flex;

          flex-direction: column;

          gap: 1px;

          margin-top: 2px;
        }

        .sc-stat-bar-color {
          height: 3px;

          width: 100%;
        }

        .sc-stat-bar-black {
          height: 2px;

          width: 100%;

          background: #000;
        }

        /* =====================================================
           CHARACTER
        ====================================================== */

        .sc-char {
          transform: scaleX(-1);

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

          transition:
            filter 0.25s ease;
        }

        .sc-bar-outer.active .sc-char {
          filter:
            drop-shadow(5px 0 0 #c4001a);
        }

        /* =====================================================
           RIGHT NAV
        ====================================================== */

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
          position: fixed;

          top: 40px;
          right: 40px;

          display: flex;

          align-items: center;

          gap: 6px;

          pointer-events: none;

          z-index: 50;

          animation:
            sc-right-nav-pop
            0.38s
            cubic-bezier(0.22,1,0.36,1)
            both;
        }

        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;

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

        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 28px;

          letter-spacing: 3px;

          line-height: 1;

          user-select: none;

          color: #111;

          padding: 0 8px;

          text-shadow:
            1px 1px 0 rgba(255,255,255,0.4);
        }

        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 22px;

          color: #c4001a;

          display: inline-block;

          user-select: none;
        }

        @keyframes sc-arrow-left {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }

          50% {
            transform: translateX(-5px);
            opacity: 0.4;
          }
        }

        @keyframes sc-arrow-right {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }

          50% {
            transform: translateX(5px);
            opacity: 0.4;
          }
        }

        .sc-nav-arrow.left {
          animation:
            sc-arrow-left
            0.8s ease-in-out infinite;
        }

        .sc-nav-arrow.right {
          animation:
            sc-arrow-right
            0.8s ease-in-out infinite;
        }

        /* =====================================================
           INFO BARS
        ====================================================== */

        @keyframes sc-infobar-in {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }

          60% {
            opacity: 1;
            transform: translateX(-4px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sc-info-bar-wrap {
          position: fixed;

          right: 0;
          left: 65%;

          height: 46px;

          background: transparent;

          pointer-events: all;

          cursor: pointer;

          z-index: 50;

          padding: 0;

          animation:
            sc-infobar-in
            0.35s
            cubic-bezier(0.22,1,0.36,1)
            both;

          transition:
            transform 0.2s ease;
        }

        .sc-info-bar-wrap:hover {
          transform: translateX(-6px);
        }

        .sc-info-bar-wrap.selected {
          background: #111;

          padding: 1.5px;

          border-radius: 8px;

          box-shadow:
            6px 6px 0 #c4001a;
        }

        .sc-info-bar {
          position: relative;

          width: 100%;
          height: 100%;

          background: transparent;

          display: flex;

          align-items: center;

          overflow: hidden;
        }

        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;

          border-radius: 7px;
        }

        .sc-info-bar-new {
          position: absolute;

          left: -40px;
          bottom: 0;

          height: 65%;
          width: auto;

          pointer-events: none;

          z-index: 3;
        }

        .sc-info-bar-wrap.selected
        .sc-info-bar::before {
          content: '';

          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          height: 4px;

          background: #c4001a;

          z-index: 1;
        }

        .sc-info-bar-text {
          flex: 1;

          font-family: 'Bebas Neue', sans-serif;

          font-size: 22px;

          letter-spacing: 2px;

          color: #111;

          padding: 0 14px;

          user-select: none;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .sc-info-bar-box {
          height: 70%;

          background: #000;

          display: flex;

          align-items: center;

          padding: 0 12px;

          font-family: 'Bebas Neue', sans-serif;

          font-size: 20px;

          letter-spacing: 1px;

          color: #fff;

          flex-shrink: 0;

          border-radius: 6px;

          margin-right: 4px;

          user-select: none;

          transition:
            background 0.2s ease;
        }

        .sc-info-bar-wrap.selected
        .sc-info-bar-box {
          background: #c4001a;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;

          flex-shrink: 0;

          margin-left: 14px;

          object-fit: contain;

          pointer-events: none;

          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 22px;

          letter-spacing: 1px;

          color: #111;

          margin-right: 80px;

          flex-shrink: 0;

          user-select: none;
        }

        /* =====================================================
           RESUME-STYLE ACTION BUTTON
        ====================================================== */

        .social-action-button {
          position: fixed;

          left: 3vw;
          bottom: 3vh;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 12px 22px;

          background: #8df6ff;

          color: #06103d;

          text-decoration: none;

          font-family: 'Bebas Neue', sans-serif;

          font-size: 24px;

          letter-spacing: 1.5px;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 12px) 100%,
              0 100%
            );

          box-shadow:
            7px 7px 0 #000;

          cursor: pointer;

          pointer-events: all;

          transition:
            transform 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;

          z-index: 70;
        }

        .social-action-button:hover {
          background: #ffffff;

          transform:
            translate(4px, -4px);

          box-shadow:
            10px 10px 0 #d63232;
        }

        .social-action-button:active {
          transform:
            translate(7px, 7px);

          box-shadow:
            3px 3px 0 #000;
        }

        .social-action-icon {
          font-family: Arial, sans-serif;

          font-size: 28px;

          font-weight: 900;

          line-height: 1;
        }

        /* =====================================================
           FOOTER
        ====================================================== */

        .sc-footer {
          position: fixed;

          bottom: 20px;
          right: 28px;

          display: flex;

          flex-direction: column;

          align-items: flex-end;

          gap: 5px;

          font-family: 'Bebas Neue', sans-serif;

          z-index: 50;

          opacity: 0;

          transition:
            opacity 0.4s ease 0.6s;
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

          color: rgba(255,255,255,0.5);
        }

        .sc-footer-key {
          border:
            1px solid
            rgba(255,255,255,0.25);

          border-radius: 3px;

          padding: 1px 6px;

          font-size: 11px;

          color: rgba(255,255,255,0.8);
        }

        /* =====================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 1100px) {
          .sc-bar {
            width: 65vw;
            min-width: 580px;
          }

          .sc-bar-red {
            width: 65vw;
            min-width: 580px;
          }

          .sc-heading-main {
            font-size: 90px;
          }

          .sc-right-nav {
            right: 20px;
          }

          .sc-right-nav .sc-nav-btn {
            font-size: 70px;
          }

          .sc-info-bar-wrap {
            left: 58%;
          }
        }

        @media (max-width: 700px) {
          .sc-page-heading {
            top: 25px;
            left: 25px;
          }

          .sc-heading-main {
            font-size: 65px;
          }

          .sc-heading-line {
            width: 150px;
          }

          .sc-bar {
            width: 90vw;
            min-width: 0;
          }

          .sc-bar-red {
            width: 90vw;
            min-width: 0;
          }

          .sc-role {
            font-size: 34px;
          }

          .sc-label {
            font-size: 21px;
          }

          .sc-stats {
            display: none;
          }

          .sc-char {
            left: 70px;
            max-width: 120px;
          }

          .sc-right-nav {
            top: 25px;
            right: 15px;
          }

          .sc-right-nav .sc-nav-btn {
            font-size: 50px;
          }

          .sc-right-nav .sc-nav-label {
            display: none;
          }

          .sc-info-bar-wrap {
            left: 15%;
          }

          .sc-footer {
            display: none;
          }
        }
      `}</style>

      {/* =====================================================
          PAGE HEADING
      ====================================================== */}

      <div className="sc-page-heading">
        <div className="sc-heading-small">
          CONNECTION / 007
        </div>

        <div className="sc-heading-main">
          SOCIAL
        </div>

        <div className="sc-heading-line" />

        <div className="sc-heading-sub">
          FIND ME // CONNECT // TRANSMIT
        </div>
      </div>

      {/* =====================================================
          SOCIAL BARS
      ====================================================== */}

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
              if (active === i) {
                if (item.id === "email") {
                  window.location.href = item.href;
                } else {
                  window.open(
                    item.href,
                    "_blank"
                  );
                }
              } else {
                setActive(i);
                setFocus("left");
              }
            }}
            onMouseEnter={() => {
              setActive(i);
              setFocus("left");
            }}
          >
            <div className="sc-bar-red" />

            <div className="sc-bar">

              <img
                className="sc-char"
                src={CHARS[i % CHARS.length]}
                alt=""
              />

              <div className="sc-bar-fill" />

              <div className="sc-bar-shade" />

              <div className="sc-bar-content">

                {/* ROLE */}

                <div
                  className="sc-role"
                  style={{
                    color:
                      active === i
                        ? "#111"
                        : ROLES[i].color,
                  }}
                >
                  {ROLES[i].text}
                </div>

                {/* MAIN */}

                <div className="sc-main">
                  <div className="sc-main-top">

                    <div className="sc-icon">
                      {item.icon}
                    </div>

                    <div className="sc-label">
                      {item.label}
                    </div>

                  </div>
                </div>

                {/* STATS */}

                <div className="sc-stats">

                  {item.stats.map((s) => (
                    <div
                      className="sc-stat"
                      key={s.tag}
                    >

                      <div className="sc-stat-top">

                        <span
                          className="sc-stat-tag"
                          style={{
                            color: s.color,
                            borderColor: s.color,
                          }}
                        >
                          {s.tag}
                        </span>

                        <span className="sc-stat-num">
                          {s.value}
                        </span>

                      </div>

                      <div className="sc-stat-bars">

                        <div
                          className="sc-stat-bar-color"
                          style={{
                            background:
                              s.color,
                          }}
                        />

                        <div className="sc-stat-bar-black" />

                      </div>

                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          RIGHT NAV
      ====================================================== */}

      {mounted && (
        <div
          className="sc-right-nav"
          key={active}
        >
          <span className="sc-nav-arrow left">
            ◄
          </span>

          <span className="sc-nav-btn">
            LB
          </span>

          <span className="sc-nav-label">
            {ITEMS[active].label}
          </span>

          <span className="sc-nav-btn">
            RB
          </span>

          <span className="sc-nav-arrow right">
            ►
          </span>
        </div>
      )}

      {/* =====================================================
          INFO BAR
      ====================================================== */}

      {mounted &&
        Array.from({
          length: ITEMS[active].bars,
        }).map((_, i) => (
          <div
            className={`
              sc-info-bar-wrap
              ${
                activeInfoBar === i
                  ? "selected"
                  : ""
              }
            `}
            key={`bar-${active}-${i}`}
            style={{
              top: `${155 + i * 52}px`,
              animationDelay: `${i * 50}ms`,
            }}
            onClick={() => {
              if (activeInfoBar === i) {
                openInfo();
              } else {
                setActiveInfoBar(i);
              }
            }}
            onMouseEnter={() =>
              setActiveInfoBar(i)
            }
          >

            {ITEMS[active].newBars.includes(i) && (
              <img
                className="sc-info-bar-new"
                src={newsign}
                alt=""
              />
            )}

            <div className="sc-info-bar">

              <img
                className="sc-info-bar-icon"
                src={ITEMS[active].barIcon}
                alt=""
              />

              <span className="sc-info-bar-text">
                {ITEMS[active].links[i]}
              </span>

              <span className="sc-info-bar-box">
                {ITEMS[active].id === "email"
                  ? "SEND"
                  : "OPEN"}
              </span>

              <span className="sc-info-bar-count">
                {ITEMS[active].counts[i]}
              </span>

            </div>
          </div>
        ))}

      {/* =====================================================
          BOTTOM LEFT ACTION
      ====================================================== */}

      <a
        className="social-action-button"
        href={
          ITEMS[active].id === "email"
            ? ITEMS[active].href
            : ITEMS[active].href
        }
        target={
          ITEMS[active].id === "email"
            ? undefined
            : "_blank"
        }
        rel="noreferrer"
      >
        <span className="social-action-icon">
          ↗
        </span>

        {ITEMS[active].id === "email"
          ? "CONTACT"
          : "OPEN PROFILE"}
      </a>

      {/* =====================================================
          FOOTER CONTROLS
      ====================================================== */}

      <div
        className={`
          sc-footer
          ${mounted ? "mounted" : ""}
        `}
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
            ←→
          </span>

          <span>
            DETAILS
          </span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">
            ↵
          </span>

          <span>
            OPEN
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