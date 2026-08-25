import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import resumePDF from "./assets/resume.pdf";
const resumeVideo =
  "https://videotourl.com/videos/1787649960662-48c420be-1e9c-46f4-906e-d36020d1b3f4.mp4";

const ITEMS = [
  {
    id: "i",
    badge: "I",
    title: "EDUCATION",
    subtitle: "University / Coursework",
    rank: 3,
  },
  {
    id: "ii",
    badge: "II",
    title: "SKILLS",
    subtitle: "Programming / AI / Design",
    rank: 4,
  },
  {
    id: "iii",
    badge: "III",
    title: "PROJECTS",
    subtitle: "Featured Work / Systems",
    rank: 5,
  },
  {
    id: "iv",
    badge: "IV",
    title: "EXPERIENCE",
    subtitle: "Internships / Leadership",
    rank: 2,
  },
];

const SECTION_DATA = {
  EDUCATION: {
    index: "01",
    title: "EDUCATION LOG",
    progress: "04/04",
    code: "EDU-01",
    status: "CURRENT",
    rows: [
      {
        index: "01",
        title: "B.TECH AI / ML",
        status: "CURRENT",
      },
      {
        index: "02",
        title: "COMPUTER SCIENCE CORE",
        status: "ACTIVE",
      },
      {
        index: "03",
        title: "AI / ML SPECIALIZATION",
        status: "ACTIVE",
      },
      {
        index: "04",
        title: "EXPECTED GRADUATION",
        status: "2028",
      },
    ],
    details: [
      "B.Tech with specialization in Artificial Intelligence and Machine Learning.",
      "Building a strong foundation across programming, DSA, AI, ML, and software development.",
      "Focused on turning coursework into practical AI and software projects.",
    ],
  },

  SKILLS: {
    index: "02",
    title: "SKILL DATABASE",
    progress: "05/05",
    code: "SKL-02",
    status: "ACTIVE",
    rows: [
      {
        index: "01",
        title: "PYTHON",
        status: "ADV.",
      },
      {
        index: "02",
        title: "MACHINE LEARNING",
        status: "ADV.",
      },
      {
        index: "03",
        title: "REACT / NEXT.JS",
        status: "ADV.",
      },
      {
        index: "04",
        title: "COMPUTER VISION",
        status: "ACTIVE",
      },
      {
        index: "05",
        title: "LANGGRAPH / AI",
        status: "ACTIVE",
      },
    ],
    details: [
      "Python, C++, JavaScript, TypeScript, React, and Next.js.",
      "Machine learning, deep learning, computer vision, RAG, and generative AI.",
      "Currently expanding into agentic AI, LangChain, and LangGraph.",
    ],
  },

  PROJECTS: {
    index: "03",
    title: "PROJECT ARCHIVE",
    progress: "05/05",
    code: "PRJ-03",
    status: "ACTIVE",
    rows: [
      {
        index: "01",
        title: "AI ATTENDANCE",
        status: "DONE",
      },
      {
        index: "02",
        title: "CHESS AI",
        status: "DONE",
      },
      {
        index: "03",
        title: "GITA AI",
        status: "DONE",
      },
      {
        index: "04",
        title: "MULTI-AGENT AI",
        status: "ACTIVE",
      },
      {
        index: "05",
        title: "PR REVIEW AGENT",
        status: "ACTIVE",
      },
    ],
    details: [
      "AI/ML projects combining computer vision, deep learning, generative AI, and agentic systems.",
      "Current work focuses on multi-agent architectures, LangGraph workflows, and intelligent automation.",
      "Projects are continuously refined into portfolio-ready systems.",
    ],
  },

  EXPERIENCE: {
    index: "04",
    title: "EXPERIENCE LOG",
    progress: "03/03",
    code: "EXP-04",
    status: "ACTIVE",
    rows: [
      {
        index: "01",
        title: "MACHINE LEARNING INTERN",
        status: "CURRENT",
      },
      {
        index: "02",
        title: "TECHNICAL CLUB",
        status: "ACTIVE",
      },
      {
        index: "03",
        title: "AI PROJECT WORK",
        status: "ACTIVE",
      },
    ],
    details: [
      "Experience working on practical machine learning and AI-focused projects.",
      "Technical leadership and coordination experience through student technology activities.",
      "Focused on building production-oriented AI systems and improving engineering skills.",
    ],
  },
};

export default function ResumePage() {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [detailOpen, setDetailOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActive((current) => Math.max(0, current - 1));
        setDetailOpen(true);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActive((current) =>
          Math.min(ITEMS.length - 1, current + 1)
        );

        setDetailOpen(true);
      }

      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        setDetailOpen(true);
      }

      if (e.key === "Escape") {
        e.preventDefault();

        if (detailOpen) {
          setDetailOpen(false);
        } else {
          navigate(-1);
        }
      }

      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, detailOpen]);

  const activeItem = ITEMS[active];
  const activeData = SECTION_DATA[activeItem.title];

  return (
    <div className="resume-page">

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <video
        className="resume-video"
        src={resumeVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* =====================================================
          VIDEO EFFECTS
      ===================================================== */}

      <div className="resume-video-overlay" />

      <div className="resume-vignette" />

      <div className="resume-scanlines" />

      <div className="resume-grid" />

      {/* =====================================================
          ENTRY FLASH
      ===================================================== */}

      <div
        className={`resume-entry ${
          mounted ? "show" : ""
        }`}
      />

      {/* =====================================================
          TOP HUD
      ===================================================== */}

      <div
        className={`resume-top-hud ${
          mounted ? "visible" : ""
        }`}
      >
        <div className="hud-left">
          <span className="hud-small">DATABASE</span>

          <span className="hud-divider">
            //
          </span>

          <span className="hud-main">
            RESUME
          </span>
        </div>

        <div className="hud-center">
          PERSONA PROFILE
        </div>

        <div className="hud-right">
          <span>2026</span>

          <span className="hud-dot">
            ●
          </span>

          <span>ONLINE</span>
        </div>
      </div>

      {/* =====================================================
          MAIN UI
      ===================================================== */}

      <main className="resume-ui">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <section className="resume-left">

          <div
            className={`resume-list-title ${
              mounted ? "visible" : ""
            }`}
          >
            <span className="title-small">
              SELECT
            </span>

            <span className="title-main">
              PROFILE
            </span>
          </div>

          <div className="resume-menu">

            {ITEMS.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={item.id}
                  className={`
                    resume-item
                    ${isActive ? "active" : ""}
                    ${mounted ? "visible" : ""}
                  `}
                  style={{
                    transitionDelay: `${
                      150 + index * 70
                    }ms`,
                  }}
                  onMouseEnter={() => {
                    setActive(index);
                    setDetailOpen(true);
                  }}
                  onClick={() => {
                    setActive(index);
                    setDetailOpen(true);
                  }}
                >

                  {/* ACTIVE MARKER */}

                  <div className="active-marker">
                    ▶
                  </div>

                  {/* NUMBER */}

                  <div className="resume-badge">
                    {item.badge}
                  </div>

                  {/* CARD */}

                  <div className="resume-card">

                    <div className="resume-card-main">

                      <div className="resume-title">
                        {item.title}
                      </div>

                      <div className="resume-rank">
                        <span>RANK</span>

                        <strong>
                          {item.rank}
                        </strong>
                      </div>

                    </div>

                    <div className="resume-subtitle">
                      {item.subtitle}
                    </div>

                    <div className="card-index">
                      0{index + 1}
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* PROFILE STATUS */}

          <div
            className={`profile-status ${
              mounted ? "visible" : ""
            }`}
          >

            <div className="status-avatar">
              SJ
            </div>

            <div className="status-info">

              <div className="status-name">
                SAKSHAM JUNEJA
              </div>

              <div className="status-role">
                AI / ML DEVELOPER
              </div>

            </div>

            <div className="status-level">
              LVL
              <strong>
                19
              </strong>
            </div>

          </div>

        </section>

        {/* =====================================================
            RIGHT DETAIL PANEL
        ===================================================== */}

        {detailOpen && (
          <section
            className="resume-detail"
            key={activeItem.id}
          >

            {/* PANEL TOP */}

            <div className="detail-topline">

              <span>
                {activeData.code}
              </span>

              <span>
                SYSTEM ACCESS
              </span>

            </div>

            {/* HEADER */}

            <div className="detail-header">

              <div className="detail-number">
                {activeData.index}
              </div>

              <div className="detail-title">
                {activeData.title}
              </div>

              <div className="detail-progress">
                {activeData.progress}
              </div>

            </div>

            {/* STATUS STRIP */}

            <div className="detail-status-strip">

              <span>
                STATUS
              </span>

              <strong>
                {activeData.status}
              </strong>

              <div className="status-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

            </div>

            {/* ROW LIST */}

            <div className="detail-list">

              {activeData.rows.map((row) => (
                <div
                  className="detail-row"
                  key={row.index}
                >

                  <div className="detail-row-number">
                    {row.index}
                  </div>

                  <div className="detail-row-title">
                    {row.title}
                  </div>

                  <div className="detail-status">
                    {row.status}
                  </div>

                </div>
              ))}

            </div>

            {/* DETAILS */}

            <div className="detail-info">

              <div className="detail-info-header">

                <span className="detail-info-title">
                  DETAILS
                </span>

                <span className="detail-info-code">
                  INFO_{activeData.index}
                </span>

              </div>

              <div className="detail-bullets">

                {activeData.details.map(
                  (text, index) => (
                    <div
                      className="detail-bullet"
                      key={index}
                    >

                      <span>
                        //
                      </span>

                      {text}

                    </div>
                  )
                )}

              </div>

            </div>

            {/* PANEL FOOTER */}

            <div className="detail-footer">

              <span>
                RESUME DATABASE
              </span>

              <span>
                {activeData.code}
              </span>

              <span>
                ONLINE ●
              </span>

            </div>

          </section>
        )}

        {/* =====================================================
            DOWNLOAD
        ===================================================== */}

        <a
          className="download-resume"
          href={resumePDF}
          download="Saksham-Juneja-Resume.pdf"
        >

          <span className="download-icon">
            ↓
          </span>

          <span>
            DOWNLOAD
          </span>

          <small>
            PDF
          </small>

        </a>

        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div className="resume-controls">

          <span>
            ↑ ↓
            <b>SELECT</b>
          </span>

          <span>
            ENTER
            <b>OPEN</b>
          </span>

          <span>
            ESC
            <b>BACK</b>
          </span>

        </div>

        {/* =====================================================
            CORNER DATA
        ===================================================== */}

        <div className="corner-data">

          <div>
            USER_ID:
            <strong>
              SJ_2007
            </strong>
          </div>

          <div>
            ACCESS:
            <strong>
              GRANTED
            </strong>
          </div>

        </div>

      </main>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        @import url(
          'https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap'
        );

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* =====================================================
           PAGE
        ===================================================== */

        .resume-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;

          background: #050b2b;

          isolation: isolate;

          font-family:
            "Bebas Neue",
            sans-serif;
        }

        /* =====================================================
           VIDEO
        ===================================================== */

        .resume-video {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          z-index: 0;

          pointer-events: none;

          filter:
            saturate(1.05)
            contrast(1.08);
        }

        /* =====================================================
           VIDEO OVERLAY
        ===================================================== */

        .resume-video-overlay {
          position: absolute;

          inset: 0;

          z-index: 1;

          pointer-events: none;

          background:

            linear-gradient(
              90deg,
              rgba(3, 8, 42, 0.82),
              rgba(3, 8, 42, 0.34) 45%,
              rgba(3, 8, 42, 0.58)
            ),

            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.28),
              rgba(0, 0, 0, 0.48)
            );
        }

        /* =====================================================
           VIGNETTE
        ===================================================== */

        .resume-vignette {
          position: absolute;

          inset: 0;

          z-index: 2;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at center,
              transparent 38%,
              rgba(0, 0, 0, 0.48) 100%
            );
        }

        /* =====================================================
           SCANLINES
        ===================================================== */

        .resume-scanlines {
          position: absolute;

          inset: 0;

          z-index: 3;

          pointer-events: none;

          opacity: 0.18;

          background:
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.04) 0px,
              rgba(255,255,255,0.04) 1px,
              transparent 1px,
              transparent 4px
            );

          mix-blend-mode: screen;
        }

        /* =====================================================
           GRID
        ===================================================== */

        .resume-grid {
          position: absolute;

          inset: 0;

          z-index: 3;

          pointer-events: none;

          opacity: 0.07;

          background-image:
            linear-gradient(
              rgba(141,246,255,0.4) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(141,246,255,0.4) 1px,
              transparent 1px
            );

          background-size:
            90px 90px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 85%
            );
        }

        /* =====================================================
           ENTRY
        ===================================================== */

        .resume-entry {
          position: absolute;

          inset: 0;

          z-index: 50;

          pointer-events: none;

          background: #8df6ff;

          transform:
            translateY(0);

          transition:
            transform 1s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );
        }

        .resume-entry.show {
          transform:
            translateY(-100%);
        }

        /* =====================================================
           TOP HUD
        ===================================================== */

        .resume-top-hud {
          position: absolute;

          top: 2.5vh;
          left: 3vw;
          right: 3vw;

          z-index: 20;

          display: flex;

          justify-content:
            space-between;

          align-items: center;

          pointer-events: none;

          color: white;

          opacity: 0;

          transform:
            translateY(-20px);

          transition:
            opacity 0.6s ease,
            transform 0.7s ease;
        }

        .resume-top-hud.visible {
          opacity: 1;

          transform:
            translateY(0);
        }

        .hud-left {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .hud-small {
          color: #8df6ff;

          font-size: 18px;

          letter-spacing: 3px;
        }

        .hud-divider {
          color: #ff5e88;

          font-size: 20px;
        }

        .hud-main {
          font-family:
            "Anton",
            sans-serif;

          font-size: 32px;

          letter-spacing: 2px;
        }

        .hud-center {
          position: absolute;

          left: 50%;

          transform:
            translateX(-50%);

          padding:
            5px 18px;

          background:
            rgba(
              141,
              246,
              255,
              0.9
            );

          color:
            #06133b;

          font-size: 16px;

          letter-spacing: 3px;

          clip-path:
            polygon(
              4% 0,
              100% 0,
              96% 100%,
              0 100%
            );
        }

        .hud-right {
          display: flex;

          align-items: center;

          gap: 10px;

          font-size: 17px;

          letter-spacing: 2px;
        }

        .hud-dot {
          color: #8df6ff;

          animation:
            blink 1.4s
            infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0.25;
          }
        }

        /* =====================================================
           UI
        ===================================================== */

.resume-ui {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 111.111vw;
  height: 111.111vh;
  transform: scale(0.9);
  transform-origin: top left;
  pointer-events: none;
}
        /* =====================================================
           LEFT
        ===================================================== */

        .resume-left {
          position: absolute;

          left: 3vw;
          top: 9vh;

          width:
            min(
              48vw,
              730px
            );

          pointer-events: auto;
        }

        /* =====================================================
           TITLE
        ===================================================== */

        .resume-list-title {
          display: flex;

          flex-direction: column;

          margin-left: 14px;

          margin-bottom: 18px;

          opacity: 0;

          transform:
            translateX(-40px);

          transition:
            opacity 0.5s ease,
            transform 0.6s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }

        .resume-list-title.visible {
          opacity: 1;

          transform:
            translateX(0);
        }

        .title-small {
          color: #8df6ff;

          font-size: 20px;

          letter-spacing: 5px;

          line-height: 1;
        }

        .title-main {
          font-family:
            "Anton",
            sans-serif;

          font-size:
            clamp(
              55px,
              6vw,
              92px
            );

          line-height: 0.85;

          color: #ffffff;

          letter-spacing: 3px;

          text-shadow:
            5px 6px 0
            rgba(
              214,
              50,
              50,
              0.8
            );
        }

        /* =====================================================
           MENU
        ===================================================== */

        .resume-menu {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }

        /* =====================================================
           ITEM
        ===================================================== */

        .resume-item {
          position: relative;

          width: 100%;

          height: 100px;

          opacity: 0;

          transform:
            translateX(-70px)
            skewX(-2deg);

          transition:
            opacity 0.55s ease,
            transform 0.6s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );

          cursor: pointer;

          pointer-events: auto;
        }

        .resume-item.visible {
          opacity: 1;

          transform:
            translateX(0)
            skewX(-2deg);
        }

        .resume-item:hover {
          transform:
            translateX(12px)
            skewX(-2deg);
        }

        /* =====================================================
           ACTIVE MARKER
        ===================================================== */

        .active-marker {
          position: absolute;

          left: -30px;

          top: 35px;

          z-index: 10;

          color: #ff5e88;

          font-size: 25px;

          opacity: 0;

          transform:
            translateX(-8px);

          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .resume-item.active
        .active-marker {
          opacity: 1;

          transform:
            translateX(0);
        }

        /* =====================================================
           CARD
        ===================================================== */

        .resume-card {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(
                8,
                17,
                67,
                0.97
              ),
              rgba(
                18,
                29,
                108,
                0.94
              )
            );

          clip-path:
            polygon(
              0 0,
              97% 0,
              100% 100%,
              3% 100%
            );

          box-shadow:
            0 8px 0
            rgba(
              0,
              0,
              0,
              0.5
            );

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .resume-item.active
        .resume-card {
          background:
            #ffffff;

          transform:
            translateX(10px);

          box-shadow:
            11px 9px 0
            #d63232;
        }

        /* =====================================================
           CARD MAIN
        ===================================================== */

        .resume-card-main {
          height: 65px;

          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          padding:
            9px
            22px
            0
            68px;
        }

        /* =====================================================
           BADGE
        ===================================================== */

        .resume-badge {
          position: absolute;

          z-index: 4;

          left: -13px;

          top: 12px;

          width: 58px;
          height: 65px;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            #08113d;

          border:
            3px solid
            #8df6ff;

          color:
            #d5fcff;

          font-size: 32px;

          transform:
            rotate(-8deg);

          clip-path:
            polygon(
              12% 0,
              100% 0,
              86% 100%,
              0 100%
            );

          box-shadow:
            0 5px 0
            rgba(
              0,
              0,
              0,
              0.35
            );

          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .resume-item.active
        .resume-badge {
          background:
            #000000;

          border-color:
            #000000;

          color:
            #ffffff;
        }

        /* =====================================================
           TITLE
        ===================================================== */

        .resume-title {
          font-family:
            "Anton",
            sans-serif;

          font-size:
            clamp(
              33px,
              3.4vw,
              54px
            );

          line-height:
            0.9;

          letter-spacing:
            1px;

          color:
            #a7f7ff;

          transition:
            color 0.25s ease;
        }

        .resume-item.active
        .resume-title {
          color:
            #000000;
        }

        /* =====================================================
           RANK
        ===================================================== */

        .resume-rank {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 1px;
          margin-right: 8px;
        }

        .resume-rank span {
          font-size: 20px;

          letter-spacing: 2px;

          color:
            #9df5ff;
        }

        .resume-rank strong {
          font-family:
            "Anton",
            sans-serif;

          font-size: 55px;

          line-height:
            0.8;

          color:
            #9df5ff;
        }

        .resume-item.active
        .resume-rank span,

        .resume-item.active
        .resume-rank strong {
          color:
            #000000;
        }

        /* =====================================================
           SUBTITLE
        ===================================================== */

        .resume-subtitle {
          position: absolute;

          left: 67px;
          right: 14px;

          bottom: 9px;

          height: 27px;

          display: flex;

          align-items: center;

          padding-left: 17px;

          background:
            #85f4ff;

          color:
            #06133b;

          font-size: 21px;

          letter-spacing:
            1.5px;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 9px) 100%,
              0 100%
            );

          transition:
            background 0.25s ease,
            color 0.25s ease;
        }

        .resume-item.active
        .resume-subtitle {
          background:
            #000000;

          color:
            #ffffff;
        }

        /* =====================================================
           CARD INDEX
        ===================================================== */

        .card-index {
          position: absolute;

          right: 16px;

          bottom: 39px;

          font-size: 13px;

          letter-spacing:
            2px;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );
        }

        .resume-item.active
        .card-index {
          color:
            rgba(
              0,
              0,
              0,
              0.35
            );
        }

        /* =====================================================
           PROFILE STATUS
        ===================================================== */

        .profile-status {
          display: flex;

          align-items: center;

          width:
            min(
              100%,
              520px
            );

          margin-top: 18px;

          padding:
            8px 14px;

          background:
            rgba(
              4,
              12,
              53,
              0.88
            );

          border-left:
            4px solid
            #8df6ff;

          clip-path:
            polygon(
              0 0,
              100% 0,
              97% 100%,
              0 100%
            );

          opacity: 0;

          transform:
            translateY(15px);

          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }

        .profile-status.visible {
          opacity: 1;

          transform:
            translateY(0);
        }

        .status-avatar {
          width: 45px;
          height: 45px;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            #8df6ff;

          color:
            #06133b;

          font-family:
            "Anton",
            sans-serif;

          font-size: 20px;

          clip-path:
            polygon(
              8% 0,
              100% 0,
              92% 100%,
              0 100%
            );
        }

        .status-info {
          margin-left: 12px;
        }

        .status-name {
          color:
            #ffffff;

          font-family:
            "Anton",
            sans-serif;

          font-size: 22px;

          letter-spacing:
            1px;
        }

        .status-role {
          color:
            #8df6ff;

          font-size: 14px;

          letter-spacing:
            2px;
        }

        .status-level {
          margin-left: auto;

          color:
            rgba(
              141,
              246,
              255,
              0.65
            );

          font-size: 13px;

          letter-spacing:
            2px;

          display: flex;

          align-items:
            center;

          gap: 6px;
        }

        .status-level strong {
          color:
            #ffffff;

          font-family:
            "Anton",
            sans-serif;

          font-size: 30px;
        }

        /* =====================================================
           RIGHT DETAIL PANEL
        ===================================================== */

        .resume-detail {
          position: absolute;

          top: 10vh;

          right: 4vw;

          width:
            min(
              40vw,
              620px
            );

          min-height:
            73vh;

          padding: 18px;

          background:
            linear-gradient(
              180deg,
              rgba(
                13,
                27,
                105,
                0.98
              ),
              rgba(
                5,
                12,
                53,
                0.98
              )
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 22px) 100%,
              0 100%
            );

          box-shadow:
            16px 16px 0
            rgba(
              0,
              0,
              0,
              0.55
            );

          pointer-events:
            auto;

          animation:
            detailIn 0.45s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }

        @keyframes detailIn {
          from {
            opacity: 0;

            transform:
              translateX(70px)
              scale(0.97);
          }

          to {
            opacity: 1;

            transform:
              translateX(0)
              scale(1);
          }
        }

        /* =====================================================
           TOPLINE
        ===================================================== */

        .detail-topline {
          display: flex;

          justify-content:
            space-between;

          align-items:
            center;

          padding:
            0 5px 7px;

          color:
            rgba(
              141,
              246,
              255,
              0.65
            );

          font-size: 13px;

          letter-spacing:
            2px;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .detail-header {
          display: grid;

          grid-template-columns:
            62px
            1fr
            auto;

          align-items: center;

          gap: 12px;

          min-height: 82px;

          padding:
            0 15px;

          background:
            linear-gradient(
              90deg,
              #8df6ff,
              #d5fdff
            );

          color:
            #07143f;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 15px) 100%,
              0 100%
            );

          box-shadow:
            9px 0 0
            #ff5e88;
        }

        .detail-number {
          font-family:
            "Anton",
            sans-serif;

          font-size: 43px;
        }

        .detail-title {
          font-family:
            "Anton",
            sans-serif;

          font-size:
            clamp(
              26px,
              2.5vw,
              40px
            );

          line-height:
            0.9;
        }

        .detail-progress {
          font-size: 29px;

          letter-spacing:
            2px;
        }

        /* =====================================================
           STATUS STRIP
        ===================================================== */

        .detail-status-strip {
          display: flex;

          align-items: center;

          gap: 12px;

          height: 34px;

          padding:
            0 12px;

          margin-top: 12px;

          background:
            #020821;

          color:
            #8df6ff;

          font-size: 14px;

          letter-spacing:
            2px;

          clip-path:
            polygon(
              0 0,
              100% 0,
              98% 100%,
              0 100%
            );
        }

        .detail-status-strip strong {
          color:
            #ffffff;

          font-size: 15px;
        }

        .status-bars {
          margin-left: auto;

          display: flex;

          gap: 4px;
        }

        .status-bars i {
          display: block;

          width: 17px;

          height: 7px;

          background:
            #8df6ff;

          transform:
            skewX(-20deg);
        }

        .status-bars i:nth-child(5) {
          background:
            #ff5e88;
        }

        /* =====================================================
           ROW LIST
        ===================================================== */

        .detail-list {
          display: flex;

          flex-direction:
            column;

          gap: 8px;

          margin-top: 15px;
        }

        .detail-row {
          display: grid;

          grid-template-columns:
            38px
            1fr
            auto;

          align-items:
            center;

          gap: 10px;

          min-height: 52px;

          padding:
            0 12px;

          background:
            rgba(
              5,
              14,
              61,
              0.96
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 12px) 100%,
              0 100%
            );

          border-left:
            2px solid
            rgba(
              141,
              246,
              255,
              0.22
            );

          transition:
            transform 0.18s ease,
            background 0.18s ease;
        }

        .detail-row:hover {
          transform:
            translateX(7px);

          background:
            rgba(
              18,
              38,
              119,
              0.96
            );
        }

        .detail-row-number {
          font-size: 21px;

          color:
            #91f5ff;
        }

        .detail-row-title {
          font-family:
            "Anton",
            sans-serif;

          font-size:
            clamp(
              17px,
              1.7vw,
              25px
            );

          line-height: 1;

          color:
            #f2fcff;
        }

        .detail-status {
          padding:
            5px 9px;

          background:
            #8df6ff;

          color:
            #06133b;

          font-size: 16px;

          letter-spacing:
            1px;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 7px) 100%,
              0 100%
            );
        }

        /* =====================================================
           INFO
        ===================================================== */

        .detail-info {
          margin-top: 17px;

          padding: 15px;

          background:
            rgba(
              3,
              10,
              44,
              0.98
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 15px) 100%,
              0 100%
            );
        }

        .detail-info-header {
          display: flex;

          align-items:
            center;

          justify-content:
            space-between;

          margin-bottom: 11px;
        }

        .detail-info-title {
          color:
            #91f5ff;

          font-size: 25px;

          letter-spacing:
            2px;
        }

        .detail-info-code {
          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 12px;

          letter-spacing:
            2px;
        }

        .detail-bullets {
          display: flex;

          flex-direction:
            column;

          gap: 9px;
        }

        .detail-bullet {
          display: flex;

          gap: 9px;

          font-family:
            "Anton",
            sans-serif;

          font-size:
            clamp(
              15px,
              1.3vw,
              20px
            );

          line-height:
            1.18;

          color:
            #edfaff;
        }

        .detail-bullet span {
          color:
            #ff5e88;

          flex-shrink:
            0;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .detail-footer {
          position: absolute;

          left: 20px;
          right: 24px;

          bottom: 13px;

          display: flex;

          justify-content:
            space-between;

          font-size: 13px;

          letter-spacing:
            2px;

          color:
            rgba(
              141,
              246,
              255,
              0.5
            );
        }

        /* =====================================================
           DOWNLOAD
        ===================================================== */

        .download-resume {
          position: absolute;

          left: 3vw;

          bottom: 3vh;

          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 250px;

          height: 55px;

          padding:
            0 20px;

          background:
            #8df6ff;

          color:
            #06133b;

          text-decoration:
            none;

          font-family:
            "Bebas Neue",
            sans-serif;

          font-size: 25px;

          letter-spacing:
            2px;

          clip-path:
            polygon(
              0 0,
              96% 0,
              100% 100%,
              4% 100%
            );

          box-shadow:
            8px 7px 0
            #d63232;

          pointer-events:
            auto;

          opacity: 0;

          transform:
            translateX(-40px);

          animation:
            downloadIn 0.6s
            0.6s
            forwards;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        @keyframes downloadIn {
          to {
            opacity: 1;

            transform:
              translateX(0);
          }
        }

        .download-resume:hover {
          background:
            #ffffff;

          transform:
            translate(
              5px,
              -4px
            );

          box-shadow:
            11px 10px 0
            #d63232;
        }

        .download-resume:active {
          transform:
            translate(
              7px,
              5px
            );

          box-shadow:
            4px 4px 0
            #000000;
        }

        .download-icon {
          font-family:
            Arial,
            sans-serif;

          font-size: 26px;

          font-weight:
            900;
        }

        .download-resume small {
          margin-left: auto;

          padding:
            3px 6px;

          background:
            #06133b;

          color:
            #8df6ff;

          font-size: 11px;

          letter-spacing:
            1px;

          clip-path:
            polygon(
              5% 0,
              100% 0,
              95% 100%,
              0 100%
            );
        }

        /* =====================================================
           CONTROLS
        ===================================================== */

        .resume-controls {
          position: absolute;

          right: 3vw;

          bottom: 3vh;

          display: flex;

          gap: 22px;

          color:
            rgba(
              230,
              252,
              255,
              0.8
            );

          font-size: 14px;

          letter-spacing:
            1.5px;

          pointer-events:
            none;

          opacity: 0;

          animation:
            controlsIn 0.5s
            1s
            forwards;
        }

        .resume-controls span {
          display: flex;

          gap: 7px;

          align-items:
            center;
        }

        .resume-controls b {
          color:
            #8df6ff;

          font-weight:
            normal;
        }

        @keyframes controlsIn {
          to {
            opacity: 1;
          }
        }

        /* =====================================================
           CORNER DATA
        ===================================================== */

        .corner-data {
          position: absolute;

          right: 3vw;

          top: 9vh;

          display: flex;

          flex-direction:
            column;

          gap: 5px;

          color:
            rgba(
              141,
              246,
              255,
              0.48
            );

          font-size: 11px;

          letter-spacing:
            2px;

          text-align:
            right;

          pointer-events:
            none;
        }

        .corner-data strong {
          color:
            #ffffff;

          font-weight:
            normal;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .resume-left {
            width:
              48vw;
          }

          .resume-detail {
            width:
              45vw;

            right:
              2vw;
          }

          .resume-title {
            font-size:
              40px;
          }

          .resume-rank strong {
            font-size:
              50px;
          }

          .hud-center {
            display:
              none;
          }

        }

        @media (max-width: 800px) {

          .resume-left {
            left:
              2vw;

            top:
              7vh;

            width:
              50vw;
          }

          .resume-detail {
            top:
              7vh;

            right:
              2vw;

            width:
              46vw;

            min-height:
              78vh;

            padding:
              11px;
          }

          .resume-item {
            height:
              88px;
          }

          .resume-title {
            font-size:
              30px;
          }

          .resume-rank {
            display:
              none;
          }

          .resume-subtitle {
            font-size:
              18px;
          }

          .detail-row-title {
            font-size:
              15px;
          }

          .detail-status {
            font-size:
              13px;
          }

          .detail-bullet {
            font-size:
              14px;
          }

          .download-resume {
            min-width:
              200px;

            height:
              48px;

            font-size:
              20px;
          }

          .resume-controls {
            display:
              none;
          }

          .corner-data {
            display:
              none;
          }

          .profile-status {
            width:
              90%;
          }

        }

      `}</style>

    </div>
  );
}