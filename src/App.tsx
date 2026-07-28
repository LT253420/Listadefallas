import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Preloader } from './components/Preloader';
import { LoginScreen, PasswordVerification } from './screens/LoginScreen';
import { HomeScreen, HowToUseScreen, ContactScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import SecuritySystem from "./Security/SecuritySystem";
import Watermark from "./Security/Watermark";

type Screen = 'home' | 'search' | 'howToUse' | 'contact';

// Hook para proteccion basica contra screenshots
const useScreenshotProtection = () => {
  useEffect(() => {
    // Prevenir click derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevenir atajos de teclado comunes para capturas
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir Print Screen, Ctrl+P, Ctrl+Shift+I, F12
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detectar cuando la pagina pierde el foco (posible captura)
    const handleBlur = () => {
      // Opcional: mostrar mensaje de advertencia
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);
};

// Main application content
const AppContent: React.FC = () => {
  const { user, loading, isAuthenticated, isSecondFactorVerified } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);

  // Aplicar proteccion
  useScreenshotProtection();

  // Scroll al inicio cuando cambia la pantalla
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  // Handle preloader completion
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setIsLoading(false);
  }, []);

  // Check auth state and show password verification if needed
  useEffect(() => {
    if (!isLoading && user && !isSecondFactorVerified) {
      setShowPasswordVerification(true);
    } else {
      setShowPasswordVerification(false);
    }
  }, [isLoading, user, isSecondFactorVerified]);

  // Handle password verification success
  const handlePasswordSuccess = useCallback(() => {
    setShowPasswordVerification(false);
  }, []);

  // Handle password verification cancel
  const handlePasswordCancel = useCallback(() => {
    setShowPasswordVerification(false);
  }, []);

  // Render preloader
  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} duration={2000} />;
  }

  // Render loading state
  if (isLoading) {
    return null;
  }

  // Render login if not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  // Render password verification if needed
  if (showPasswordVerification) {
    return (
      <PasswordVerification
        onSuccess={handlePasswordSuccess}
        onCancel={handlePasswordCancel}
      />
    );
  }

  // Render main app if authenticated
  if (isAuthenticated) {
    const renderScreen = () => {
      switch (currentScreen) {
        case 'search':
          return <SearchScreen onBack={() => setCurrentScreen('home')} />;
        case 'howToUse':
          return <HowToUseScreen onBack={() => setCurrentScreen('home')} />;
        case 'contact':
          return <ContactScreen onBack={() => setCurrentScreen('home')} />;
        default:
          return <HomeScreen onNavigate={setCurrentScreen} />;
      }
    };

    return renderScreen();
  }

  // Render password verification as fallback
  return (
    <PasswordVerification
      onSuccess={handlePasswordSuccess}
      onCancel={handlePasswordCancel}
    />
  );
};

// Root App component with providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SecuritySystem />
        <Watermark />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;