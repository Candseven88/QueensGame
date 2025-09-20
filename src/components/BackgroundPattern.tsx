import React from "react";

interface BackgroundPatternProps {
  className?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = "" }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #6366f1 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle 600px at 50% 0%, rgba(139, 92, 246, 0.1), transparent 70%)",
        }}
      />
    </div>
  );
};

export const DarkBackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = "" }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0f172a 40%, #1e1b4b 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(139, 92, 246, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle 600px at 50% 0%, rgba(139, 92, 246, 0.2), transparent 70%)",
        }}
      />
    </div>
  );
};
