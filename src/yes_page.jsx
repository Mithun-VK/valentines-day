import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function YesPage() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Generate celebration hearts (fewer on mobile)
    const heartCount = window.innerWidth <= 768 ? 25 : 40;
    const celebrationHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: `heart-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 20 + Math.random() * 30,
    }));
    setHearts(celebrationHearts);

    // Generate confetti (fewer on mobile)
    const confettiCount = window.innerWidth <= 768 ? 35 : 60;
    const confettiPieces = Array.from({ length: confettiCount }, (_, i) => ({
      id: `confetti-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 3 + Math.random() * 2,
      color: ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#ff85c1'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
    }));
    setConfetti(confettiPieces);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={styles.container}>
      {/* Floating background hearts */}
      <div style={styles.backgroundHearts}>
        {[...Array(isMobile ? 12 : 20)].map((_, i) => (
          <div
            key={`bg-heart-${i}`}
            style={{
              ...styles.floatingHeart,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              fontSize: isMobile ? `${15 + Math.random() * 15}px` : `${20 + Math.random() * 20}px`,
            }}
          >
            {['💖', '💕', '💗', '💓', '❤️'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Rising celebration hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...styles.celebrationHeart,
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: isMobile ? `${heart.size * 0.7}px` : `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            ...styles.confettiPiece,
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
            width: isMobile ? '8px' : '10px',
            height: isMobile ? '8px' : '10px',
          }}
        />
      ))}

      <div style={styles.card} className="card">
        {/* Animated heart with glow */}
        <div style={styles.heartContainer}>
          <div style={styles.heart} className="heart">
            💖
          </div>
          <div style={styles.heartGlow}></div>
        </div>

        <h1 style={styles.title} className="title">
          I knew you would accept me
        </h1>
        
        <p style={styles.subtitle}>
          This was inevitable. Some decisions are just meant to be. ✨
        </p>

        <div style={styles.messageBox}>
          <p style={styles.message}>
            "In a world full of choices, you chose me. And that makes all the difference." 💕
          </p>
        </div>

        {/* Decorative elements */}
        <div style={styles.decorativeHearts}>
          <span style={styles.miniHeart} className="mini-heart">💗</span>
          <span style={{...styles.miniHeart, animationDelay: '0.3s'}} className="mini-heart">💓</span>
          <span style={{...styles.miniHeart, animationDelay: '0.6s'}} className="mini-heart">💕</span>
        </div>

        <button 
          onClick={() => navigate('/')} 
          style={styles.backButton}
          className="back-button"
        >
          ← Start Over
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

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

        @keyframes riseAndFade {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) rotate(180deg) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.5);
            opacity: 0.5;
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 20, 147, 0.8);
            opacity: 0.8;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInTitle {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card {
          animation: fadeIn 0.8s ease-out;
        }

        .heart {
          animation: pulse 1.5s infinite ease-in-out;
        }

        .title {
          animation: slideInTitle 1s ease-out 0.3s both;
        }

        .mini-heart {
          animation: bounce 2s infinite ease-in-out;
        }

        .back-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-button:hover {
          transform: translateX(-5px);
          box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
        }

        .back-button:active {
          transform: scale(0.95);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .card {
            max-width: 90% !important;
            padding: 40px 30px !important;
            margin: 20px !important;
          }

          .heart {
            font-size: 60px !important;
          }

          .title {
            font-size: 28px !important;
            line-height: 1.2 !important;
          }

          .mini-heart {
            font-size: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 30px 20px !important;
          }

          .heart {
            font-size: 50px !important;
          }

          .title {
            font-size: 24px !important;
          }
        }

        /* Landscape mode for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .card {
            padding: 20px 30px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }

          .heart {
            font-size: 40px !important;
          }

          .title {
            font-size: 22px !important;
            margin-bottom: 10px !important;
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
    animation: "float 8s infinite ease-in-out",
    opacity: 0.4,
  },
  celebrationHeart: {
    position: "fixed",
    animation: "riseAndFade 4s ease-out forwards",
    bottom: "-50px",
    pointerEvents: "none",
  },
  confettiPiece: {
    position: "fixed",
    width: "10px",
    height: "10px",
    animation: "confettiFall 4s linear forwards",
    top: "-10vh",
    pointerEvents: "none",
    borderRadius: "2px",
  },
  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "60px 80px",
    borderRadius: "30px",
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(255, 20, 147, 0.3), 0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    maxWidth: "600px",
    width: "100%",
    zIndex: 1,
  },
  heartContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "30px",
  },
  heart: {
    fontSize: "80px",
    position: "relative",
    zIndex: 2,
    filter: "drop-shadow(0 5px 15px rgba(255, 20, 147, 0.4))",
  },
  heartGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255, 20, 147, 0.3), transparent)",
    animation: "glow 2s infinite ease-in-out",
    zIndex: 1,
  },
  title: {
    fontSize: "42px",
    color: "#ff1493",
    marginBottom: "20px",
    letterSpacing: "0.5px",
    fontWeight: "700",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    lineHeight: "1.3",
  },
  subtitle: {
    fontSize: "20px",
    color: "#ff69b4",
    opacity: 0.95,
    marginBottom: "30px",
    fontWeight: "400",
    lineHeight: "1.6",
  },
  messageBox: {
    background: "linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 105, 180, 0.2))",
    padding: "25px 30px",
    borderRadius: "20px",
    marginTop: "30px",
    border: "1px solid rgba(255, 105, 180, 0.3)",
    boxShadow: "0 5px 15px rgba(255, 105, 180, 0.2)",
  },
  message: {
    fontSize: "18px",
    color: "#d91a60",
    fontStyle: "italic",
    margin: 0,
    lineHeight: "1.6",
    fontWeight: "500",
  },
  decorativeHearts: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  },
  miniHeart: {
    fontSize: "30px",
    display: "inline-block",
    filter: "drop-shadow(0 2px 5px rgba(255, 20, 147, 0.3))",
  },
  backButton: {
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 105, 180, 0.3)",
    minHeight: "48px",
    touchAction: "manipulation",
  },
};
