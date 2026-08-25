import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const projectBg =
  "https://videotourl.com/videos/1787649841783-b6fcec6a-9c07-4f40-88cc-8d720106d189.mp4";
const PROJECTS = [
  {
    id: "attendance",
    title: "AI ATTENDANCE SYSTEM",
    description:
      "Computer vision based attendance system using face recognition.",
    category: "AI / ML",
    tech: "PYTHON • OPENCV",
    github: "#",
    featured: true,
  },
  {
    id: "chess",
    title: "CHESS AI",
    description:
      "Neural network based chess move prediction and analysis system.",
    category: "DEEP LEARNING",
    tech: "PYTHON • CNN • NUMPY",
    github: "#",
    featured: true,
  },
  {
    id: "meeting",
    title: "AI MEETING ASSISTANT",
    description:
      "AI powered meeting transcription, summarization and knowledge retrieval.",
    category: "GENERATIVE AI",
    tech: "WHISPER • LANGCHAIN • CHROMA",
    github: "#",
    featured: true,
  },
  {
    id: "pr-review",
    title: "PR REVIEW AGENT",
    description:
      "Multi-agent system designed to analyze and review GitHub pull requests.",
    category: "AI AGENTS",
    tech: "LANGGRAPH • LLM • PYTHON",
    github: "#",
    featured: false,
  },
  {
    id: "gita",
    title: "BHAGAVAD GITA AI",
    description:
      "Conversational AI system for asking questions and exploring the Bhagavad Gita.",
    category: "RAG",
    tech: "PYTHON • RAG • LLM",
    github: "#",
    featured: false,
  },
  {
    id: "sazy",
    title: "SAZY",
    description:
      "Modern e-commerce platform with a custom frontend experience.",
    category: "WEB",
    tech: "REACT • JAVASCRIPT • CSS",
    github: "#",
    featured: false,
  },
];

export default function Projects() {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [section, setSection] = useState("featured");

  const featuredProjects = PROJECTS.filter(
    (project) => project.featured
  );

  const allProjects = PROJECTS;

  const visibleProjects =
    section === "featured"
      ? featuredProjects
      : allProjects;

  // ============================================================
  // KEEP ACTIVE INDEX VALID
  // ============================================================

  useEffect(() => {
    if (active >= visibleProjects.length) {
      setActive(0);
    }
  }, [visibleProjects.length, active]);

  // ============================================================
  // KEYBOARD CONTROLS
  //
  // ↑ ↓  = SELECT
  // ← →  = SECTION
  // ENTER = OPEN
  // ESC   = BACK HOME
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ========================================================
      // ESC → GO BACK TO HOME
      // ========================================================

      if (e.key === "Escape") {
        e.preventDefault();
        navigate("/");
        return;
      }

      // ========================================================
      // DOWN
      // ========================================================

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActive((current) =>
          Math.min(
            current + 1,
            visibleProjects.length - 1
          )
        );

        return;
      }

      // ========================================================
      // UP
      // ========================================================

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActive((current) =>
          Math.max(current - 1, 0)
        );

        return;
      }

      // ========================================================
      // RIGHT → SWITCH SECTION
      // ========================================================

      if (e.key === "ArrowRight") {
        e.preventDefault();

        setSection((current) =>
          current === "featured"
            ? "all"
            : "featured"
        );

        setActive(0);

        return;
      }

      // ========================================================
      // LEFT → SWITCH SECTION
      // ========================================================

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        setSection((current) =>
          current === "all"
            ? "featured"
            : "all"
        );

        setActive(0);

        return;
      }

      // ========================================================
      // ENTER → OPEN GITHUB
      // ========================================================

      if (e.key === "Enter") {
        e.preventDefault();

        const project =
          visibleProjects[active];

        if (
          project?.github &&
          project.github !== "#"
        ) {
          window.open(
            project.github,
            "_blank",
            "noopener,noreferrer"
          );
        }

        return;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    active,
    visibleProjects,
    navigate,
  ]);

  // ============================================================
  // OPEN PROJECT
  // ============================================================

  const openProject = (project) => {
    if (
      project.github &&
      project.github !== "#"
    ) {
      window.open(
        project.github,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      <style>{`

        /* =====================================================
           RESET
        ===================================================== */

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          overflow: hidden;
          background: #08a9d8;
        }


        /* =====================================================
           PROJECT PAGE
        ===================================================== */

        .projects-page {
          position: fixed;
          inset: 0;

          width: 100vw;
          height: 100vh;

          overflow: hidden;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          color: #050505;

          background: #08a9d8;

          isolation: isolate;
        }


        /* =====================================================
           ANIMATED VIDEO BACKGROUND
        ===================================================== */

        .projects-bg-video {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          z-index: -3;

          pointer-events: none;
        }


        /* =====================================================
           VIDEO DARK OVERLAY
        ===================================================== */

        .projects-page::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            rgba(0, 0, 0, 0.18);

          z-index: -2;

          pointer-events: none;
        }


        /* =====================================================
           HALFTONE
        ===================================================== */

        .projects-page::after {
          content: "";

          position: absolute;

          inset: 0;

          background-image:
            radial-gradient(
              rgba(0, 0, 0, 0.22) 1px,
              transparent 1px
            );

          background-size: 7px 7px;

          opacity: 0.12;

          z-index: -1;

          pointer-events: none;
        }


        /* =====================================================
           TOP LEFT
        ===================================================== */

        .projects-top-left {
          position: absolute;

          top: 10px;
          left: 12px;

          z-index: 20;

          padding:
            4px
            9px;

          background: #050505;

          color: white;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 2px;

          text-transform: uppercase;

          transform:
            skewX(-10deg);
        }


        /* =====================================================
           TOP RIGHT
        ===================================================== */

        .projects-top-right {
          position: absolute;

          top: 10px;
          right: 15px;

          z-index: 20;

          padding:
            4px
            9px;

          background: white;

          color: #111;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 1px;

          transform:
            skewX(-10deg);

          box-shadow:
            4px 3px 0
            rgba(0,0,0,.4);
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .projects-header {
          position: absolute;

          top: 34px;
          left: 32px;

          z-index: 15;
        }


        .projects-title {
          margin: 0;

          font-family:
            Impact,
            "Arial Black",
            sans-serif;

          font-size:
            clamp(58px, 7vw, 105px);

          line-height: .8;

          letter-spacing: 1px;

          font-style: italic;

          transform:
            skewX(-7deg);

          color: white;

          text-shadow:
            5px 5px 0 #050505;
        }


        .projects-title span {
          display: inline-block;

          background: white;

          color: #050505;

          padding:
            2px 8px 4px;

          margin-right: 4px;

          transform:
            rotate(-2deg);

          text-shadow: none;
        }


        /* =====================================================
           ESC LABEL
        ===================================================== */

        .projects-back {
          position: absolute;

          left: 220px;
          top: 33px;

          padding:
            3px 7px;

          background: white;

          color: #111;

          font-size: 7px;

          font-weight: 900;

          letter-spacing: 1px;

          white-space: nowrap;

          transform:
            rotate(-2deg);

          box-shadow:
            2px 2px 0
            rgba(0,0,0,.5);
        }


        /* =====================================================
           FEATURED SECTION
        ===================================================== */

        .projects-section {
          position: absolute;

          top: 118px;
          left: 34px;

          z-index: 15;

          display: flex;

          align-items: center;

          gap: 8px;
        }


        .section-slash {
          width: 20px;
          height: 6px;

          background: white;

          transform:
            skewX(-25deg);
        }


        .section-title {
          font-size: 12px;

          font-weight: 900;

          letter-spacing: 2px;

          color: white;

          text-shadow:
            2px 2px 0
            rgba(0,0,0,.6);
        }


        .section-subtitle {
          font-size: 7px;

          letter-spacing: 2px;

          color:
            rgba(255,255,255,.72);
        }


        /* =====================================================
           FEATURED GRID
        ===================================================== */

        .projects-grid {
          position: absolute;

          top: 145px;

          left: 34px;
          right: 34px;

          z-index: 15;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 16px;

          max-width: 920px;
        }


        /* =====================================================
           PROJECT CARD
        ===================================================== */

        .project-card {
          position: relative;

          min-height: 112px;

          padding:
            14px
            13px
            11px;

          background: #050505;

          color: white;

          cursor: pointer;

          transform:
            skewX(-4deg);

          border:
            2px solid #050505;

          box-shadow:
            7px 7px 0
            rgba(0,0,0,.32);

          transition:
            transform .22s
            cubic-bezier(.16,1,.3,1),

            box-shadow .22s ease,

            background .18s ease;
        }


        .project-card > * {
          transform:
            skewX(4deg);
        }


        .project-card:hover {
          transform:
            skewX(-4deg)
            translateY(-5px);

          box-shadow:
            10px 11px 0
            rgba(0,0,0,.35);
        }


        .project-card.active {
          background: white;

          color: #080808;

          transform:
            skewX(-4deg)
            translateY(-5px);

          box-shadow:
            10px 10px 0
            #050505;
        }


        /* =====================================================
           TAG
        ===================================================== */

        .project-tag {
          position: absolute;

          top: -9px;
          right: 10px;

          padding:
            3px
            7px;

          background: #050505;

          color: white;

          font-size: 7px;

          font-weight: 900;

          letter-spacing: 1px;

          transform:
            skewX(5deg);

          z-index: 3;
        }


        .project-card.active
        .project-tag {
          background: #111;
        }


        /* =====================================================
           NUMBER
        ===================================================== */

        .project-number {
          font-size: 7px;

          font-weight: 900;

          letter-spacing: 2px;

          opacity: .65;

          margin-bottom: 8px;
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .project-title {
          margin: 0;

          font-family:
            "Arial Black",
            Impact,
            sans-serif;

          font-size: 16px;

          line-height: .95;

          letter-spacing: .5px;

          color: #12c7f2;

          text-transform: uppercase;
        }


        .project-card.active
        .project-title {
          color: #050505;
        }


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .project-description {
          margin-top: 8px;

          max-width: 95%;

          font-size: 8px;

          line-height: 1.35;

          opacity: .7;
        }


        /* =====================================================
           TECH
        ===================================================== */

        .project-tech {
          position: absolute;

          left: 13px;
          bottom: 10px;

          font-size: 7px;

          font-weight: 900;

          letter-spacing: 1px;

          opacity: .65;
        }


        /* =====================================================
           GITHUB BUTTON
        ===================================================== */

        .project-button {
          position: absolute;

          right: 10px;
          bottom: 8px;

          padding:
            4px
            8px;

          border: none;

          background: #11c4ee;

          color: #050505;

          font-size: 6px;

          font-weight: 900;

          letter-spacing: 1px;

          cursor: pointer;

          transform:
            skewX(-8deg);

          transition:
            transform .15s ease;
        }


        .project-button:hover {
          transform:
            skewX(-8deg)
            scale(1.08);
        }


        .project-card.active
        .project-button {
          background: #050505;

          color: white;
        }


        /* =====================================================
           ALL REPOSITORIES
        ===================================================== */

        .all-section {
          position: absolute;

          top: 283px;
          left: 34px;

          z-index: 15;

          display: flex;

          align-items: center;

          gap: 8px;
        }


        .all-title {
          color: white;

          font-size: 12px;

          font-weight: 900;

          letter-spacing: 2px;

          text-shadow:
            2px 2px 0
            rgba(0,0,0,.6);
        }


        .repo-count {
          color:
            rgba(255,255,255,.65);

          font-size: 7px;

          letter-spacing: 2px;
        }


        /* =====================================================
           REPOSITORY GRID
        ===================================================== */

        .repo-grid {
          position: absolute;

          top: 311px;

          left: 34px;
          right: 34px;

          z-index: 15;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0,1fr)
            );

          gap: 16px;

          max-width: 920px;
        }


        /* =====================================================
           REPOSITORY CARD
        ===================================================== */

        .repo-card {
          position: relative;

          min-height: 112px;

          padding:
            14px
            13px;

          background: #f5f4ed;

          color: #111;

          cursor: pointer;

          transform:
            skewX(-4deg);

          border:
            2px solid #050505;

          box-shadow:
            7px 7px 0
            rgba(0,0,0,.28);

          transition:
            transform .2s ease,

            box-shadow .2s ease;
        }


        .repo-card > * {
          transform:
            skewX(4deg);
        }


        .repo-card:hover,
        .repo-card.active {
          transform:
            skewX(-4deg)
            translateY(-5px);

          box-shadow:
            10px 10px 0
            #050505;
        }


        .repo-card.active {
          outline:
            3px solid #12c7f2;

          outline-offset: -5px;
        }


        .repo-title {
          margin: 0;

          font-family:
            "Arial Black",
            Impact,
            sans-serif;

          font-size: 15px;

          line-height: .95;

          color: #111;
        }


        .repo-description {
          margin-top: 9px;

          font-size: 8px;

          line-height: 1.35;

          color: #444;

          max-width: 92%;
        }


        .repo-tech {
          position: absolute;

          top: -8px;
          right: 10px;

          padding:
            3px
            7px;

          background: #050505;

          color: white;

          font-size: 6px;

          font-weight: 900;

          letter-spacing: 1px;
        }


        .repo-open {
          position: absolute;

          right: 10px;
          bottom: 8px;

          padding:
            4px
            8px;

          background: #11c4ee;

          color: #050505;

          font-size: 6px;

          font-weight: 900;

          letter-spacing: 1px;

          border: none;

          cursor: pointer;
        }


        /* =====================================================
           SIDE MARKER
        ===================================================== */

        .side-marker {
          position: absolute;

          right: 20px;
          bottom: 75px;

          z-index: 20;

          writing-mode:
            vertical-rl;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 3px;

          color:
            rgba(255,255,255,.65);
        }


        /* =====================================================
           SELECTED INFO
        ===================================================== */

        .selected-info {
          position: absolute;

          right: 30px;
          bottom: 35px;

          z-index: 25;

          width: 190px;

          padding: 12px;

          background:
            rgba(0,0,0,.82);

          color: white;

          border-left:
            5px solid #11c4ee;

          transform:
            skewX(-6deg);
        }


        .selected-info > * {
          transform:
            skewX(6deg);
        }


        .selected-label {
          font-size: 7px;

          letter-spacing: 2px;

          color: #11c4ee;

          font-weight: 900;
        }


        .selected-name {
          margin-top: 4px;

          font-family:
            "Arial Black",
            Impact,
            sans-serif;

          font-size: 15px;

          line-height: .95;
        }


        .selected-category {
          margin-top: 7px;

          font-size: 7px;

          letter-spacing: 1px;

          opacity: .6;
        }


        /* =====================================================
           BOTTOM CONTROLS
        ===================================================== */

        .projects-controls {
          position: absolute;

          left: 12px;
          bottom: 8px;

          z-index: 30;

          display: flex;

          align-items: center;

          gap: 12px;

          font-size: 7px;

          font-weight: 900;

          letter-spacing: 1px;

          color: white;

          text-shadow:
            1px 1px 0 #050505;
        }


        .control {
          display: flex;

          align-items: center;

          gap: 4px;
        }


        .key {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-width: 22px;

          height: 16px;

          padding:
            0 4px;

          background: white;

          color: #050505;

          border:
            1px solid #050505;

          font-size: 7px;

          box-shadow:
            2px 2px 0 #050505;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 800px) {

          .projects-grid,
          .repo-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              );
          }

          .projects-header {
            left: 20px;
          }

          .projects-grid,
          .repo-grid {
            left: 20px;
            right: 20px;
          }

          .projects-section,
          .all-section {
            left: 20px;
          }

          .selected-info {
            display: none;
          }
        }


        @media (max-width: 550px) {

          .projects-grid,
          .repo-grid {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            top: 135px;
          }

          .repo-grid {
            top: 275px;
          }

          .all-section {
            top: 247px;
          }

          .project-card,
          .repo-card {
            min-height: 95px;
          }

          .projects-title {
            font-size: 52px;
          }

          .projects-back {
            left: 170px;
          }

          .projects-controls {
            gap: 6px;
          }
        }

      `}</style>


      <div className="projects-page">

        {/* =====================================================
            ANIMATED BACKGROUND VIDEO
        ===================================================== */}

        <video
          className="projects-bg-video"
          src={projectBg}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />


        {/* =====================================================
            TOP LABELS
        ===================================================== */}

        <div className="projects-top-left">
          PORTFOLIO // SAKSHAM JUNEJA
        </div>

        <div className="projects-top-right">
          AI / ML • SOFTWARE • CREATIVE
        </div>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="projects-header">

          <h1 className="projects-title">
            <span>PROJ</span>ECTS
          </h1>

          <div className="projects-back">
            ESC - BACK
          </div>

        </header>


        {/* =====================================================
            FEATURED
        ===================================================== */}

        <div className="projects-section">

          <div className="section-slash" />

          <div className="section-title">
            FEATURED
          </div>

          <div className="section-subtitle">
            SELECTED WORK
          </div>

        </div>


        {/* =====================================================
            FEATURED PROJECTS
        ===================================================== */}

        <div className="projects-grid">

          {featuredProjects.map(
            (project, index) => {

              const isActive =
                section === "featured" &&
                active === index;

              return (
                <div
                  key={project.id}

                  className={`
                    project-card
                    ${isActive ? "active" : ""}
                  `}

                  onClick={() => {
                    setSection("featured");
                    setActive(index);
                  }}

                  onDoubleClick={() =>
                    openProject(project)
                  }
                >

                  <div className="project-tag">
                    {project.category}
                  </div>

                  <div className="project-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <h2 className="project-title">
                    {project.title}
                  </h2>

                  <div className="project-description">
                    {project.description}
                  </div>

                  <div className="project-tech">
                    {project.tech}
                  </div>

                  <button
                    className="project-button"

                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project);
                    }}
                  >
                    VIEW ON GITHUB →
                  </button>

                </div>
              );
            }
          )}

        </div>


        {/* =====================================================
            ALL REPOSITORIES
        ===================================================== */}

        <div className="all-section">

          <div className="section-slash" />

          <div className="all-title">
            ALL REPOSITORIES
          </div>

          <div className="repo-count">
            {PROJECTS.length} REPOSITORIES
          </div>

        </div>


        {/* =====================================================
            REPOSITORY GRID
        ===================================================== */}

        <div className="repo-grid">

          {allProjects
            .slice(0, 6)
            .map((project, index) => {

              const repoIndex = index;

              const isActive =
                section === "all" &&
                active === repoIndex;

              return (
                <div
                  key={`repo-${project.id}`}

                  className={`
                    repo-card
                    ${isActive ? "active" : ""}
                  `}

                  onClick={() => {
                    setSection("all");
                    setActive(repoIndex);
                  }}

                  onDoubleClick={() =>
                    openProject(project)
                  }
                >

                  <div className="repo-tech">
                    {project.tech.split("•")[0]}
                  </div>

                  <h2 className="repo-title">
                    {project.title}
                  </h2>

                  <div className="repo-description">
                    {project.description}
                  </div>

                  <button
                    className="repo-open"

                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project);
                    }}
                  >
                    VIEW ON GITHUB →
                  </button>

                </div>
              );
            })}

        </div>


        {/* =====================================================
            SELECTED PROJECT
        ===================================================== */}

        <div className="selected-info">

          <div className="selected-label">
            CURRENTLY SELECTED
          </div>

          <div className="selected-name">
            {visibleProjects[active]?.title}
          </div>

          <div className="selected-category">
            {visibleProjects[active]?.category}
            {" • "}
            {visibleProjects[active]?.tech}
          </div>

        </div>


        {/* =====================================================
            SIDE MARKER
        ===================================================== */}

        <div className="side-marker">
          PROJECT DATABASE // 2026
        </div>


        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div className="projects-controls">

          <div className="control">
            <span className="key">
              ↑↓
            </span>
            SELECT
          </div>

          <div className="control">
            <span className="key">
              ←→
            </span>
            SECTION
          </div>

          <div className="control">
            <span className="key">
              ENTER
            </span>
            OPEN
          </div>

          <div className="control">
            <span className="key">
              ESC
            </span>
            BACK
          </div>

        </div>

      </div>
    </>
  );
}