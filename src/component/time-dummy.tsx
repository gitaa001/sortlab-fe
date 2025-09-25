"use client";
import { useEffect, useState } from "react";

export default function RemainingTime() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 42,
    seconds: 0,
  });

  useEffect(() => {
    // Deadline dummy: 12 hari dari sekarang
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 12);
    deadline.setHours(deadline.getHours() + 6);
    deadline.setMinutes(deadline.getMinutes() + 42);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline.getTime() - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#471BCC] text-white rounded-2xl p-4 shadow flex flex-col items-center justify-center">
      <h2 className="text-sm opacity-80 mb-1">Remaining Time</h2>
      <p className="text-lg font-semibold tracking-wide">
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
        {timeLeft.seconds}s
      </p>
    </div>
  );
}
