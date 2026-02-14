import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [yesSize, setYesSize] = useState(20);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNoClick = () => {
    setYesSize((prev) => prev + 10);
    setNoClickCount((prev) => prev + 1);
    
    // Make "No" button jump to random position (smaller range on mobile)
    const range = isMobile ? 80 : 200;
    const rangeY = isMobile ? 40 : 100;
    
    setNoPosition({
      x: Math.random() * range - range / 2,
      y: Math.random() * rangeY - rangeY / 2,
    });
  };

  const handleYesClick = () => {
    // Navigate to yes page with celebration
    navigate('/yes');
  };

  return (
    <div style={styles.container}>
      {/* Floating background hearts */}
      <div style={styles.backgroundHearts}>
        {[...Array(isMobile ? 10 : 15)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingHeart,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: isMobile ? '25px' : '30px',
            }}
          >
            {['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div style={styles.card} className="card">
        <div style={styles.heartContainer}>
          <div style={styles.mainHeart} className="main-heart">
            💝
          </div>
        </div>

        <h1 style={styles.heading} className="heading">
          Will you be my Valentine?
        </h1>
        
        <p style={styles.subtext}>
          Choose wisely... 😊
        </p>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleYesClick}
            style={{
              ...styles.yesButton,
              fontSize: `${Math.min(yesSize, isMobile ? 40 : 60)}px`,
              padding: `${Math.min(yesSize / 2, isMobile ? 20 : 30)}px ${Math.min(yesSize, isMobile ? 40 : 60)}px`,
            }}
            className="yes-button"
          >
            Yes ❤️
          </button>

          <button
            onClick={handleNoClick}
            style={{
              ...styles.noButton,
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
            className="no-button"
          >
            No
          </button>
        </div>

        {noClickCount >= 3 && (
          <p style={styles.hint} className="hint">
            Hint: The "Yes" button is getting bigger for a reason! 😉
          </p>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(-5deg);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-20px) translateX(5px) rotate(3deg);
            opacity: 0.6;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .main-heart {
          animation: heartBeat 1.5s infinite ease-in-out;
          filter: drop-shadow(0 5px 15px rgba(255, 20, 147, 0.4));
        }

        .yes-button {
          animation: pulse 2s infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .yes-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }

        .yes-button:hover {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 10px 40px rgba(255, 20, 147, 0.6);
          filter: brightness(1.2);
        }

        .yes-button:active {
          transform: scale(0.95);
        }

        .no-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          touch-action: manipulation;
        }

        .no-button:hover {
          background-color: #c76b8a;
        }

        .no-button:active {
          transform: scale(0.95);
        }

        .hint {
          animation: fadeInUp 0.5s ease-out;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .card {
            max-width: 90% !important;
            padding: 40px 30px !important;
            margin: 20px !important;
          }

          .main-heart {
            font-size: 60px !important;
          }

          .heading {
            font-size: 32px !important;
          }

          .yes-button {
            max-width: 200px !important;
          }

          .no-button {
            padding: 12px 24px !important;
            font-size: 18px !important;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 30px 20px !important;
          }

          .main-heart {
            font-size: 50px !important;
          }

          .heading {
            font-size: 28px !important;
          }

          .yes-button {
            max-width: 180px !important;
          }

          .no-button {
            padding: 10px 20px !important;
            font-size: 16px !important;
          }
        }

        /* Landscape mode for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .card {
            padding: 20px 30px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }

          .main-heart {
            font-size: 40px !important;
          }

          .heading {
            font-size: 24px !important;
            margin-bottom: 5px !important;
          }

          .yes-button {
            max-width: 150px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #feada6 100%)",
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: "hidden",
    padding: "10px",
  },
  backgroundHearts: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
  },
  floatingHeart: {
    position: "absolute",
    fontSize: "30px",
    animation: "float 8s infinite ease-in-out",
    opacity: 0.4,
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "60px 80px",
    borderRadius: "30px",
    boxShadow: "0 25px 60px rgba(255, 20, 147, 0.3), 0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    animation: "fadeInScale 0.6s ease-out",
    zIndex: 1,
    border: "2px solid rgba(255, 255, 255, 0.5)",
    maxWidth: "600px",
    width: "100%",
  },
  heartContainer: {
    marginBottom: "30px",
  },
  mainHeart: {
    fontSize: "80px",
    display: "inline-block",
  },
  heading: {
    color: "#ff1493",
    fontSize: "48px",
    marginBottom: "10px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    lineHeight: "1.2",
  },
  subtext: {
    color: "#ff69b4",
    fontSize: "20px",
    marginBottom: "40px",
    fontStyle: "italic",
    fontWeight: "400",
  },
  buttonContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "100px",
  },
  yesButton: {
    backgroundColor: "#ff1493",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 5px 20px rgba(255, 20, 147, 0.4)",
    minHeight: "48px",
    touchAction: "manipulation",
  },
  noButton: {
    backgroundColor: "#db7093",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "10px 20px",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "500",
    boxShadow: "0 3px 10px rgba(219, 112, 147, 0.3)",
    whiteSpace: "nowrap",
    minHeight: "48px",
    touchAction: "manipulation",
  },
  hint: {
    marginTop: "30px",
    color: "#ff69b4",
    fontSize: "16px",
    fontStyle: "italic",
    opacity: 0.9,
  },
};
