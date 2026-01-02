import { useState, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Gamepad2, CalendarHeart } from 'lucide-react';
import Home from './Home';
import LockScreen from './components/LockScreen';
import MusicPlayer from './components/MusicPlayer';
import BackgroundEffects from './components/BackgroundEffects';
import RelationshipQuiz from './components/RelationshipQuiz';
import DateScheduler from './components/DateScheduler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const musicRef = useRef(null);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    // Trigger music play immediately on user interaction
    if (musicRef.current) {
      musicRef.current.playMusic();
    }
  };

  return (
    <ThemeProvider>
      <BackgroundEffects />

      {/* LockScreen covers everything until unlocked */}
      <LockScreen onUnlock={handleUnlock} />

      {/* Main Content - Visible behind the lock screen (fading in/out) */}
      <div className={isAuthenticated ? 'pointer-events-auto' : 'pointer-events-none'}>
        <Home />
      </div>

      {/* Music player triggers when authenticated */}
      <MusicPlayer ref={musicRef} />
    </ThemeProvider>
  );
}

export default App;
