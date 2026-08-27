import React, { useEffect, useRef, useState } from "react";

const MobileWarning = () => {
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef(null);

  const backgroundVideo =
    "https://res.cloudinary.com/o6y4i5zp/video/upload/w_1080,q_auto:low,f_auto/v1787725102/mainn-web.mp4";

  const linkHref = "#";

  /* ============================================================
     VIDEO LOADING
  ============================================================ */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateProgress = () => {
      if (!video.duration || !isFinite(video.duration)) return;

      let bufferedEnd = 0;

      for (let i = 0; i < video.buffered.length; i++) {
        const start = video.buffered.start(i);
        const end = video.buffered.end(i);

        if (
          video.currentTime >= start &&
          video.currentTime <= end
        ) {
          bufferedEnd = end;
          break;
        }
      }

      if (bufferedEnd > 0) {
        const percentage =
          (bufferedEnd / video.duration) * 100;

        setProgress(
          Math.min(
            99,
            Math.max(0, Math.round(percentage))
          )
        );
      }
    };

    const handleMetadata = () => updateProgress();
    const handleProgress = () => updateProgress();
    const handleLoadedData = () => updateProgress();

    const handleCanPlayThrough = () => {
      setProgress(100);
      setVideoReady(true);
    };

    video.addEventListener(
      "loadedmetadata",
      handleMetadata
    );

    video.addEventListener(
      "progress",
      handleProgress
    );

    video.addEventListener(
      "loadeddata",
      handleLoadedData
    );

    video.addEventListener(
      "canplaythrough",
      handleCanPlayThrough
    );

    video.load();

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleMetadata
      );

      video.removeEventListener(
        "progress",
        handleProgress
      );

      video.removeEventListener(
        "loadeddata",
        handleLoadedData
      );

      video.removeEventListener(
        "canplaythrough",
        handleCanPlayThrough
      );
    };
  }, []);

  /* ============================================================
     BOOT
  ============================================================ */

  useEffect(() => {
    if (!videoReady) return;

    const timer = setTimeout(() => {
      setBooted(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [videoReady]);

  return (
    <>
      <style>{`

        /* ========================================================
           ROOT
        ======================================================== */

        .p3-mobile {
          position: fixed;
          inset: 0;

          width: 100vw;
          height: 100dvh;

          overflow: hidden;

          background: #05070d;
          color: #fff;

          font-family:
            "Arial Narrow",
            "Roboto Condensed",
            "Helvetica Neue",
            Arial,
            sans-serif;

          z-index: 999999;
          isolation: isolate;

          --blue: #193dff;
          --blue-light: #7190ff;
          --blue-dark: #071338;

          --red: #ff1740;

          --text: #ffffff;
          --muted: rgba(225, 230, 245, 0.58);
        }


        /* ========================================================
           VIDEO
        ======================================================== */

        .p3-bg-link {
          position: absolute;
          inset: 0;

          display: block;

          z-index: -30;
        }

        .p3-video {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transform: scale(1.08);

          filter:
            grayscale(0.55)
            contrast(1.25)
            brightness(0.35);

          z-index: -29;
        }

        .p3-video-tint {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(3, 5, 12, 0.48) 0%,
              rgba(4, 7, 16, 0.42) 40%,
              rgba(3, 5, 11, 0.76) 75%,
              #04060b 100%
            );

          z-index: -28;
        }


        /* ========================================================
           BACKGROUND — REMOVED BLUE FIELD / RED STRIP
        ======================================================== */

        /*
          Deliberately no large blue shape behind
          SAKSHAM JUNEJA.
        */

        .p3-blue-field,
        .p3-blue-edge,
        .p3-red-edge,
        .p3-line {
          display: none;
        }


        /* ========================================================
           TOP RED BAR
        ======================================================== */

        .p3-top-bar {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 30px;

          display: flex;
          align-items: center;

          padding: 0 6%;

          background: var(--red);

          clip-path:
            polygon(
              0 0,
              100% 0,
              100% 82%,
              99% 100%,
              0 100%
            );

          z-index: 50;
        }

        .p3-top-bar span {
          font-size: 7px;

          font-weight: 900;
          font-style: italic;

          letter-spacing: 2px;

          color: #05070d;
        }


        /* ========================================================
           CONTENT
        ======================================================== */

        .p3-content {
          position: absolute;
          inset: 0;

          display: flex;
          flex-direction: column;

          padding:
            30px 7% 20px;

          z-index: 20;
        }


        /* ========================================================
           BRAND
        ======================================================== */

        .p3-brand {
          margin-top:
            clamp(28px, 6vh, 52px);

          transform: skewX(-8deg);
        }

        .p3-brand-small {
          font-size: 7px;

          font-weight: 800;

          letter-spacing: 4px;

          color:
            rgba(220, 228, 255, 0.65);

          margin-bottom: 9px;
        }

        .p3-brand-name {
          font-size:
            clamp(42px, 12vw, 78px);

          font-weight: 950;

          font-style: italic;

          line-height: 0.78;

          letter-spacing: -4px;

          white-space: nowrap;

          /* BLUE SHADOW REMOVED */
          text-shadow: none;

          color: #fff;
        }

        .p3-brand-name span {
          color: var(--red);

          /* RED SHADOW ALSO REMOVED */
          text-shadow: none;
        }

        .p3-brand-year {
          margin-top: 12px;

          font-size: 6px;

          font-weight: 800;

          letter-spacing: 3px;

          color:
            rgba(150, 175, 255, 0.6);
        }


        /* ========================================================
           MAIN AREA
        ======================================================== */

        .p3-main {
          flex: 1;

          display: flex;
          flex-direction: column;

          justify-content: center;

          padding:
            20px 0 15px;
        }


        /* ========================================================
           ACCESS RESTRICTED
        ======================================================== */

        .p3-access {
          display: flex;
          align-items: center;

          gap: 12px;

          font-size:
            clamp(12px, 3.5vw, 20px);

          font-weight: 950;

          font-style: italic;

          letter-spacing:
            clamp(2px, 0.7vw, 5px);

          color: var(--red);

          transform: skewX(-8deg);

          /* NO BLUE LINE */
        }

        .p3-access-mark {
          width:
            clamp(9px, 2.4vw, 13px);

          height:
            clamp(9px, 2.4vw, 13px);

          background:
            var(--red);

          transform:
            rotate(45deg);

          flex-shrink: 0;
        }

        /*
          No line after ACCESS RESTRICTED.
        */

        .p3-access-line {
          display: none;
        }


        /* ========================================================
           MAIN HEADLINE
        ======================================================== */

        .p3-headline {
          margin-top: 15px;

          font-size:
            clamp(46px, 14vw, 90px);

          font-weight: 950;

          font-style: italic;

          line-height: 0.78;

          letter-spacing: -4px;

          transform:
            skewX(-6deg);

          text-shadow:
            6px 6px 0 #081237,
            6px 6px 0 var(--blue);

          color: #fff;
        }

        .p3-headline .blue {
          color:
            var(--blue-light);

          text-shadow:
            6px 6px 0 #07102e,
            6px 6px 0 var(--blue);
        }

        .p3-headline .red-outline {
          color: transparent;

          -webkit-text-stroke:
            2px var(--red);
        }


        /* ========================================================
           MESSAGE
        ======================================================== */

        .p3-copy {
          margin-top: 22px;

          max-width: 510px;

          padding:
            10px 0 10px 13px;

          border-left:
            2px solid var(--red);

          background:
            linear-gradient(
              90deg,
              rgba(255, 23, 64, 0.08),
              transparent
            );

          font-size: 8px;

          font-weight: 600;

          line-height: 1.7;

          letter-spacing: 0.8px;

          color:
            rgba(235, 239, 250, 0.75);
        }

        .p3-copy strong {
          color:
            #ffabb8;

          font-weight: 900;
        }


        /* ========================================================
           ACTION
        ======================================================== */

        .p3-action {
          margin-top: 17px;

          width:
            min(82%, 310px);

          height: 34px;

          display: flex;
          align-items: center;

          padding:
            0 13px;

          background:
            var(--blue);

          clip-path:
            polygon(
              0 0,
              100% 0,
              94% 100%,
              0 100%
            );

          transform:
            skewX(-7deg);

          box-shadow:
            5px 5px 0 rgba(255, 23, 64, 0.7);
        }

        .p3-action span {
          transform:
            skewX(7deg);

          font-size: 7px;

          font-weight: 950;

          letter-spacing: 2px;

          color: #fff;
        }

        .p3-action .arrow {
          margin-right: 9px;

          color:
            var(--red);
        }


        /* ========================================================
           BOTTOM
        ======================================================== */

        .p3-bottom {
          display: flex;

          justify-content: space-between;
          align-items: flex-end;

          transform:
            skewX(-7deg);
        }

        .p3-bottom-left {
          font-size: 5px;

          font-weight: 800;

          line-height: 1.8;

          letter-spacing: 2px;

          color:
            rgba(150, 170, 255, 0.3);
        }

        .p3-bottom-left span {
          color:
            var(--red);
        }

        .p3-bottom-right {
          font-size: 5px;

          font-weight: 800;

          letter-spacing: 2px;

          color:
            rgba(150, 170, 255, 0.3);
        }


        /* ========================================================
           BOOT SCREEN
        ======================================================== */

        .p3-boot {
          position: absolute;
          inset: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            #04060b;

          z-index: 200;
        }

        .p3-boot-inner {
          width: 82%;

          max-width: 450px;

          transform:
            skewX(-8deg);
        }

        .boot-label {
          font-size: 8px;

          font-weight: 900;

          letter-spacing: 4px;

          color:
            var(--red);

          margin-bottom: 13px;
        }

        .boot-title {
          font-size:
            clamp(45px, 13vw, 75px);

          font-weight: 950;

          font-style: italic;

          line-height: 0.8;

          letter-spacing: -4px;

          text-shadow:
            5px 5px 0 var(--blue);
        }

        .boot-title span {
          color:
            var(--red);

          text-shadow:
            5px 5px 0 #560716;
        }

        .boot-info {
          margin-top: 30px;
        }

        .boot-row {
          display: flex;

          justify-content: space-between;

          padding:
            7px 0;

          border-bottom:
            1px solid
            rgba(120, 150, 255, 0.16);

          font-size: 7px;

          font-weight: 800;

          letter-spacing: 2px;

          color:
            rgba(220, 228, 255, 0.45);
        }

        .boot-row span:last-child {
          color:
            var(--blue-light);
        }

        .boot-progress {
          height: 5px;

          margin-top: 23px;

          background:
            rgba(100, 120, 200, 0.18);

          transform:
            skewX(-10deg);

          overflow: hidden;
        }

        .boot-progress-inner {
          height: 100%;

          background:
            linear-gradient(
              90deg,
              var(--blue),
              #7d9aff
            );

          box-shadow:
            0 0 14px var(--blue);

          transition:
            width 0.15s linear;
        }

        .boot-status {
          margin-top: 10px;

          font-size: 7px;

          font-weight: 800;

          letter-spacing: 2px;

          color:
            rgba(200, 215, 255, 0.5);

          animation:
            bootBlink 0.8s infinite;
        }

        @keyframes bootBlink {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }
        }


        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 600px) {

          .p3-content {
            padding:
              30px 6.5% 17px;
          }

          .p3-brand {
            margin-top:
              clamp(25px, 5vh, 40px);
          }

          .p3-brand-small {
            font-size: 6px;

            letter-spacing: 3px;

            margin-bottom: 8px;
          }

          .p3-brand-name {
            font-size:
              clamp(39px, 12vw, 53px);

            letter-spacing: -3px;

            text-shadow: none;
          }

          .p3-brand-name span {
            text-shadow: none;
          }

          .p3-brand-year {
            margin-top: 9px;

            font-size: 5px;
          }

          .p3-main {
            padding:
              15px 0 10px;
          }


          /* BIGGER ACCESS RESTRICTED */

          .p3-access {
            gap: 10px;

            font-size:
              clamp(13px, 4vw, 19px);

            letter-spacing:
              clamp(2px, 0.7vw, 4px);
          }

          .p3-access-mark {
            width: 10px;
            height: 10px;
          }


          .p3-headline {
            margin-top: 12px;

            font-size:
              clamp(42px, 13.5vw, 56px);

            letter-spacing: -3px;

            text-shadow:
              5px 5px 0 #081237,
              5px 5px 0 var(--blue);
          }

          .p3-headline .red-outline {
            -webkit-text-stroke:
              1.5px var(--red);
          }

          .p3-copy {
            margin-top: 17px;

            font-size: 7px;

            line-height: 1.65;

            padding-left: 11px;
          }

          .p3-action {
            margin-top: 14px;

            width: 78%;

            height: 31px;
          }

          .p3-action span {
            font-size: 6px;

            letter-spacing: 1.7px;
          }

          .p3-bottom-left,
          .p3-bottom-right {
            font-size: 4.5px;

            letter-spacing: 1.5px;
          }
        }


        /* ========================================================
           VERY SMALL PHONES
        ======================================================== */

        @media (max-width: 380px) {

          .p3-content {
            padding-left: 6%;
            padding-right: 6%;
          }

          .p3-brand {
            margin-top: 22px;
          }

          .p3-brand-name {
            font-size: 38px;
          }

          .p3-brand-year {
            font-size: 4.5px;
          }

          .p3-access {
            font-size: 12px;

            letter-spacing: 2px;
          }

          .p3-access-mark {
            width: 9px;
            height: 9px;
          }

          .p3-headline {
            font-size: 38px;

            margin-top: 9px;
          }

          .p3-copy {
            margin-top: 14px;

            font-size: 6.5px;

            line-height: 1.55;
          }

          .p3-action {
            margin-top: 11px;

            height: 29px;
          }
        }


        /* ========================================================
           SHORT PHONES
        ======================================================== */

        @media (max-height: 650px) and (max-width: 600px) {

          .p3-brand {
            margin-top: 17px;
          }

          .p3-brand-name {
            font-size: 36px;
          }

          .p3-brand-year {
            margin-top: 6px;
          }

          .p3-main {
            padding-top: 8px;
          }

          .p3-access {
            font-size: 11px;
          }

          .p3-headline {
            font-size: 35px;

            margin-top: 7px;
          }

          .p3-copy {
            margin-top: 11px;

            font-size: 6.2px;
          }

          .p3-action {
            margin-top: 9px;

            height: 27px;
          }
        }


        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {

          .boot-status {
            animation: none;
          }
        }

      `}</style>


      <div className="p3-mobile">

        {/* ======================================================
            BACKGROUND VIDEO
        ====================================================== */}

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

            <source
              src={backgroundVideo}
              type="video/mp4"
            />

          </video>

          <div className="p3-video-tint" />

        </a>


        {/* ======================================================
            BOOT
        ====================================================== */}

        {!booted ? (

          <div className="p3-boot">

            <div className="p3-boot-inner">

              <div className="boot-label">
                SYSTEM // COMPATIBILITY CHECK
              </div>

              <div className="boot-title">
                ENTER
                <br />
                <span>PORTFOLIO</span>
              </div>

              <div className="boot-info">

                <div className="boot-row">
                  <span>VISUAL SYSTEM</span>
                  <span>READY</span>
                </div>

                <div className="boot-row">
                  <span>DEVICE</span>
                  <span>MOBILE</span>
                </div>

                <div className="boot-row">
                  <span>DISPLAY</span>
                  <span>UNSUPPORTED</span>
                </div>

                <div className="boot-row">
                  <span>VIDEO</span>
                  <span>
                    {videoReady ? "READY" : "LOADING"}
                  </span>
                </div>

              </div>

              <div className="boot-progress">

                <div
                  className="boot-progress-inner"
                  style={{
                    width: `${progress}%`
                  }}
                />

              </div>

              <div className="boot-status">

                {videoReady
                  ? "SYSTEM READY // 100%"
                  : `LOADING VIDEO // ${progress}%`}

              </div>

            </div>

          </div>

        ) : (

          /* ====================================================
             WARNING
          ==================================================== */

          <div className="p3-warning">

            {/* TOP BAR */}

            <div className="p3-top-bar">

              <span>
                SITE UNAVAILABLE ON THIS DEVICE
              </span>

            </div>


            <div className="p3-content">


              {/* =================================================
                  BRAND
              ================================================= */}

              <div className="p3-brand">

                <div className="p3-brand-small">
                  PERSONA PORTFOLIO
                </div>

                <div className="p3-brand-name">

                  SAKSHAM
                  <br />

                  <span>
                    JUNEJA
                  </span>

                </div>

                <div className="p3-brand-year">
                  PORTFOLIO // 2026
                </div>

              </div>


              {/* =================================================
                  MAIN
              ================================================= */}

              <div className="p3-main">


                {/* BIG ACCESS RESTRICTED */}

                <div className="p3-access">

                  <span className="p3-access-mark" />

                  ACCESS RESTRICTED

                </div>


                {/* HEADLINE */}

                <div className="p3-headline">

                  THIS
                  <br />

                  EXPERIENCE
                  <br />

                  IS{" "}
                  <span className="blue">
                    DESKTOP
                  </span>
                  <br />

                  <span className="red-outline">
                    ONLY
                  </span>

                </div>


                {/* MESSAGE */}

                <div className="p3-copy">

                  THIS PORTFOLIO IS DESIGNED FOR
                  DESKTOP DISPLAYS AND CANNOT BE
                  PROPERLY EXPERIENCED ON A MOBILE
                  DEVICE.

                  <br />
                  <br />

                  <strong>
                    PLEASE OPEN THIS SITE ON A
                    DESKTOP OR LAPTOP.
                  </strong>

                </div>


                {/* ACTION */}

                <div className="p3-action">

                  <span className="arrow">
                    ▶
                  </span>

                  <span>
                    OPEN ON DESKTOP TO CONTINUE
                  </span>

                </div>

              </div>


              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="p3-bottom">

                <div className="p3-bottom-left">

                  PORTFOLIO SYSTEM
                  <br />

                  <span>
                    WAITING FOR DESKTOP DISPLAY
                  </span>

                </div>

                <div className="p3-bottom-right">
                  SJ // 2026
                </div>

              </div>


            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default MobileWarning;