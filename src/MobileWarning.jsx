import React, { useEffect, useState } from "react";

const MobileWarning = () => {
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooted(true);
    }, 900);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 90);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        .mobile-warning {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;

          background:
            radial-gradient(
              circle at center,
              rgba(20, 35, 55, 0.45) 0%,
              rgba(3, 7, 14, 0.95) 55%,
              #02040a 100%
            );

          color: #dcecff;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          font-family:
            "Arial Narrow",
            "Roboto Condensed",
            Arial,
            sans-serif;

          z-index: 999999;
        }

        /* =========================
           NOISE
        ========================= */

        .warning-noise {
          position: absolute;
          inset: -50%;

          opacity: 0.055;

          pointer-events: none;

          background-image:
            repeating-radial-gradient(
              circle at 0 0,
              transparent 0,
              rgba(255, 255, 255, 0.3) 1px,
              transparent 2px
            );

          animation: noiseMove 0.25s steps(2) infinite;
        }

        @keyframes noiseMove {
          0% {
            transform: translate(0, 0);
          }

          25% {
            transform: translate(-2%, 1%);
          }

          50% {
            transform: translate(1%, -2%);
          }

          75% {
            transform: translate(2%, 2%);
          }

          100% {
            transform: translate(0, 0);
          }
        }

        /* =========================
           SCANLINE
        ========================= */

        .warning-scanline {
          position: absolute;

          width: 100%;
          height: 2px;

          top: -10px;
          left: 0;

          background: rgba(120, 190, 255, 0.35);

          box-shadow:
            0 0 12px rgba(80, 160, 255, 0.5),
            0 0 30px rgba(80, 160, 255, 0.25);

          animation: scan 4s linear infinite;

          pointer-events: none;
        }

        @keyframes scan {
          0% {
            top: -10px;
          }

          100% {
            top: 110%;
          }
        }

        /* =========================
           CONTAINER
        ========================= */

        .warning-container {
          position: relative;

          width: min(88vw, 430px);

          z-index: 2;
        }

        /* =========================
           SYSTEM CHECK
        ========================= */

        .system-check {
          animation: fadeIn 0.25s ease-out;
        }

        .system-title {
          font-size: 18px;
          letter-spacing: 3px;

          margin-bottom: 30px;

          color: #d8eaff;

          text-shadow:
            0 0 8px rgba(100, 180, 255, 0.7);
        }

        .system-line {
          display: flex;
          justify-content: space-between;

          font-size: 12px;

          letter-spacing: 1.5px;

          padding: 9px 0;

          border-bottom: 1px solid rgba(130, 170, 210, 0.15);

          color: rgba(220, 235, 255, 0.65);
        }

        .system-line span:last-child {
          color: #8ccaff;
        }

        .progress-wrapper {
          width: 100%;
          height: 4px;

          margin-top: 28px;

          background: rgba(120, 160, 200, 0.15);

          overflow: hidden;
        }

        .progress-bar {
          height: 100%;

          background: #9bd2ff;

          box-shadow:
            0 0 10px rgba(100, 190, 255, 0.9),
            0 0 25px rgba(100, 190, 255, 0.5);

          transition: width 0.08s linear;
        }

        .loading-text {
          margin-top: 12px;

          font-size: 10px;

          letter-spacing: 2px;

          color: rgba(190, 220, 255, 0.5);

          animation: blink 0.8s infinite;
        }

        /* =========================
           WARNING PANEL
        ========================= */

        .warning-panel {
          position: relative;

          padding: 32px 26px;

          background:
            linear-gradient(
              135deg,
              rgba(12, 25, 40, 0.95),
              rgba(3, 8, 16, 0.97)
            );

          border-left: 2px solid rgba(150, 205, 255, 0.7);
          border-right: 2px solid rgba(150, 205, 255, 0.25);

          box-shadow:
            0 0 25px rgba(60, 130, 200, 0.15),
            inset 0 0 35px rgba(50, 120, 190, 0.05);

          animation:
            panelIn 0.45s ease-out,
            panelGlitch 5s infinite;
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes panelGlitch {
          0%,
          94%,
          100% {
            transform: translateX(0);
          }

          95% {
            transform: translateX(-2px);
          }

          96% {
            transform: translateX(2px);
          }

          97% {
            transform: translateX(0);
          }
        }

        /* =========================
           HEADER
        ========================= */

        .warning-header {
          font-size: 13px;

          letter-spacing: 5px;

          color: #9fd4ff;

          margin-bottom: 28px;

          text-shadow:
            0 0 8px rgba(90, 180, 255, 0.7);
        }

        /* =========================
           WARNING SYMBOL
        ========================= */

        .warning-symbol {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 22px;

          border: 2px solid #ff5265;

          color: #ff5265;

          font-size: 30px;
          font-weight: bold;

          box-shadow:
            0 0 12px rgba(255, 70, 90, 0.35);

          animation: dangerPulse 1.4s infinite;
        }

        @keyframes dangerPulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.55;
          }
        }

        /* =========================
           MAIN TEXT
        ========================= */

        .warning-main {
          font-size: clamp(25px, 7vw, 38px);

          line-height: 0.95;

          font-weight: 800;

          letter-spacing: 1px;

          color: #f1f7ff;

          text-shadow:
            0 0 10px rgba(150, 210, 255, 0.35);
        }

        .warning-divider {
          width: 100%;
          height: 1px;

          margin: 25px 0;

          background:
            linear-gradient(
              90deg,
              rgba(130, 200, 255, 0.8),
              transparent
            );
        }

        /* =========================
           MESSAGE
        ========================= */

        .warning-message {
          font-size: 11px;

          line-height: 1.7;

          letter-spacing: 1.2px;

          color: rgba(220, 235, 255, 0.65);

          margin-bottom: 25px;
        }

        /* =========================
           STATUS
        ========================= */

        .warning-status {
          display: flex;
          justify-content: space-between;

          font-size: 10px;

          letter-spacing: 2px;

          padding: 8px 0;

          border-top: 1px solid rgba(140, 180, 220, 0.1);

          color: rgba(200, 220, 245, 0.45);
        }

        .warning-status span:last-child {
          color: #a6d8ff;
        }

        .warning-status .danger {
          color: #ff5265;
        }

        /* =========================
           FOOTER
        ========================= */

        .warning-footer {
          margin-top: 25px;

          font-size: 9px;

          line-height: 1.8;

          letter-spacing: 1.7px;

          color: rgba(190, 215, 240, 0.4);
        }

        /* =========================
           CORNERS
        ========================= */

        .warning-corner {
          position: absolute;

          width: 14px;
          height: 14px;

          border-color: rgba(160, 215, 255, 0.8);
          border-style: solid;
        }

        .corner-tl {
          top: -1px;
          left: -1px;

          border-width: 2px 0 0 2px;
        }

        .corner-tr {
          top: -1px;
          right: -1px;

          border-width: 2px 2px 0 0;
        }

        .corner-bl {
          bottom: -1px;
          left: -1px;

          border-width: 0 0 2px 2px;
        }

        .corner-br {
          bottom: -1px;
          right: -1px;

          border-width: 0 2px 2px 0;
        }

        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }
        }

        /* =========================
           SMALL PHONES
        ========================= */

        @media (max-height: 650px) {
          .warning-panel {
            padding: 22px 20px;
          }

          .warning-header {
            margin-bottom: 18px;
          }

          .warning-symbol {
            width: 38px;
            height: 38px;

            font-size: 23px;

            margin-bottom: 15px;
          }

          .warning-divider {
            margin: 18px 0;
          }

          .warning-message {
            margin-bottom: 15px;
          }

          .warning-footer {
            margin-top: 15px;
          }
        }
      `}</style>

      <div className="mobile-warning">
        <div className="warning-noise" />
        <div className="warning-scanline" />

        <div className="warning-container">

          {!booted ? (
            <div className="system-check">

              <div className="system-title">
                SYSTEM INITIALIZATION
              </div>

              <div className="system-line">
                <span>DEVICE DETECTION</span>
                <span>OK</span>
              </div>

              <div className="system-line">
                <span>DISPLAY ANALYSIS</span>
                <span>OK</span>
              </div>

              <div className="system-line">
                <span>COMPATIBILITY CHECK</span>
                <span>...</span>
              </div>

              <div className="progress-wrapper">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>

              <div className="loading-text">
                ANALYZING TERMINAL...
              </div>

            </div>
          ) : (
            <div className="warning-panel">

              <div className="warning-header">
                SYSTEM ALERT
              </div>

              <div className="warning-symbol">
                !
              </div>

              <div className="warning-main">
                DESKTOP TERMINAL
                <br />
                REQUIRED
              </div>

              <div className="warning-divider" />

              <div className="warning-message">
                THIS EXPERIENCE WAS DESIGNED
                <br />
                SPECIFICALLY FOR A DESKTOP DISPLAY.
              </div>

              <div className="warning-status">
                <span>DEVICE</span>
                <span>MOBILE</span>
              </div>

              <div className="warning-status">
                <span>STATUS</span>
                <span className="danger">
                  ACCESS DENIED
                </span>
              </div>

              <div className="warning-footer">
                PLEASE ACCESS THIS PORTFOLIO
                <br />
                FROM A PC OR LAPTOP.
              </div>

              <div className="warning-corner corner-tl" />
              <div className="warning-corner corner-tr" />
              <div className="warning-corner corner-bl" />
              <div className="warning-corner corner-br" />

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MobileWarning;