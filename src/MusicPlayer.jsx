import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import playerImage from "./assets/player.png";
import diskImage from "./assets/disk.svg";

const TRACK = {
  title: "Persona 3",
  artist: "Persona 3",
  src: "/music/Persona3.mp3",
};

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const location = useLocation();

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ============================================================
  // PLAY / PAUSE
  // ============================================================

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  // ============================================================
  // AUDIO EVENTS
  // ============================================================

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleEnded = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {});
  };

  // ============================================================
  // SEEK
  // ============================================================

  const handleSeek = (e) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const percentage =
      (e.clientX - rect.left) / rect.width;

    audio.currentTime =
      percentage * duration;
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) {
      return "0:00";
    }

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  // ============================================================
  // HOME
  // ============================================================

  const isHomePage =
    location.pathname === "/";

  // ============================================================
  // DEBUG
  // ============================================================

  useEffect(() => {
    console.log(
      "🎵 MusicPlayer MOUNTED"
    );

    return () => {
      console.log(
        "🛑 MusicPlayer UNMOUNTED"
      );
    };
  }, []);

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      <style>{`
        .p3-music {
          pointer-events: auto !important;
          position: fixed;
          z-index: 999999;
        }

        .p3-music button {
          pointer-events: auto;
        }
      `}</style>

      {/* ======================================================
          THIS AUDIO MUST NEVER BE CONDITIONAL
      ====================================================== */}

      <audio
        key="global-persona-3-audio"
        ref={audioRef}
        src={TRACK.src}
        preload="auto"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* ======================================================
          CONTROLS ONLY ON HOME
      ====================================================== */}

      {isHomePage && (
        <div
          className={`p3-music ${
            playing ? "is-playing" : ""
          }`}
        >
          <img
            src={playerImage}
            className="p3-player-body"
            alt=""
          />

          <div className="p3-player-ui">

            {/* SONG */}

            <div className="p3-song-section">
              <div className="p3-marquee">
                <div className="p3-marquee-track">
                  <span>{TRACK.title}</span>
                  <span>{TRACK.title}</span>
                </div>
              </div>
            </div>

            {/* DISK */}

            <div className="p3-disk-area">

              <button
                className="p3-skip p3-prev"
                onClick={() => {
                  const audio =
                    audioRef.current;

                  if (!audio) return;

                  audio.currentTime = 0;

                  if (audio.paused) {
                    audio.play().catch(() => {});
                  }
                }}
              >
                ◀
              </button>

              <img
                src={diskImage}
                className={`p3-disk ${
                  playing
                    ? "p3-disk-playing"
                    : ""
                }`}
                alt=""
              />

              <button
                className="p3-skip p3-next"
                onClick={() => {
                  const audio =
                    audioRef.current;

                  if (!audio) return;

                  audio.currentTime = 0;

                  if (audio.paused) {
                    audio.play().catch(() => {});
                  }
                }}
              >
                ▶
              </button>

            </div>

            {/* CONTROLS */}

            <div className="p3-bottom-controls">

              <button
                className="p3-play"
                onClick={togglePlay}
              >
                {playing ? "Ⅱ" : "▶"}
              </button>

              <div className="p3-time">
                {formatTime(currentTime)}
              </div>

              <div
                className="p3-progress"
                onClick={handleSeek}
              >
                <div
                  className="p3-progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />

                <div
                  className="p3-progress-dot"
                  style={{
                    left: `${progress}%`,
                  }}
                />
              </div>

              <div className="p3-time">
                -
                {formatTime(
                  Math.max(
                    0,
                    duration - currentTime
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}