interface AnimatedBackgroundProps {
  isDarkMode: boolean;
}

export const AnimatedBackground = ({ isDarkMode }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-500">
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-white via-blue-50 to-slate-100'
      }`}></div>

      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-opacity duration-500 ${
        isDarkMode
          ? 'from-cyan-900/20 via-transparent to-transparent'
          : 'from-cyan-400/10 via-transparent to-transparent'
      }`}></div>

      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
        isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-300/20'
      }`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
        isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
      }`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
        isDarkMode ? 'bg-teal-500/10' : 'bg-teal-300/20'
      }`} style={{ animationDelay: '2s' }}></div>

      <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-gradient-to-b transition-all duration-500 ${
              isDarkMode ? 'from-cyan-400/20' : 'from-cyan-500/30'
            } to-transparent`}
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              width: '2px',
              height: `${Math.random() * 100 + 50}px`,
              animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        <div className={`absolute top-10 left-10 w-2 h-2 rounded-full animate-ping transition-colors duration-500 ${
          isDarkMode ? 'bg-cyan-400' : 'bg-cyan-500'
        }`}></div>
        <div className={`absolute top-20 right-20 w-2 h-2 rounded-full animate-ping transition-colors duration-500 ${
          isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
        }`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute bottom-20 left-20 w-2 h-2 rounded-full animate-ping transition-colors duration-500 ${
          isDarkMode ? 'bg-teal-400' : 'bg-teal-500'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-10 right-10 w-2 h-2 rounded-full animate-ping transition-colors duration-500 ${
          isDarkMode ? 'bg-cyan-400' : 'bg-cyan-500'
        }`} style={{ animationDelay: '1.5s' }}></div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
