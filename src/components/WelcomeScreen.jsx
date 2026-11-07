import { useEffect, useState } from "react";
import { Code2, UserRound, Globe } from "lucide-react";

function WelcomeScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let finishTimer;

    const timer = setTimeout(() => {
      setVisible(false);

      finishTimer = setTimeout(() => {
        onFinish();
      }, 700);
    }, 4300);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center
      bg-[#0b0f19] transition-opacity duration-700
      ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="welcome-content px-6 text-center">
        {/* Icons appear one by one */}
        <div className="mb-8 flex justify-center gap-6 text-blue-400">
          <Code2 size={30} className="welcome-icon welcome-icon-1" />
          <UserRound size={30} className="welcome-icon welcome-icon-2" />
          <Globe size={30} className="welcome-icon welcome-icon-3" />
        </div>

        {/* Welcome title */}
        <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl [font-family:'Space_Grotesk',sans-serif]">
          <span className="block">
            <span className="welcome-word welcome-word-1">Welcome</span>{" "}
            <span className="welcome-word welcome-word-2">to</span>{" "}
            <span className="welcome-word welcome-word-3">My</span>
          </span>

          <span className="welcome-second-line block">Portfolio Website</span>
        </h1>

        {/* Name */}
        <p className="welcome-name mt-5 text-sm uppercase tracking-[0.3em] text-gray-400">
          Dicky Setiawan
        </p>

        {/* Loading bar */}
        <div className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-gray-800">
          <div className="welcome-loading h-full rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
