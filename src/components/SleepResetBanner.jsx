import { todayStr } from '../utils';

export default function SleepResetBanner({ appState, setAppState, onNavigate }) {
  if (!appState.sleepResetActive) return null;

  const reasonLabels = {
    travel: '✈️ Travel',
    work: '💼 Urgent Work',
    social: '🎉 Social',
    other: '💤 Other',
  };

  const dayLabels = ['Tonight', 'Day 1', 'Day 2', 'Day 3', 'Day 4 ✓'];
  const currentDay = appState.sleepResetDay || 0;

  function advanceResetDay(i) {
    setAppState(prev => ({ ...prev, sleepResetDay: Math.max(prev.sleepResetDay || 0, i) }));
  }

  function exitSleepReset() {
    setAppState(prev => ({
      ...prev,
      sleepResetActive: false,
      sleepResetDay: 0,
      sleepResetStartDate: null,
      sleepResetReason: null,
      sleepStepChecks: {},
      sleepLogs: [],
    }));
  }

  const subText = appState.sleepResetReason
    ? `Reason: ${reasonLabels[appState.sleepResetReason]} · Follow the 8-step circadian protocol · Streak is paused, not broken.`
    : 'Follow the 8-step circadian reset protocol. Your streak is paused, not broken.';

  return (
    <div className="sleep-reset-banner visible" onClick={onNavigate} style={{ cursor: 'pointer' }}>
      <div className="srb-icon">🌙</div>
      <div className="srb-text">
        <div className="srb-title">SLEEP RESET MODE ACTIVE — STREAK PROTECTED</div>
        <div className="srb-sub">{subText}</div>
      </div>
      <div className="srb-day-pills" onClick={e => e.stopPropagation()}>
        {dayLabels.map((label, i) => (
          <button
            key={i}
            className={`srb-day-pill${i === currentDay ? ' active' : ''}${i < currentDay ? ' done' : ''}`}
            onClick={i <= currentDay + 1 && i > currentDay ? () => advanceResetDay(i) : undefined}
            title={i <= currentDay + 1 && i > currentDay ? 'Mark this day done' : undefined}
          >
            {label}
          </button>
        ))}
      </div>
      <button className="srb-exit-btn" onClick={e => { e.stopPropagation(); exitSleepReset(); }}>✓ Sleep Fixed</button>
    </div>
  );
}
