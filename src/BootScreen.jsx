import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(true);

  const sequence = [
    "> Initializing core system...",
    "> Loading kernel modules... [OK]",
    "> Establishing connection to Z-Axis Tunnel... [OK]",
    "> Bypassing security protocols... [ACCESS GRANTED]",
    "> Welcome to the terminal, Soham Vora."
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    
    const showNextLine = () => {
      if (currentLineIndex < sequence.length) {
        setLines(prev => [...prev, sequence[currentLineIndex]]);
        currentLineIndex++;
        
        // Random delay between lines for realism (150ms to 600ms)
        const delay = Math.floor(Math.random() * 450) + 150;
        setTimeout(showNextLine, delay);
      } else {
        setIsTyping(false);
        // Wait 1.5 seconds after final line before completing
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1500);
      }
    };

    // Start sequence after a tiny delay
    const initialDelay = setTimeout(showNextLine, 300);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#050505",
        color: "var(--accent-cyan, #00f0ff)",
        fontFamily: "var(--font-mono, monospace)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "10vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%", fontSize: "1.2rem", lineHeight: "1.8" }}>
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ 
              marginBottom: "10px",
              color: line.includes("GRANTED") || line.includes("OK") ? "var(--accent-cyan)" : 
                     line.includes("Soham Vora") ? "var(--accent-purple, #bd00ff)" : "rgba(255,255,255,0.7)",
              textShadow: line.includes("GRANTED") || line.includes("Soham Vora") ? "0 0 10px currentColor" : "none"
            }}
          >
            {line}
          </motion.div>
        ))}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{
              display: "inline-block",
              width: "10px",
              height: "1.2rem",
              backgroundColor: "var(--accent-cyan, #00f0ff)",
              marginLeft: "8px",
              verticalAlign: "middle"
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
