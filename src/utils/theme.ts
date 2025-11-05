export const getThemeClasses = (isDarkMode: boolean) => ({
  // Text colors
  text: {
    primary: isDarkMode ? 'text-white' : 'text-slate-900',
    secondary: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    tertiary: isDarkMode ? 'text-slate-500' : 'text-slate-500',
  },

  // Background colors
  bg: {
    primary: isDarkMode ? 'bg-slate-900/80' : 'bg-white/90',
    secondary: isDarkMode ? 'bg-slate-800/50' : 'bg-white/70',
    card: isDarkMode ? 'from-slate-800/50 to-slate-900/50' : 'from-white/80 to-slate-50/80',
    glass: isDarkMode ? 'bg-slate-900/50' : 'bg-white/60',
  },

  // Border colors
  border: {
    primary: isDarkMode ? 'border-slate-700/50' : 'border-slate-200/80',
    secondary: isDarkMode ? 'border-slate-700/30' : 'border-slate-200/50',
  },

  // Card styles
  card: isDarkMode
    ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50'
    : 'bg-gradient-to-br from-white/80 to-slate-50/80 border-slate-200/80',

  // Glass effect
  glass: isDarkMode
    ? 'bg-slate-900/80 backdrop-blur-md'
    : 'bg-white/90 backdrop-blur-md',
});
