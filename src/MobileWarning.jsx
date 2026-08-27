import React, { useEffect, useRef, useState } from "react";

const MobileWarning = () => {
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef(null);

  const backgroundVideo =
    "https://res.cloudinary.com/o6y4i5zp/video/upload/w_1080,q_auto:low,f_auto/v1787725102/mainn-web.mp4";

  // Where the video/background link should take people if tapped.
  const linkHref = "#";

  /* =========================================================
     VIDEO LOADING
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateProgress = () => {
      if (!video.duration || !isFinite(video.duration)) {
        return;
      }

      let bufferedEnd = 0;

      for (let i = 0; i < video.buffered.length; i++) {
        const start = video.buffered.start(i);
        const end = video.buffered.end(i);

        if (video.currentTime >= start && video.currentTime <= end) {
          bufferedEnd = end;
          break;
        }
      }

      if (bufferedEnd > 0) {
        const percentage = (bufferedEnd / video.duration) * 100;
        setProgress(Math.min(99, Math.max(0, Math.round(percentage))));
      }
    };

    const handleMetadata = () => updateProgress();
    const handleProgress = () => updateProgress();
    const handleLoadedData = () => updateProgress();
    const handleCanPlayThrough = () => {
      setProgress(100);
      setVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplaythrough", handleCanPlayThrough);

    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  /* =========================================================
     BOOT AFTER VIDEO READY
  ========================================================= */

  useEffect(() => {
    if (!videoReady) return;

    const timer = setTimeout(() => {
      setBooted(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [videoReady]);

  return (
    <>
      <style>{`

        .p3-mobile {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;
          overflow: hidden;

          background: #020d24;
          color: white;

          font-family: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif;

          z-index: 999999;
          isolation: isolate;

          --content-left: 6.2%;
          --content-right: 6.2%;
        }

        /* =====================================================
           BACKGROUND LINK + VIDEO
        ===================================================== */

        .p3-bg-link {
          position: absolute;
          inset: 0;
          display: block;
          z-index: -25;
          cursor: pointer;
        }

        .p3-video {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transform: scale(1.12) translate3d(-1%, 0, 0);

          filter: saturate(1.25) contrast(1.12) brightness(0.58);

          z-index: -20;

          animation: sceneFloat 14s ease-in-out infinite alternate;
        }

        @keyframes sceneFloat {
          0% { transform: scale(1.12) translate3d(-1%, 0, 0); }
          100% { transform: scale(1.17) translate3d(2%, -1%, 0); }
        }

        .p3-blue-wash {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(0,20,65,0.82), rgba(0,87,180,0.30), rgba(0,8,32,0.82));
          mix-blend-mode: multiply;
          z-index: -19;
        }

        .p3-cyan-light {
          position: absolute;
          width: 135%;
          height: 65%;
          left: -25%;
          top: 16%;
          background: linear-gradient(110deg, transparent 0%, rgba(0,184,255,0.10) 30%, rgba(0,210,255,0.32) 50%, rgba(0,125,255,0.10) 70%, transparent 100%);
          transform: rotate(-12deg);
          filter: blur(2px);
          z-index: -18;
        }

        .p3-dark {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,7,28,0.48), transparent 45%, rgba(0,5,25,0.70)),
            linear-gradient(0deg, rgba(0,7,24,0.90), transparent 48%, rgba(0,8,30,0.28));
          z-index: -17;
        }

        .p3-shape-one {
          position: absolute;
          width: 165%;
          height: 125px;
          left: -32%;
          top: 38%;
          transform: rotate(-13deg);
          background: linear-gradient(90deg, transparent, rgba(0,87,210,0.70) 30%, rgba(0,180,255,0.62) 55%, rgba(0,90,220,0.35) 76%, transparent);
          opacity: 0.60;
          mix-blend-mode: screen;
          z-index: 1;
          animation: slashMove 8s ease-in-out infinite alternate;
        }

        @keyframes slashMove {
          from { transform: translateX(-3%) rotate(-13deg); }
          to { transform: translateX(4%) rotate(-13deg); }
        }

        .p3-shape-two {
          position: absolute;
          width: 155%;
          height: 42px;
          left: -27%;
          top: 48%;
          transform: rotate(-13deg);
          background: linear-gradient(90deg, transparent, rgba(45,196,255,0.70), transparent);
          box-shadow: 0 0 22px rgba(0,180,255,0.55);
          opacity: 0.75;
          z-index: 2;
        }

        .p3-shape-three {
          position: absolute;
          width: 100%;
          height: 1px;
          left: 0;
          top: 42%;
          transform: rotate(-13deg);
          background: rgba(165,239,255,0.75);
          box-shadow: 0 0 12px rgba(60,200,255,0.75);
          z-index: 3;
        }

        .white-slash {
          position: absolute;
          width: 90%;
          height: 3px;
          right: -22%;
          bottom: 34%;
          transform: rotate(-17deg);
          background: white;
          opacity: 0.85;
          box-shadow: 0 0 15px rgba(255,255,255,0.45);
          z-index: 5;
        }

        .p3-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(95,190,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(95,190,255,0.15) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: 0.23;
          mask-image: linear-gradient(to bottom, black 0%, black 48%, transparent 88%);
          z-index: 4;
        }

        .p3-dots {
          position: absolute;
          width: 310px;
          height: 310px;
          right: -75px;
          bottom: -75px;
          background-image: radial-gradient(rgba(35,201,255,0.9) 1px, transparent 1.6px);
          background-size: 8px 8px;
          opacity: 0.48;
          transform: rotate(-8deg);
          mask-image: radial-gradient(ellipse at bottom right, black 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.4) 58%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse at bottom right, black 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.4) 58%, transparent 78%);
          z-index: 5;
        }

        .p3-noise {
          position: absolute;
          inset: -50%;
          pointer-events: none;
          opacity: 0.035;
          background-image: repeating-radial-gradient(circle at 0 0, transparent 0, rgba(255,255,255,0.5) 1px, transparent 2px);
          animation: noise 0.22s steps(2) infinite;
          z-index: 20;
        }

        @keyframes noise {
          0% { transform: translate(0,0); }
          25% { transform: translate(-1%,1%); }
          50% { transform: translate(1%,-1%); }
          75% { transform: translate(1%,1%); }
          100% { transform: translate(0,0); }
        }

        .p3-scan {
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          top: -10px;
          background: linear-gradient(90deg, transparent, rgba(100,220,255,0.65), transparent);
          box-shadow: 0 0 18px rgba(0,180,255,0.7);
          animation: scan 4.5s linear infinite;
          z-index: 30;
        }

        @keyframes scan {
          from { top: -10px; }
          to { top: 110%; }
        }

        /* =====================================================
           BOOT SCREEN
        ===================================================== */

        .p3-boot {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: bootIn 0.45s ease-out;
        }

        @keyframes bootIn {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }

        .p3-boot-content {
          width: 82vw;
          max-width: 480px;
          transform: skewX(-7deg);
        }

        .boot-small {
          font-size: 8px;
          letter-spacing: 5px;
          color: rgba(160,225,255,0.7);
          margin-bottom: 12px;
        }

        .boot-big {
          font-size: clamp(40px, 12vw, 70px);
          font-weight: 950;
          line-height: 0.82;
          letter-spacing: -3px;
          color: white;
          text-shadow: 4px 4px 0 #0754a5, 0 0 25px rgba(0,190,255,0.25);
        }

        .boot-big span { color: #55d8ff; }

        .boot-lines { margin-top: 38px; }

        .boot-line {
          display: flex;
          justify-content: space-between;
          padding: 9px 0;
          border-bottom: 1px solid rgba(120,210,255,0.16);
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(220,240,255,0.55);
        }

        .boot-line span:last-child { color: #57d7ff; }

        .boot-progress {
          height: 5px;
          margin-top: 27px;
          background: rgba(80,150,220,0.2);
          transform: skewX(-8deg);
          overflow: hidden;
        }

        .boot-progress-inner {
          height: 100%;
          background: linear-gradient(90deg, #0871c9, #59d9ff);
          box-shadow: 0 0 15px rgba(60,200,255,0.8);
          transition: width 0.15s linear;
        }

        .boot-percent {
          margin-top: 11px;
          font-size: 8px;
          letter-spacing: 3px;
          color: rgba(180,225,250,0.55);
          animation: blink 0.8s infinite;
        }

        /* =====================================================
           WARNING SCREEN — now a flex column so content spreads
           across the full height (top / middle / bottom) instead
           of clustering near the top.
        ===================================================== */

        .p3-warning {
          position: absolute;
          inset: 0;
          z-index: 40;

          display: flex;
          flex-direction: column;

          padding: clamp(28px, 7vh, 64px) var(--content-right) clamp(20px, 5vh, 40px) var(--content-left);

          animation: warningEnter 0.65s cubic-bezier(.16,.8,.25,1);
        }

        @keyframes warningEnter {
          from { opacity: 0; transform: translateX(60px) scale(1.03); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        /* ---- top: brand block ---- */

        .p3-brand {
          flex: 0 0 auto;
          z-index: 50;
          transform: skewX(-8deg);
          transform-origin: left top;
        }

        .brand-mini {
          font-size: clamp(6px, 0.85vw, 10px);
          letter-spacing: clamp(3px, 0.55vw, 6px);
          color: rgba(210,240,255,0.72);
          margin-bottom: clamp(9px, 1.1vw, 16px);
        }

        .brand-name {
          font-size: clamp(42px, 10vw, 104px);
          font-weight: 950;
          line-height: 0.86;
          letter-spacing: clamp(-3px, -0.42vw, -5px);
          color: white;
          white-space: nowrap;
          text-shadow: 4px 4px 0 #034c9b;
        }

        .brand-name .cyan {
          color: #55d8ff;
          position: relative;
          left: clamp(4px, 0.8vw, 10px);
          text-shadow: 4px 4px 0 #0758a8;
        }

        .brand-year {
          margin-top: clamp(14px, 1.8vw, 22px);
          font-size: clamp(6px, 0.75vw, 9px);
          letter-spacing: clamp(3px, 0.5vw, 6px);
          color: rgba(110,210,255,0.60);
        }

        /* ---- middle: warning content, vertically centered in
               the remaining space between brand and footer ---- */

        .warning-area {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
          z-index: 60;
          overflow: visible;
        }

        .warning-label {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.1vw, 14px);
          font-size: clamp(7px, 0.85vw, 10px);
          letter-spacing: clamp(2.5px, 0.45vw, 5px);
          color: #59d8ff;
          white-space: nowrap;
          transform: skewX(-8deg);
        }

        .warning-label::before {
          content: "";
          width: clamp(25px, 4vw, 42px);
          height: 2px;
          flex-shrink: 0;
          background: #5bd8ff;
          box-shadow: 0 0 12px rgba(50,200,255,0.8);
        }

        .warning-title {
          margin-top: clamp(14px, 2vw, 25px);
          font-size: clamp(43px, 11vw, 105px);
          font-weight: 950;
          line-height: 0.86;
          letter-spacing: clamp(-2.8px, -0.65vw, -5px);
          color: white;
          font-style: italic;
          transform: skewX(-4deg);
          transform-origin: left center;
          text-shadow: 5px 5px 0 rgba(0,57,135,0.85), 0 0 25px rgba(30,190,255,0.18);
          width: 100%;
          white-space: nowrap;
        }

        .warning-title .cyan {
          color: #56d8ff;
          text-shadow: 5px 5px 0 #0757a7, 0 0 20px rgba(40,205,255,0.4);
        }

        .warning-title .outline {
          color: transparent;
          -webkit-text-stroke: clamp(1.5px, 0.35vw, 3px) white;
          text-shadow: none;
          opacity: 0.9;
        }

        .warning-copy {
          margin-top: clamp(22px, 3vw, 34px);
          width: min(82%, 770px);
          padding-left: clamp(10px, 1.4vw, 16px);
          border-left: clamp(2px, 0.3vw, 3px) solid #55d5ff;
          font-size: clamp(8px, 0.9vw, 11px);
          line-height: 1.8;
          letter-spacing: clamp(1px, 0.15vw, 1.7px);
          color: rgba(238,248,255,0.72);
        }

        .warning-copy strong { color: #62d9ff; }

        .p3-menu {
          margin-top: clamp(21px, 2.6vw, 30px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: clamp(17px, 3.2vw, 42px);
          transform: skewX(-4deg);
          white-space: nowrap;
        }

        .menu-option {
          position: relative;
          font-size: clamp(6px, 0.72vw, 9px);
          letter-spacing: clamp(1.4px, 0.25vw, 2.5px);
          color: rgba(210,235,250,0.5);
        }

        .menu-option.active { color: white; }

        .menu-option.active::before {
          content: "▶";
          color: #59d8ff;
          margin-right: 5px;
        }

        .warning-status {
          display: flex;
          align-items: flex-start;
          gap: clamp(22px, 4vw, 55px);
          margin-top: clamp(20px, 2.8vw, 32px);
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: clamp(3px, 0.45vw, 6px);
          min-width: clamp(58px, 8vw, 95px);
        }

        .status-label {
          font-size: clamp(5px, 0.6vw, 8px);
          letter-spacing: clamp(1.5px, 0.25vw, 2.5px);
          color: rgba(190,225,245,0.4);
        }

        .status-value {
          font-size: clamp(7px, 0.8vw, 11px);
          font-weight: 900;
          letter-spacing: clamp(1px, 0.18vw, 2px);
          color: white;
          white-space: nowrap;
        }

        .status-value.red {
          color: #ff536b;
          text-shadow: 0 0 10px rgba(255,50,80,0.4);
        }

        /* ---- decorative side label, still absolute over
               the whole warning frame ---- */

        .side-label {
          position: absolute;
          right: -32px;
          top: 46%;
          transform: rotate(90deg) skewX(-8deg);
          font-size: clamp(5px, 0.65vw, 8px);
          letter-spacing: clamp(2.5px, 0.4vw, 5px);
          color: rgba(120,210,255,0.45);
          white-space: nowrap;
        }

        /* ---- bottom: footer block, pinned to bottom by flex ---- */

        .bottom-info {
          flex: 0 0 auto;
          font-size: clamp(5px, 0.6vw, 8px);
          line-height: 1.9;
          letter-spacing: clamp(1.5px, 0.25vw, 2.5px);
          color: rgba(160,215,240,0.35);
          transform: skewX(-8deg);
        }

        .bottom-info span { color: rgba(80,205,255,0.7); }

        .p3-flash {
          position: absolute;
          inset: 0;
          background: white;
          z-index: 200;
          pointer-events: none;
          opacity: 0;
          animation: flash 0.7s ease-out;
        }

        @keyframes flash {
          0% { opacity: 0.2; }
          100% { opacity: 0; }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        /* =====================================================
           MOBILE SPACING SYSTEM
        ===================================================== */

        @media (max-width: 600px) {
          .p3-mobile { --content-left: 6%; --content-right: 6%; }
          .brand-mini { font-size: 7px; letter-spacing: 4px; margin-bottom: 9px; }
          .brand-name { font-size: clamp(39px, 11vw, 52px); line-height: 0.84; letter-spacing: -3px; }
          .brand-name .cyan { left: 4px; }
          .brand-year { margin-top: 13px; font-size: 6px; letter-spacing: 3px; }
          .warning-label { font-size: 7px; letter-spacing: 3px; gap: 8px; }
          .warning-label::before { width: 25px; height: 2px; }
          .warning-title { margin-top: 13px; font-size: clamp(42px, 12vw, 54px); line-height: 0.82; letter-spacing: -2.8px; }
          .warning-copy { margin-top: 20px; width: 90%; padding-left: 9px; font-size: 8px; line-height: 1.7; letter-spacing: 1.05px; }
          .p3-menu { margin-top: 19px; gap: 15px; padding-left: 0; }
          .menu-option { font-size: 6.5px; letter-spacing: 1.35px; }
          .menu-option.active::before { margin-right: 4px; }
          .warning-status { margin-top: 18px; gap: 20px; }
          .status-item { min-width: 55px; gap: 4px; }
          .status-label { font-size: 5.5px; letter-spacing: 1.5px; }
          .status-value { font-size: 7px; letter-spacing: 1px; }
          .p3-dots { width: 260px; height: 260px; right: -65px; bottom: -55px; }
          .side-label { display: none; }
        }

        @media (max-width: 380px) {
          .p3-mobile { --content-left: 6%; --content-right: 6%; }
          .p3-video { transform: scale(1.20) translateX(-3%); }
          .brand-mini { font-size: 6.5px; letter-spacing: 3.5px; margin-bottom: 8px; }
          .brand-name { font-size: 41px; line-height: 0.84; letter-spacing: -2.8px; }
          .brand-year { margin-top: 12px; }
          .warning-label { font-size: 6.5px; letter-spacing: 2.8px; }
          .warning-label::before { width: 23px; }
          .warning-title { margin-top: 12px; font-size: 44px; line-height: 0.81; letter-spacing: -2.6px; }
          .warning-copy { margin-top: 19px; width: 91%; font-size: 7.7px; line-height: 1.68; letter-spacing: 1px; }
          .p3-menu { margin-top: 17px; gap: 13px; }
          .menu-option { font-size: 6px; letter-spacing: 1.3px; }
          .warning-status { margin-top: 16px; gap: 17px; }
          .status-item { min-width: 52px; }
          .status-label { font-size: 5px; }
          .status-value { font-size: 6.7px; }
        }

        @media (max-width: 350px) {
          .brand-name { font-size: 38px; line-height: 0.83; }
          .brand-year { margin-top: 11px; }
          .warning-label { font-size: 6px; letter-spacing: 2.5px; }
          .warning-label::before { width: 21px; }
          .warning-title { margin-top: 11px; font-size: 41px; line-height: 0.79; letter-spacing: -2.4px; }
          .warning-copy { margin-top: 17px; width: 94%; font-size: 7.2px; line-height: 1.62; letter-spacing: 0.9px; }
          .p3-menu { margin-top: 15px; gap: 10px; }
          .menu-option { font-size: 5.8px; letter-spacing: 1.2px; }
          .warning-status { margin-top: 14px; gap: 12px; }
          .status-item { min-width: 48px; }
          .status-label { font-size: 4.8px; }
          .status-value { font-size: 6.2px; letter-spacing: 0.8px; }
        }

        @media (max-height: 650px) and (max-width: 600px) {
          .brand-name { font-size: 39px; line-height: 0.82; }
          .brand-year { margin-top: 10px; }
          .warning-title { font-size: 42px; line-height: 0.79; }
          .warning-copy { margin-top: 16px; line-height: 1.58; }
          .p3-menu { margin-top: 14px; }
          .warning-status { margin-top: 13px; }
        }

        @media (max-height: 580px) and (max-width: 600px) {
          .brand-mini { margin-bottom: 6px; }
          .brand-name { font-size: 35px; }
          .brand-year { margin-top: 8px; }
          .warning-title { margin-top: 9px; font-size: 38px; line-height: 0.76; }
          .warning-copy { margin-top: 14px; line-height: 1.5; }
          .p3-menu { margin-top: 12px; gap: 9px; }
          .warning-status { margin-top: 11px; gap: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .p3-video, .p3-shape-one, .p3-noise, .p3-scan, .boot-percent {
            animation: none;
          }
        }

      `}</style>

      <div className="p3-mobile">

        {/* Background video wrapped in a link */}
        <a
          className="p3-bg-link"
          href={linkHref}
          aria-label="Enter portfolio"
        >
          <video
            ref={videoRef}
            className="p3-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </a>

        <div className="p3-blue-wash" />
        <div className="p3-cyan-light" />
        <div className="p3-dark" />

        <div className="p3-shape-one" />
        <div className="p3-shape-two" />
        <div className="p3-shape-three" />
        <div className="white-slash" />

        <div className="p3-grid" />
        <div className="p3-dots" />
        <div className="p3-noise" />
        <div className="p3-scan" />

        {!booted ? (
          <div className="p3-boot">
            <div className="p3-boot-content">
              <div className="boot-small">PERSONA PORTFOLIO // INITIALIZING</div>

              <div className="boot-big">
                ENTER
                <br />
                <span>PORTFOLIO</span>
              </div>

              <div className="boot-lines">
                <div className="boot-line">
                  <span>VISUAL SYSTEM</span>
                  <span>READY</span>
                </div>
                <div className="boot-line">
                  <span>DEVICE</span>
                  <span>MOBILE</span>
                </div>
                <div className="boot-line">
                  <span>DISPLAY</span>
                  <span>ANALYZING</span>
                </div>
                <div className="boot-line">
                  <span>EXPERIENCE</span>
                  <span>{videoReady ? "READY" : "LOADING"}</span>
                </div>
              </div>

              <div className="boot-progress">
                <div className="boot-progress-inner" style={{ width: `${progress}%` }} />
              </div>

              <div className="boot-percent">
                {videoReady ? "SYSTEM READY // 100%" : `LOADING VIDEO // ${progress}%`}
              </div>
            </div>
          </div>
        ) : (
          <div className="p3-warning">
            <div className="p3-flash" />

            {/* TOP */}
            <div className="p3-brand">
              <div className="brand-mini">PERSONA PORTFOLIO</div>
              <div className="brand-name">
                SAKSHAM
                <br />
                <span className="cyan">JUNEJA</span>
              </div>
              <div className="brand-year">PORTFOLIO // 2026</div>
            </div>

            {/* MIDDLE — vertically centered in remaining space */}
            <div className="warning-area">
              <div className="warning-label">EXPERIENCE NOTICE</div>

              <div className="warning-title">
                THIS
                <br />
                EXPERIENCE
                <br />
                IS <span className="cyan">DESKTOP</span>
                <br />
                <span className="outline">ONLY</span>
              </div>

              <div className="warning-copy">
                THIS PORTFOLIO WAS DESIGNED AS A
                <br />
                <strong>FULL-SCREEN EXPERIENCE.</strong>
                <br />
                <br />
                YOUR CURRENT DEVICE CAN'T DISPLAY
                <br />
                THE COMPLETE INTERFACE.
              </div>

              <div className="p3-menu">
                <div className="menu-option active">DESKTOP VERSION</div>
                <div className="menu-option">PORTFOLIO</div>
                <div className="menu-option">2026</div>
              </div>

              <div className="warning-status">
                <div className="status-item">
                  <div className="status-label">DEVICE</div>
                  <div className="status-value">MOBILE</div>
                </div>
                <div className="status-item">
                  <div className="status-label">STATUS</div>
                  <div className="status-value red">RESTRICTED</div>
                </div>
                <div className="status-item">
                  <div className="status-label">REQUIRED</div>
                  <div className="status-value">DESKTOP</div>
                </div>
              </div>
            </div>

            <div className="side-label">PERSONA // PORTFOLIO // EXPERIENCE // 2026</div>

            {/* BOTTOM — pinned to the bottom of the frame */}
            <div className="bottom-info">
              PORTFOLIO SYSTEM
              <br />
              <span>WAITING FOR DESKTOP DISPLAY</span>
              <br />
              SJ // 2026
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileWarning;