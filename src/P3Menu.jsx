import { useState, useEffect, useRef } from "react";

import navigateSound from "./assets/navigate.mp3";
import char1 from "./assets/mainf.png";

const bgVideo =
  "https://videotourl.com/videos/1787747373934-8e9a9cfa-07b8-4935-890b-0e158bbf1ba0.mp4";

/*
============================================================
ALL PAGE VIDEOS
============================================================
These are preloaded during the Persona 03 boot sequence.
The browser can then reuse the downloaded video data when
the user navigates to another page.
*/

const PAGE_VIDEOS = {
  home:
    "https://videotourl.com/videos/1787747373934-8e9a9cfa-07b8-4935-890b-0e158bbf1ba0.mp4",

  about:
    "https://videotourl.com/videos/1787747296648-e1e089a7-ec76-47f3-9778-302473336bb9.mp4",

  socials:
    "https://videotourl.com/videos/1787648911296-2addd9a1-9d20-47ad-8c07-6dd19d1ba369.mp4",

  projects:
    "https://videotourl.com/videos/1787747406551-1ac6f3c3-32c2-4ee9-b98f-51cac742b49a.mp4",

  resume:
    "https://videotourl.com/videos/1787747096009-5a38f591-3813-486a-88cc-95079f8a89f2.mp4",
};

const ITEMS = [
  {
    id: "about",
    label: "ABOUT ME",
    page: "about",
    fontSize: 80,
    offsetX: 0,
    offsetY: 0,
    skew: -6,
    skewY: 10,
  },
  {
    id: "resume",
    label: "RESUME",
    page: "resume",
    fontSize: 66,
    offsetX: 20,
    offsetY: 8,
    skew: -11,
    skewY: -10,
  },
  {
    id: "socials",
    label: "SOCIALS",
    page: "socials",
    fontSize: 74,
    offsetX: 16,
    offsetY: 8,
    skew: -3,
    skewY: 5,
  },
  {
    id: "projects",
    label: "PROJECTS",
    page: "projects",
    fontSize: 70,
    offsetX: 12,
    offsetY: 8,
    skew: -7,
    skewY: 8,
  },
];

const CLIP_SHAPES = [
  (w, h) =>
    `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,

  (w, h) =>
    `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,

  (w, h) =>
    `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,

  (w, h) =>
    `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function P3Menu({ onNavigate }) {
  // ============================================================
  // INTRO
  // ============================================================

  const [introStage, setIntroStage] = useState(() => {
    const introShown =
      sessionStorage.getItem("p3-intro-shown") === "true";

    return introShown ? "menu" : "intro";
  });

  const [introProgress, setIntroProgress] = useState(() => {
    const introShown =
      sessionStorage.getItem("p3-intro-shown") === "true";

    return introShown ? 100 : 0;
  });

  const [active, setActive] = useState(0);

  const [mounted, setMounted] = useState(() => {
    return (
      sessionStorage.getItem("p3-intro-shown") === "true"
    );
  });

  const [animKey, setAnimKey] = useState(0);

  const animationRef = useRef(null);
  const finishTimeoutRef = useRef(null);
  const mountTimeoutRef = useRef(null);

  // ============================================================
  // AUDIO
  // ============================================================

  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioLoadingRef = useRef(false);

  // ============================================================
  // VIDEO
  // ============================================================

  const videoRef = useRef(null);

  const videoPreloadRef = useRef(null);

  const videoLoadedRef = useRef(false);

  const introFinishedRef = useRef(false);

  const introCompletedRef = useRef(false);

  const [videoLoaded, setVideoLoaded] = useState(false);

  // ============================================================
  // ALL VIDEO PRELOADING
  // ============================================================

  useEffect(() => {
    /*
      If the intro has already been completed during this
      session, don't delay the menu again.

      The videos will still be requested by the browser when
      their pages are opened.
    */
    if (
      sessionStorage.getItem("p3-intro-shown") === "true"
    ) {
      return;
    }

    const preloaders = [];
    let destroyed = false;

    let readyCount = 0;

    const totalVideos = Object.keys(PAGE_VIDEOS).length;

    const updateProgress = () => {
      if (destroyed) return;

      /*
        The first 90% belongs to the boot animation.

        The final 10% represents the actual video preparation.
      */

      const preloadProgress =
        totalVideos > 0
          ? readyCount / totalVideos
          : 1;

      const visualProgress =
        90 + preloadProgress * 10;

      setIntroProgress(
        Math.min(visualProgress, 100)
      );

      if (
        readyCount >= totalVideos &&
        !videoLoadedRef.current
      ) {
        videoLoadedRef.current = true;

        setVideoLoaded(true);

        if (
          introFinishedRef.current &&
          !introCompletedRef.current
        ) {
          completeIntro();
        }
      }
    };

    Object.entries(PAGE_VIDEOS).forEach(
      ([page, url]) => {
        const preloadVideo =
          document.createElement("video");

        preloadVideo.preload = "auto";
        preloadVideo.muted = true;
        preloadVideo.playsInline = true;

        /*
          This makes the browser request the actual
          video immediately.
        */
        preloadVideo.src = url;

        preloadVideo.setAttribute(
          "playsinline",
          ""
        );

        preloadVideo.setAttribute(
          "webkit-playsinline",
          ""
        );

        const markReady = () => {
          if (destroyed) return;

          /*
            HAVE_FUTURE_DATA means enough data exists
            to start playing without being completely
            empty.
          */
          if (
            preloadVideo.readyState >=
            HTMLMediaElement.HAVE_FUTURE_DATA
          ) {
            if (!preloadVideo.dataset.ready) {
              preloadVideo.dataset.ready = "true";

              readyCount++;

              updateProgress();
            }
          }
        };

        preloadVideo.addEventListener(
          "loadeddata",
          markReady
        );

        preloadVideo.addEventListener(
          "canplay",
          markReady
        );

        preloadVideo.addEventListener(
          "canplaythrough",
          markReady
        );

        preloadVideo.load();

        preloaders.push({
          page,
          video: preloadVideo,
          markReady,
        });
      }
    );

    /*
      Some CDNs don't fire canplay/canplaythrough
      consistently, so periodically check readyState.
    */
    const checkReady = setInterval(() => {
      if (destroyed) {
        clearInterval(checkReady);
        return;
      }

      preloaders.forEach(
        ({ video, markReady }) => {
          markReady();
        }
      );

      if (readyCount >= totalVideos) {
        clearInterval(checkReady);
      }
    }, 250);

    return () => {
      destroyed = true;

      clearInterval(checkReady);

      preloaders.forEach(
        ({ video, markReady }) => {
          video.removeEventListener(
            "loadeddata",
            markReady
          );

          video.removeEventListener(
            "canplay",
            markReady
          );

          video.removeEventListener(
            "canplaythrough",
            markReady
          );

          video.pause();

          video.removeAttribute("src");

          video.load();
        }
      );
    };
  }, []);

  // ============================================================
  // INTRO ANIMATION
  // ============================================================

  useEffect(() => {
    if (introStage !== "intro") return;

    let start = performance.now();

    /*
      Boot animation itself still takes exactly 2500ms.

      It then waits at 90% while the remaining videos
      finish loading.
    */
    const duration = 2500;

    const animate = (now) => {
      const elapsed = now - start;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      /*
        Only animate from 0 -> 90%.
        The video preload system controls 90 -> 100%.
      */
      setIntroProgress(
        Math.min(progress * 90, 90)
      );

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(animate);
      } else {
        finishIntro();
      }
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  // ============================================================
  // FINISH INTRO
  // ============================================================

  const finishIntro = () => {
    introFinishedRef.current = true;

    /*
      Don't leave the boot screen until all page videos
      are sufficiently ready.
    */
    if (!videoLoadedRef.current) {
      setIntroProgress((current) =>
        Math.max(current, 90)
      );

      return;
    }

    setIntroProgress(100);

    completeIntro();
  };

  // ============================================================
  // COMPLETE INTRO
  // ============================================================

  const completeIntro = () => {
    if (
      !introFinishedRef.current ||
      introCompletedRef.current
    ) {
      return;
    }

    introCompletedRef.current = true;

    sessionStorage.setItem(
      "p3-intro-shown",
      "true"
    );

    setIntroProgress(100);

    setIntroStage("flash");

    finishTimeoutRef.current =
      setTimeout(() => {
        setIntroStage("menu");

        mountTimeoutRef.current =
          setTimeout(() => {
            setMounted(true);
          }, 150);
      }, 130);
  };

  // ============================================================
  // CLEAN INTRO TIMERS
  // ============================================================

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      if (finishTimeoutRef.current) {
        clearTimeout(
          finishTimeoutRef.current
        );
      }

      if (mountTimeoutRef.current) {
        clearTimeout(
          mountTimeoutRef.current
        );
      }
    };
  }, []);

  // ============================================================
  // SKIP INTRO
  // ============================================================

  useEffect(() => {
    if (introStage !== "intro") return;

    const skipIntro = (e) => {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "Escape"
      ) {
        e.preventDefault();

        if (animationRef.current) {
          cancelAnimationFrame(
            animationRef.current
          );
        }

        setIntroProgress(90);

        /*
          Skip the animation itself, but DON'T skip
          video preparation.
        */
        introFinishedRef.current = true;

        if (videoLoadedRef.current) {
          setIntroProgress(100);
          completeIntro();
        }
      }
    };

    window.addEventListener(
      "keydown",
      skipIntro
    );

    return () => {
      window.removeEventListener(
        "keydown",
        skipIntro
      );
    };
  }, [introStage]);

  // ============================================================
  // AUDIO INITIALIZATION
  // ============================================================

  const initAudio = async () => {
    try {
      if (!audioContextRef.current) {
        const AudioContext =
          window.AudioContext ||
          window.webkitAudioContext;

        if (!AudioContext) return;

        audioContextRef.current =
          new AudioContext();
      }

      const ctx =
        audioContextRef.current;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (
        audioBufferRef.current ||
        audioLoadingRef.current
      ) {
        return;
      }

      audioLoadingRef.current = true;

      const response =
        await fetch(navigateSound);

      const arrayBuffer =
        await response.arrayBuffer();

      const decoded =
        await ctx.decodeAudioData(
          arrayBuffer
        );

      audioBufferRef.current =
        decoded;
    } catch (error) {
      console.warn(
        "Navigation audio failed:",
        error
      );
    } finally {
      audioLoadingRef.current =
        false;
    }
  };

  // ============================================================
  // LOAD AUDIO ONCE
  // ============================================================

  useEffect(() => {
    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      audioContextRef.current = null;
      audioBufferRef.current = null;
    };
  }, []);

  // ============================================================
  // PLAY NAVIGATION SOUND
  // ============================================================

  const playNavigateSound = async () => {
    try {
      await initAudio();

      const ctx =
        audioContextRef.current;

      const buffer =
        audioBufferRef.current;

      if (!ctx || !buffer) return;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const source =
        ctx.createBufferSource();

      source.buffer = buffer;

      const gain =
        ctx.createGain();

      gain.gain.value = 0.9;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(0);
    } catch (error) {
      console.warn(
        "Navigation sound error:",
        error
      );
    }
  };

  // ============================================================
  // VIDEO PLAYBACK
  // ============================================================

  useEffect(() => {
    if (introStage !== "menu") return;

    const video =
      videoRef.current;

    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const startVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn(
          "Background video autoplay:",
          error
        );
      }
    };

    startVideo();

    const handlePause = () => {
      if (
        !document.hidden &&
        video.readyState >= 2
      ) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener(
      "pause",
      handlePause
    );

    return () => {
      video.removeEventListener(
        "pause",
        handlePause
      );
    };
  }, [introStage]);

  // ============================================================
  // MENU ACTIVE
  // ============================================================

  const activate = (idx) => {
    if (idx === active) {
      return;
    }

    setActive(idx);

    setAnimKey(
      (k) => k + 1
    );

    playNavigateSound();
  };

  // ============================================================
  // KEYBOARD
  // ============================================================

  useEffect(() => {
    if (introStage !== "menu") {
      return;
    }

    const onKey = (e) => {
      // ========================================================
      // UP
      // ========================================================

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActive((current) => {
          const next = Math.max(
            0,
            current - 1
          );

          if (next !== current) {
            setAnimKey(
              (k) => k + 1
            );

            playNavigateSound();
          }

          return next;
        });
      }

      // ========================================================
      // DOWN
      // ========================================================

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActive((current) => {
          const next = Math.min(
            ITEMS.length - 1,
            current + 1
          );

          if (next !== current) {
            setAnimKey(
              (k) => k + 1
            );

            playNavigateSound();
          }

          return next;
        });
      }

      // ========================================================
      // ENTER
      // ========================================================

      if (e.key === "Enter") {
        e.preventDefault();

        onNavigate?.(
          ITEMS[active].page
        );
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, [
    introStage,
    active,
    onNavigate,
  ]);

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          overflow: hidden;
          background: #05070d;
        }

        /* ========================================================
           INTRO
        ======================================================== */

        .p3-intro {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;

          background:
            linear-gradient(
              125deg,
              #02050c 0%,
              #06142d 45%,
              #001d4c 100%
            );

          z-index: 99999;

          font-family:
            "Anton",
            Impact,
            sans-serif;

          color: white;
        }

        .p3-intro::before {
          content: "";
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 65% 45%,
              rgba(0,174,255,.32),
              transparent 32%
            );

          pointer-events: none;
        }

        /* ========================================================
           DIAGONALS
        ======================================================== */

        .p3-diagonal {
          position: absolute;
          background: #087cff;
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .p3-diagonal.one {
          width: 12vw;
          height: 150vh;
          right: 16vw;
          top: -25vh;
          opacity: 0;

          animation:
            p3DiagonalIn
            .55s
            cubic-bezier(.16,1,.3,1)
            .1s
            forwards;
        }

        .p3-diagonal.two {
          width: 4vw;
          height: 150vh;
          right: 9vw;
          top: -25vh;
          background: #62dfff;
          opacity: 0;

          animation:
            p3DiagonalIn
            .5s
            cubic-bezier(.16,1,.3,1)
            .18s
            forwards;
        }

        .p3-diagonal.three {
          width: 2vw;
          height: 150vh;
          left: 8vw;
          top: -25vh;
          background: #ffffff;
          opacity: 0;

          animation:
            p3DiagonalIn
            .45s
            cubic-bezier(.16,1,.3,1)
            .25s
            forwards;
        }

        @keyframes p3DiagonalIn {
          0% {
            transform:
              translateX(300px)
              skewX(-20deg);
            opacity: 0;
          }

          100% {
            transform:
              translateX(0)
              skewX(-20deg);
            opacity: 1;
          }
        }

        /* ========================================================
           GRID
        ======================================================== */

        .p3-grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(100,210,255,.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(100,210,255,.08) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          transform:
            perspective(500px)
            rotateX(55deg)
            scale(1.5);

          transform-origin:
            center bottom;

          opacity: 0;

          animation:
            p3GridIn
            .8s
            ease-out
            .15s
            forwards;

          pointer-events: none;
        }

        @keyframes p3GridIn {
          from {
            opacity: 0;

            transform:
              perspective(500px)
              rotateX(55deg)
              scale(1.8)
              translateY(100px);
          }

          to {
            opacity: .55;

            transform:
              perspective(500px)
              rotateX(55deg)
              scale(1.5)
              translateY(0);
          }
        }

        /* ========================================================
           TOP UI
        ======================================================== */

        .p3-ui-top {
          position: absolute;
          top: 28px;
          left: 35px;
          z-index: 20;
          opacity: 0;

          animation:
            p3UIIn
            .35s
            ease-out
            .1s
            forwards;
        }

        .p3-ui-small {
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: rgba(255,255,255,.7);
        }

        .p3-ui-name {
          margin-top: 7px;
          font-size: 17px;
          letter-spacing: 3px;
          font-style: italic;
        }

        .p3-ui-line {
          width: 90px;
          height: 3px;
          margin-top: 8px;
          background: #25bfff;
          transform: skewX(-25deg);
        }

        @keyframes p3UIIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ========================================================
           RIGHT SYSTEM
        ======================================================== */

        .p3-system {
          position: absolute;
          right: 34px;
          top: 28px;
          z-index: 20;

          text-align: right;

          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          line-height: 1.9;

          color: rgba(255,255,255,.55);

          opacity: 0;

          animation:
            p3UIIn
            .4s
            ease-out
            .25s
            forwards;
        }

        .p3-system strong {
          color: #4fdcff;
        }

        /* ========================================================
           CHARACTER
        ======================================================== */

        .p3-character {
          position: absolute;
          z-index: 8;

          right: 18%;
          bottom: -8%;

          width: min(48vw,620px);
          max-height: 95vh;

          object-fit: contain;
          object-position: bottom center;

          filter:
            drop-shadow(
              0 0 25px
              rgba(0,170,255,.35)
            );

          opacity: 0;

          animation:
            p3CharacterIn
            .72s
            cubic-bezier(.16,1,.3,1)
            .25s
            forwards;
        }

        @keyframes p3CharacterIn {
          0% {
            opacity: 0;

            transform:
              translateX(160px)
              scale(1.08)
              rotate(4deg);
          }

          60% {
            opacity: 1;
          }

          100% {
            opacity: 1;

            transform:
              translateX(0)
              scale(1)
              rotate(0);
          }
        }

        /* ========================================================
           TITLE
        ======================================================== */

        .p3-intro-title {
          position: absolute;
          z-index: 12;

          left: 7vw;
          top: 37%;

          font-size:
            clamp(75px,12vw,190px);

          line-height: .72;
          font-style: italic;
          letter-spacing: -3px;

          white-space: nowrap;

          transform: skewX(-10deg);

          color: white;

          opacity: 0;

          animation:
            p3TitleIn
            .65s
            cubic-bezier(.16,1,.3,1)
            .32s
            forwards;
        }

        .p3-intro-title span {
          display: block;
        }

        .p3-intro-title .blue {
          color: #38cfff;

          -webkit-text-stroke:
            1px
            rgba(255,255,255,.25);
        }

        @keyframes p3TitleIn {
          0% {
            opacity: 0;

            transform:
              translateX(-150px)
              skewX(-10deg);
          }

          100% {
            opacity: 1;

            transform:
              translateX(0)
              skewX(-10deg);
          }
        }

        /* ========================================================
           CUT
        ======================================================== */

        .p3-cut {
          position: absolute;
          z-index: 15;

          left: -10%;
          top: 53%;

          width: 125%;
          height: 8px;

          background: white;

          transform:
            rotate(-8deg)
            scaleX(0);

          transform-origin: left;

          animation:
            p3Cut
            .42s
            cubic-bezier(.16,1,.3,1)
            .62s
            forwards;

          box-shadow:
            0 0 20px
            rgba(60,210,255,.8);
        }

        @keyframes p3Cut {
          from {
            transform:
              rotate(-8deg)
              scaleX(0);
          }

          to {
            transform:
              rotate(-8deg)
              scaleX(1);
          }
        }

        /* ========================================================
           INFO
        ======================================================== */

        .p3-info-panel {
          position: absolute;
          z-index: 25;

          left: 8vw;
          bottom: 12vh;

          display: flex;
          gap: 10px;

          opacity: 0;

          animation:
            p3UIIn
            .4s
            ease-out
            .75s
            forwards;
        }

        .p3-info-box {
          padding: 8px 13px;

          background:
            rgba(0,20,55,.8);

          border-left:
            3px solid
            #27cfff;

          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 2px;

          color:
            rgba(255,255,255,.75);

          transform:
            skewX(-12deg);
        }

        .p3-info-box strong {
          color: white;
        }

        /* ========================================================
           BOTTOM
        ======================================================== */

        .p3-intro-bottom {
          position: absolute;

          left: 50%;
          bottom: 30px;

          transform:
            translateX(-50%);

          z-index: 30;

          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 5px;

          color:
            rgba(255,255,255,.4);

          white-space: nowrap;

          opacity: 0;

          animation:
            p3BottomIn
            .4s
            ease-out
            1s
            forwards;
        }

        @keyframes p3BottomIn {
          from {
            opacity: 0;

            transform:
              translateX(-50%)
              translateY(10px);
          }

          to {
            opacity: 1;

            transform:
              translateX(-50%)
              translateY(0);
          }
        }

        /* ========================================================
           PROGRESS
        ======================================================== */

        .p3-intro-progress {
          position: absolute;

          left: 0;
          bottom: 0;

          height: 4px;

          background: #31cfff;

          box-shadow:
            0 0 18px
            rgba(40,210,255,.9);

          width: ${introProgress}%;

          z-index: 100;

          transition:
            width .03s linear;
        }

        /* ========================================================
           FLASH
        ======================================================== */

        .p3-final-flash {
          position: fixed;
          inset: 0;

          background: #ffffff;

          z-index: 100000;

          animation:
            p3Flash
            .13s
            ease-out
            forwards;
        }

        @keyframes p3Flash {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        /* ========================================================
           MENU SCREEN
        ======================================================== */

        .p3-menu-screen {
          position: fixed;
          inset: 0;

          width: 100vw;
          height: 100vh;

          z-index: 1000;

          overflow: hidden;

          background: #05070d;

          contain:
            layout
            paint;
        }

        /* ========================================================
           BACKGROUND VIDEO
        ======================================================== */

        .p3-bg-video {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          z-index: 0;

          pointer-events: none;
          user-select: none;

          background: #05070d;

          backface-visibility: hidden;

          display: block;

          transform:
            translate3d(0,0,0);

          image-rendering: auto;
        }

        .p3-video-overlay {
          position: absolute;
          inset: 0;

          z-index: 1;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.08),
              rgba(0,0,0,.02)
            );
        }

        .p3-overlay {
          position: absolute;
          inset: 0;

          z-index: 10;

          display: flex;

          align-items: center;
          justify-content: flex-end;

          pointer-events: none;
        }

        /* ========================================================
           STRIPES
        ======================================================== */

        .p3-stripe {
          position: absolute;

          right: 0;
          top: 0;
          bottom: 0;

          width: 5px;

          background: #c4001a;

          z-index: 10;
        }

        .p3-stripe2 {
          position: absolute;

          right: 9px;
          top: 0;
          bottom: 0;

          width: 2px;

          background:
            rgba(245,122,139,.22);

          z-index: 10;
        }

        /* ========================================================
           MENU
        ======================================================== */

        .p3-menu {
          position: relative;

          z-index: 20;

          padding:
            48px
            90px
            48px
            48px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          pointer-events: all;

          contain: layout;
        }

        .p3-row {
          position: relative;

          cursor: pointer;

          display: flex;

          align-items: center;
          justify-content: center;

          line-height: 1;

          text-decoration: none;

          opacity: 0;

          transform:
            translateX(36px);

          transition:
            opacity .38s ease,
            transform .38s
            cubic-bezier(.22,1,.36,1);

          will-change:
            transform,
            opacity;
        }

        .p3-row.mounted {
          opacity: 1 !important;

          transform:
            translateX(0) !important;
        }

        /* ========================================================
           GLOW
        ======================================================== */

        .p3-glow {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%,-50%);

          width: 120%;
          height: 200%;

          background:
            radial-gradient(
              ellipse at center,
              rgba(255,100,180,.35) 0%,
              transparent 70%
            );

          filter: blur(18px);

          opacity: 0;

          transition:
            opacity .3s ease;

          z-index: 0;

          pointer-events: none;
        }

        .p3-row.active .p3-glow {
          opacity: 1;
        }

        /* ========================================================
           SKEW
        ======================================================== */

        .p3-skew-wrap {
          position: relative;

          display: flex;

          align-items: center;

          isolation: isolate;
        }

        /* ========================================================
           SHADOW
        ======================================================== */

        @keyframes p3-shadow-pop {
          0% {
            transform:
              translateY(-40%)
              translateX(-12px)
              scaleX(0)
              scaleY(1);
          }

          55% {
            transform:
              translateY(-46%)
              translateX(-15px)
              scaleX(1.22)
              scaleY(1.18);
          }

          75% {
            transform:
              translateY(-39%)
              translateX(-11px)
              scaleX(.96)
              scaleY(.97);
          }

          100% {
            transform:
              translateY(-40%)
              translateX(-12px)
              scaleX(1)
              scaleY(1);
          }
        }

        .p3-shadow-tri {
          position: absolute;

          top: 50%;

          transform-origin:
            left center;

          background:
            rgba(235,80,120,.85);

          z-index: 1;

          pointer-events: none;

          transform:
            translateY(-40%)
            translateX(-12px)
            scaleX(0);
        }

        .p3-shadow-tri.pop {
          animation:
            p3-shadow-pop
            .28s
            cubic-bezier(.34,1.56,.64,1)
            forwards;
        }

        /* ========================================================
           HIGHLIGHT
        ======================================================== */

        .p3-highlight {
          position: absolute;

          top: 50%;

          transform-origin:
            left center;

          background: white;

          z-index: 2;

          transition:
            transform .22s
            cubic-bezier(.22,1,.36,1);

          pointer-events: none;
        }

        /* ========================================================
           LABEL
        ======================================================== */

        .p3-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p3-label-base {
          font-family:
            "Anton",
            sans-serif;

          font-style: italic;

          letter-spacing: 2px;

          line-height: .85;

          display: block;

          white-space: nowrap;

          user-select: none;
        }

        .p3-label-dark {
          color:
            rgba(245,240,235,.88);

          text-shadow:
            2px 3px 0
            rgba(0,0,0,.45);
        }

        .p3-label-bright {
          color: #ff2a2a;

          position: absolute;

          inset: 0;

          z-index: 1;

          opacity: 0;

          transition:
            opacity .12s ease;
        }

        .p3-row.active
        .p3-label-bright {
          opacity: 1;
        }

        .p3-row.active
        .p3-label-dark {
          color: #6b0010;

          text-shadow: none;
        }

        /* ========================================================
           HINT
        ======================================================== */

        .p3-hint {
          position: absolute;

          bottom: 24px;
          right: 28px;

          z-index: 20;

          display: flex;

          flex-direction: column;

          align-items: flex-end;

          gap: 5px;

          font-family:
            "Anton",
            sans-serif;

          opacity: 0;

          transition:
            opacity .5s ease .9s;

          pointer-events: none;
        }

        .p3-hint.mounted {
          opacity: 1;
        }

        .p3-hint-row {
          display: flex;

          align-items: center;

          gap: 8px;

          font-size: 13px;

          letter-spacing: 2px;

          color:
            rgba(255,255,255,.28);
        }

        .p3-hint-key {
          border:
            1px solid
            rgba(255,255,255,.2);

          border-radius: 3px;

          padding:
            1px 6px;

          font-size: 11px;
        }

        /* ========================================================
           NAME TAG
        ======================================================== */

        .p3-name-tag {
          position: absolute;

          top: 18px;
          left: 22px;

          z-index: 20;

          font-family:
            "Anton",
            sans-serif;

          font-style: italic;

          font-size: 108px;

          line-height: .88;

          letter-spacing: 2px;

          color:
            rgba(10,10,14,.64);

          transform:
            rotate(18deg);

          transform-origin:
            left top;

          user-select: none;

          pointer-events: none;

          display: flex;

          flex-direction: column;

          align-items: flex-start;
        }

        .p3-name-tag span:first-child {
          color:
            rgba(0,0,0,.86);
        }

        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 700px) {

          .p3-menu {
            padding-right: 35px;
          }

          .p3-name-tag {
            font-size: 64px;
          }

          .p3-character {
            width: 75vw;
            right: -15%;
          }

          .p3-intro-title {
            font-size: 20vw;
            left: 5vw;
          }

          .p3-info-panel {
            left: 5vw;
            bottom: 10vh;
          }

        }

      `}</style>

      {/* ==========================================================
          INTRO
      ========================================================== */}

      {introStage === "intro" && (
        <div className="p3-intro">

          <div className="p3-grid" />

          <div className="p3-diagonal one" />
          <div className="p3-diagonal two" />
          <div className="p3-diagonal three" />

          {/* TOP LEFT */}

          <div className="p3-ui-top">

            <div className="p3-ui-small">
              PERSONA 03
            </div>

            <div className="p3-ui-name">
              SAKSHAM JUNEJA
            </div>

            <div className="p3-ui-line" />

          </div>

          {/* TOP RIGHT */}

          <div className="p3-system">

            <div>
              SYSTEM:{" "}
              <strong>
                ONLINE
              </strong>
            </div>

            <div>
              PROFILE:{" "}
              <strong>
                01
              </strong>
            </div>

            <div>
              STATUS:{" "}
              <strong>
                READY
              </strong>
            </div>

          </div>

          {/* CHARACTER */}

          <img
            src={char1}
            alt=""
            className="p3-character"
          />

          {/* HUGE NAME */}

          <div className="p3-intro-title">

            <span>
              SAKSHAM
            </span>

            <span className="blue">
              JUNEJA
            </span>

          </div>

          {/* CUT */}

          <div className="p3-cut" />

          {/* INFORMATION */}

          <div className="p3-info-panel">

            <div className="p3-info-box">
              <strong>
                AI / ML
              </strong>
            </div>

            <div className="p3-info-box">
              <strong>
                DEVELOPER
              </strong>
            </div>

            <div className="p3-info-box">
              <strong>
                PORTFOLIO
              </strong>
            </div>

          </div>

          {/* BOTTOM */}

          <div className="p3-intro-bottom">
            ENTERING PERSONAL TERMINAL
          </div>

          {/* PROGRESS */}

          <div className="p3-intro-progress" />

        </div>
      )}

      {/* ==========================================================
          FLASH
      ========================================================== */}

      {introStage === "flash" && (
        <div className="p3-final-flash" />
      )}

      {/* ==========================================================
          MENU
      ========================================================== */}

      {introStage === "menu" && (
        <div className="p3-menu-screen">

          {/* BACKGROUND VIDEO */}

          <video
            ref={videoRef}
            className="p3-bg-video"
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
          />

          <div className="p3-video-overlay" />

          <div className="p3-overlay">

            {/* NAME */}

            <div className="p3-name-tag">

              <span>
                Saksham's
              </span>

              <span>
                persona
              </span>

            </div>

            {/* RIGHT STRIPES */}

            <div className="p3-stripe" />
            <div className="p3-stripe2" />

            {/* MENU */}

            <nav className="p3-menu">

              {ITEMS.map((item, i) => {

                const isActive =
                  active === i;

                const dist =
                  Math.abs(
                    i - active
                  );

                const opacity =
                  isActive
                    ? 1
                    : Math.max(
                        0.5,
                        1 - dist * 0.2
                      );

                const estW =
                  item.label.length *
                    item.fontSize *
                    0.6 +
                  80;

                const estH =
                  item.fontSize *
                  0.94;

                const clipFn =
                  CLIP_SHAPES[i];

                return (
                  <a
                    key={item.id}
                    href="#"
                    className={`
                      p3-row
                      ${isActive ? "active" : ""}
                      ${mounted ? "mounted" : ""}
                    `}
                    style={{
                      marginRight:
                        item.offsetX,

                      marginTop:
                        item.offsetY,

                      transitionDelay:
                        mounted
                          ? `${i * 80}ms`
                          : "0ms",
                    }}
                    onClick={(e) => {

                      e.preventDefault();

                      onNavigate?.(
                        item.page
                      );

                    }}
                    onMouseEnter={() => {
                      activate(i);
                    }}
                  >

                    {/* GLOW */}

                    <div className="p3-glow" />

                    {/* SKEW */}

                    <div
                      className="p3-skew-wrap"
                      style={{
                        transform:
                          `skewX(${item.skew}deg) skewY(${item.skewY}deg)`,
                      }}
                    >

                      {/* SHADOW */}

                      <div
                        key={
                          isActive
                            ? `pop-${i}-${animKey}`
                            : `idle-${i}`
                        }
                        className={`
                          p3-shadow-tri
                          ${isActive ? "pop" : ""}
                        `}
                        style={{
                          width: estW,
                          height: estH,

                          clipPath:
                            clipFn(
                              estW,
                              estH
                            ),
                        }}
                      />

                      {/* WHITE HIGHLIGHT */}

                      <div
                        className="p3-highlight"
                        style={{
                          width: estW,
                          height: estH,

                          clipPath:
                            clipFn(
                              estW,
                              estH
                            ),

                          transform:
                            `translateY(-50%) scaleX(${
                              isActive
                                ? 1
                                : 0
                            })`,
                        }}
                      />

                      {/* LABEL */}

                      <div
                        className="p3-label-wrap"
                        style={{
                          opacity,
                        }}
                      >

                        <span
                          className="
                            p3-label-base
                            p3-label-dark
                          "
                          style={{
                            fontSize:
                              item.fontSize,
                          }}
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            p3-label-base
                            p3-label-bright
                          "
                          style={{
                            fontSize:
                              item.fontSize,

                            clipPath:
                              clipFn(
                                estW,
                                estH
                              ),
                          }}
                        >
                          {item.label}
                        </span>

                      </div>

                    </div>

                  </a>
                );
              })}

            </nav>

            {/* ==================================================
                HINT
            ================================================== */}

            <div
              className={`
                p3-hint
                ${mounted ? "mounted" : ""}
              `}
            >

              <div className="p3-hint-row">

                <span className="p3-hint-key">
                  ↑↓
                </span>

                <span>
                  NAVIGATE
                </span>

              </div>

              <div className="p3-hint-row">

                <span className="p3-hint-key">
                  ↵
                </span>

                <span>
                  CONFIRM
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
}