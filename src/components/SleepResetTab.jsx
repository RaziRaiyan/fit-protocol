import { useState } from 'react';
import { SLEEP_STEPS } from '../data';
import { todayStr } from '../utils';

function CheckSvg({ color = '#fff' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const RESET_TIMELINE = [
  { label: 'Tonight', content: "Sleep late — it's okay. Don't fight it.", sleep: 'Target: Sleep by 1:00 AM' },
  { label: 'Day 1', content: 'Wake at 6:30–7 AM despite tiredness. Sunlight immediately.', sleep: 'Target: Sleep by 11:30 PM' },
  { label: 'Day 2', content: 'Morning gym + sunlight. Stop caffeine after 1 PM.', sleep: 'Target: Sleep by 11:00 PM' },
  { label: 'Day 3', content: 'Wind-down routine active. Back to protocol sleep schedule.', sleep: 'Target: Sleep by 10:30 PM → Back to 10 PM' },
  { label: 'Day 4', content: '✓ Full protocol resumes. Streak continues.', sleep: 'Back to: 10:00 PM sleep / 5:15 AM wake' },
];

export default function SleepResetTab({ appState, setAppState }) {
  const [expandedStep, setExpandedStep] = useState(null);
  const [sleepTime, setSleepTime] = useState('01:00');
  const [wakeTime, setWakeTime] = useState('07:00');

  const isActive = appState.sleepResetActive;
  const currentDay = appState.sleepResetDay || 0;
  const dateKey = appState.sleepResetStartDate || todayStr();

  function toggleSleepReset() {
    if (isActive) {
      setAppState(prev => ({
        ...prev,
        sleepResetActive: false,
        sleepResetDay: 0,
        sleepResetStartDate: null,
        sleepResetReason: null,
        sleepStepChecks: {},
        sleepLogs: [],
      }));
    } else {
      setAppState(prev => ({
        ...prev,
        sleepResetActive: true,
        sleepResetStartDate: todayStr(),
        sleepResetDay: 0,
        sleepResetReason: null,
        sleepStepChecks: prev.sleepStepChecks || {},
        sleepLogs: prev.sleepLogs || [],
      }));
    }
  }

  function setResetReason(reason) {
    setAppState(prev => ({
      ...prev,
      sleepResetReason: prev.sleepResetReason === reason ? null : reason,
    }));
  }

  function toggleSleepStep(stepId) {
    const key = `${dateKey}_${stepId}`;
    setAppState(prev => ({
      ...prev,
      sleepStepChecks: {
        ...(prev.sleepStepChecks || {}),
        [key]: !(prev.sleepStepChecks || {})[key],
      },
    }));
  }

  function logSleepEntry() {
    if (!sleepTime || !wakeTime) return;
    setAppState(prev => {
      const currentDay = prev.sleepResetDay || 0;
      return {
        ...prev,
        sleepLogs: [...(prev.sleepLogs || []), { date: todayStr(), sleep: sleepTime, wake: wakeTime }],
        sleepResetDay: currentDay < 4 ? currentDay + 1 : currentDay,
      };
    });
  }

  const resetDayNum = Math.min((currentDay || 0) + 1, 4);

  return (
    <div className="tab-panel active" id="panel-sleep">
      <div className="container">
        <div className="section-title">🌙 SLEEP RESET PROTOCOL</div>
        <div className="section-sub">CIRCADIAN RHYTHM FIX — 2 TO 4 DAY RESET</div>

        {/* Status Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.3rem', letterSpacing: '0.08em', color: '#c4b5fd', marginBottom: '0.4rem' }}>
                SLEEP PATTERN STATUS
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', maxWidth: '500px', lineHeight: 1.6 }}>
                {isActive
                  ? `Reset in progress (Day ${resetDayNum} of 4). Follow the 8 steps daily. Your fitness streak is paused and protected.`
                  : "Your sleep pattern is fine. If your schedule breaks due to travel, late nights, or unexpected events — activate reset mode below. Your fitness streak will be protected while you fix your sleep."}
              </div>
              {isActive && (
                <div style={{ marginTop: '0.7rem' }}>
                  <span className="streak-protected">🛡 Streak Protected — Day {resetDayNum} of 4</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-end' }}>
              <button
                className={`sleep-trigger-btn${isActive ? ' active-mode' : ''}`}
                onClick={toggleSleepReset}
              >
                <span>{isActive ? '✓' : '⚠️'}</span>
                <span>{isActive ? 'Sleep Fixed — Exit Reset' : 'My Sleep Pattern Broke'}</span>
              </button>
              {!isActive && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', color: 'var(--muted)' }}>Reason:</span>
                  {[['travel', '✈️ Travel'], ['work', '💼 Urgent Work'], ['social', '🎉 Social'], ['other', '💤 Other']].map(([val, lbl]) => (
                    <button
                      key={val}
                      className={`srb-day-pill${appState.sleepResetReason === val ? ' active' : ''}`}
                      onClick={() => setResetReason(val)}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4-Day Reset Timeline */}
        <div className="reset-timeline">
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Reset Timeline
          </div>
          {RESET_TIMELINE.map((row, i) => {
            let statusClass = 'pending';
            let statusText = '—';
            if (isActive) {
              if (i < currentDay) { statusClass = 'done'; statusText = '✓ Done'; }
              else if (i === currentDay) { statusClass = 'today'; statusText = '← Today'; }
              else { statusClass = 'pending'; statusText = 'Upcoming'; }
            }
            const isLast = i === RESET_TIMELINE.length - 1;
            const isCurrentDay = isActive && i === currentDay;
            return (
              <div key={i} className="reset-day-row" style={isLast ? { borderBottom: 'none' } : undefined}>
                <div className="rdr-label" style={isCurrentDay ? { color: 'var(--accent2)' } : undefined}>{row.label}</div>
                <div className="rdr-content">
                  <div style={isCurrentDay ? { color: 'var(--text)' } : undefined}>{row.content}</div>
                  <div className="rdr-sleep">{row.sleep}</div>
                </div>
                <div className={`rdr-status ${statusClass}`}>{statusText}</div>
              </div>
            );
          })}
        </div>

        {/* Sleep Log (shown during reset) */}
        {isActive && (
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.2rem', letterSpacing: '0.08em', color: '#c4b5fd', marginBottom: '0.2rem' }}>
              LAST NIGHT'S SLEEP
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '1.2rem' }}>
              Fill this in each morning after waking up
            </div>
            <div className="sleep-log-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <span className="sleep-log-label">SLEPT AT</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: '#a78bfa' }}>(LAST NIGHT)</span>
              </div>
              <input type="time" className="sleep-time-input" value={sleepTime} onChange={e => setSleepTime(e.target.value)} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <span className="sleep-log-label">WOKE AT</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: '#a78bfa' }}>(THIS MORNING)</span>
              </div>
              <input type="time" className="sleep-time-input" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
              <button className="sleep-log-btn" onClick={logSleepEntry}>LOG ENTRY</button>
            </div>
            {(appState.sleepLogs || []).length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                {[...(appState.sleepLogs || [])].reverse().slice(0, 4).map((log, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '0.4rem 0', fontFamily: "'Space Mono',monospace", fontSize: '0.68rem', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                    <span>{log.date}</span>
                    <span>💤 Slept: <span style={{ color: '#c4b5fd' }}>{log.sleep}</span></span>
                    <span>🌅 Woke: <span style={{ color: '#c4b5fd' }}>{log.wake}</span></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 8-Step Protocol */}
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.5rem', letterSpacing: '0.08em', marginBottom: '1rem', marginTop: '0.5rem' }}>
          THE 8-STEP RESET PROTOCOL
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: "'Space Mono',monospace", marginBottom: '1.5rem' }}>
          TAP A STEP TO EXPAND DETAILS • CHECK OFF AS YOU COMPLETE EACH DAY
        </div>

        {SLEEP_STEPS.map((step, idx) => {
          const key = `${dateKey}_${step.id}`;
          const done = !!(appState.sleepStepChecks && appState.sleepStepChecks[key]);
          const isExpanded = expandedStep === idx;

          return (
            <div
              key={step.id}
              className={`sleep-step-card${done ? ' step-done' : ''}${isExpanded ? ' expanded' : ''}`}
            >
              <div className="step-number">{idx + 1}</div>
              <div className="step-content" onClick={() => setExpandedStep(isExpanded ? null : idx)}>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
                <div className="step-detail">
                  {step.detail.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              </div>
              <div
                className="step-check"
                onClick={(e) => { e.stopPropagation(); toggleSleepStep(step.id); }}
              >
                {done && <CheckSvg />}
              </div>
            </div>
          );
        })}

        {/* Key Rules */}
        <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', padding: '1.3rem', marginTop: '1rem' }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
            ⚡ Key Rules During Reset
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              'Do NOT sleep in past 7 AM, even if you slept late',
              'No caffeine after 1 PM — it delays melatonin by 6–8 hours',
              'Morning sunlight is the single most powerful reset tool',
              'Dim all lights after 9 PM — blue light blocks melatonin',
              'Magnesium Glycinate 200–400mg, 30–60 min before bed (optional)',
              "If you can't sleep after 20 min — get up, read, dim lights, return when sleepy",
            ].map((rule, i) => (
              <div key={i} style={{ fontSize: '0.8rem', display: 'flex', gap: '0.6rem' }}>
                <span style={{ color: '#7c3aed' }}>▸</span> {rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
