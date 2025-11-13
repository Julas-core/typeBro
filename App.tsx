
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, TestResult } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import TypingTest from './components/TypingTest';
import TestResults from './components/TestResults';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Auth from './components/Auth';
import { SettingsProvider, SettingsContext } from './contexts/SettingsContext';
import { themes } from './themes';
import { Theme as ThemeType } from './themes';


// Function to dynamically load a font from Google Fonts
const loadFont = (fontFamily: string) => {
    if (!fontFamily || fontFamily === 'Custom') return;

    const fontId = `font-${fontFamily.replace(/[\s,']/g, '-')}`;
    if (document.getElementById(fontId)) {
        return; // Font already loaded or loading
    }

    const link = document.createElement('link');
    const fontName = fontFamily.split(',')[0].replace(/'/g, ''); // Get font name like 'Roboto Mono'
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s/g, '+')}:wght@400;500;700&display=swap`;
    
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = fontUrl;
    
    document.head.appendChild(link);
};


const AppContent: React.FC = () => {
    const [view, setView] = useState<View>(View.TypingTest);
    const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        loadFont(settings.fontFamily);
    }, [settings.fontFamily]);

    useEffect(() => {
        const applyTheme = (themeName: string) => {
            const theme: ThemeType = themes[themeName] || themes['matrix'];
            const root = document.documentElement;
            root.style.setProperty('--bg-color', theme.bg);
            root.style.setProperty('--text-color', theme.text);
            root.style.setProperty('--primary-color', theme.primary);
            root.style.setProperty('--primary-dark-color', theme.primaryDark || theme.secondary);
            root.style.setProperty('--secondary-color', theme.secondary);
            root.style.setProperty('--error-color', theme.error);
            root.style.setProperty('--caret-color', theme.caret);
        };
        applyTheme(settings.theme);
    }, [settings.theme]);

    const handleTestComplete = useCallback((result: TestResult) => {
        setLastTestResult(result);
        setView(View.Results);
    }, []);

    const renderView = () => {
        switch (view) {
            case View.TypingTest:
                return <TypingTest onTestComplete={handleTestComplete} />;
            case View.Results:
                return lastTestResult ? <TestResults result={lastTestResult} /> : <TypingTest onTestComplete={handleTestComplete} />;
            case View.Leaderboard:
                return <Leaderboard />;
            case View.Profile:
                return <Profile />;
            case View.Settings:
                return <Settings />;
            case View.Auth:
                return <Auth />;
            default:
                return <TypingTest onTestComplete={handleTestComplete} />;
        }
    };

    const mainStyle = {
        fontFamily: settings.fontFamily,
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg" style={mainStyle}>
            <Header setView={setView} />
            <main className="w-full max-w-6xl flex-grow flex items-center justify-center py-8">
                {renderView()}
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => {
    return (
        <SettingsProvider>
            <AppContent />
        </SettingsProvider>
    );
};

export default App;
