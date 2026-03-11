import { useState, useEffect } from 'react';
import { formatDate, computeResetDay } from '../utils';

export default function Header({ appState }) {
  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    const interval = setInterval(() => setDate(formatDate()), 60000);
    return () => clearInterval(interval);
  }, []);

  const streakLabel = appState.sleepResetActive
    ? `${appState.streak} ⏸`
    : appState.streak;

  const RESET_DAY_LABELS = ['Tonight', 'Day 1 of 4', 'Day 2 of 4', 'Day 3 of 4', 'Day 4 of 4'];
  const resetDayLabel = RESET_DAY_LABELS[computeResetDay(appState.sleepResetStartDate)];

  return (
    <header className="header">
      <div className="logo">
        FIT<span>PROTOCOL</span>
      </div>
      <div className="header-right">
        {appState.sleepResetActive && (
          <div className="sleep-reset-header-badge" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.5)',
            borderRadius: '4px',
            padding: '0.4rem 0.9rem',
          }}>
            <span style={{ fontSize: '1rem' }}>🌙</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em', color: '#c4b5fd' }}>
                SLEEP RESET
              </span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.55rem', color: '#a78bfa', letterSpacing: '0.06em' }}>
                {resetDayLabel.toUpperCase()} · STREAK PROTECTED 🛡
              </span>
            </div>
          </div>
        )}
        <div className="streak-badge">
          <span className="streak-flame">🔥</span>
          <span className="streak-count">{streakLabel}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>DAY STREAK</span>
        </div>
        <div className="date-display">{date}</div>
      </div>
    </header>
  );
}
