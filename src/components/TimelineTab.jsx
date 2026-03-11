import { DAYS } from '../data';
import { getScheduleForDay, getDayKey, getTodayDayIdx, todayStr } from '../utils';

function CheckSvg({ color = '#000' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function computeStreak(appState) {
  const today = todayStr();
  const todayIdx = getTodayDayIdx();
  const schedule = getScheduleForDay(todayIdx);
  const dayKey = getDayKey(todayIdx);
  let done = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (appState.timelineChecks[`${dayKey}_${i}`]) done++;
  }
  const pct = schedule.length > 0 ? done / schedule.length : 0;

  let streak = appState.streak || 0;
  let lastStreakDate = appState.lastStreakDate;

  if (pct >= 0.8) {
    if (lastStreakDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yd = yesterday.toISOString().split('T')[0];
      if (lastStreakDate === yd) {
        streak = streak + 1;
      } else if (!lastStreakDate) {
        streak = 1;
      } else {
        streak = 1;
      }
      lastStreakDate = today;
    }
  }
  return { streak, lastStreakDate };
}

function computeWeekScore(timelineChecks) {
  let totalPossible = 0, totalDone = 0;
  DAYS.forEach((_, idx) => {
    const schedule = getScheduleForDay(idx);
    const dayKey = getDayKey(idx);
    totalPossible += schedule.length;
    for (let i = 0; i < schedule.length; i++) {
      if (timelineChecks[`${dayKey}_${i}`]) totalDone++;
    }
  });
  return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
}

export default function TimelineTab({ appState, setAppState, selectedDay, setSelectedDay }) {
  const schedule = getScheduleForDay(selectedDay);
  const dayKey = getDayKey(selectedDay);
  const dayName = DAYS[selectedDay];
  const todayDayIdx = getTodayDayIdx();

  const typeLabel = selectedDay === 6 ? 'SUNDAY — RECOVERY + PREP DAY'
    : selectedDay === 5 ? 'SATURDAY — FULL BODY + REST'
    : `WEEKDAY — ${dayName.toUpperCase()}`;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let doneCount = 0;
  schedule.forEach((_, idx) => {
    if (appState.timelineChecks[`${dayKey}_${idx}`]) doneCount++;
  });
  const total = schedule.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const weekScore = computeWeekScore(appState.timelineChecks);
  const streakVal = appState.sleepResetActive ? `${appState.streak} ⏸` : appState.streak;

  function toggleBlock(key) {
    setAppState(prev => {
      const next = {
        ...prev,
        timelineChecks: { ...prev.timelineChecks, [key]: !prev.timelineChecks[key] },
      };
      const { streak, lastStreakDate } = computeStreak(next);
      return { ...next, streak, lastStreakDate };
    });
  }

  return (
    <div className="tab-panel active" id="panel-timeline">
      <div className="container">
        <div className="section-title">DAILY TIMELINE</div>
        <div className="section-sub">{typeLabel}</div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">Today Done</div>
            <div className="stat-value" style={{ color: 'var(--accent)' }}>{doneCount}</div>
            <div className="stat-unit">of {total} blocks</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Streak</div>
            <div className="stat-value" style={{ color: 'var(--accent2)' }}>{streakVal}</div>
            <div className="stat-unit">days</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Week Score</div>
            <div className="stat-value" style={{ color: 'var(--accent3)' }}>{weekScore}%</div>
            <div className="stat-unit">completion</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Steps Target</div>
            <div className="stat-value" style={{ color: 'var(--success)' }}>10K</div>
            <div className="stat-unit">daily goal</div>
          </div>
        </div>

        <div className="day-progress">
          <span className="progress-label">Day Progress</span>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-pct">{pct}%</span>
        </div>

        {/* Day Selector */}
        <div className="day-selector">
          {DAYS.map((day, idx) => {
            const dk = getDayKey(idx);
            const sch = getScheduleForDay(idx);
            let done = 0;
            for (let i = 0; i < sch.length; i++) {
              if (appState.timelineChecks[`${dk}_${i}`]) done++;
            }
            const isComplete = done === sch.length && sch.length > 0;
            return (
              <button
                key={idx}
                className={`day-btn${idx === selectedDay ? ' active' : ''}${isComplete ? ' completed-day' : ''}`}
                onClick={() => setSelectedDay(idx)}
              >
                {day.substring(0, 3).toUpperCase()}{isComplete ? ' ✓' : ''}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="timeline">
          {schedule.map((block, idx) => {
            const key = `${dayKey}_${idx}`;
            const checked = !!appState.timelineChecks[key];

            const [h, m] = block.time.split(':').map(Number);
            const blockMin = h * 60 + (m || 0);
            const nextMin = idx + 1 < schedule.length
              ? (() => { const [nh, nm] = schedule[idx + 1].time.split(':').map(Number); return nh * 60 + (nm || 0); })()
              : blockMin + 90;
            const isActiveNow = selectedDay === todayDayIdx && nowMin >= blockMin && nowMin < nextMin;

            return (
              <div
                key={idx}
                className={`time-block cat-${block.cat}${checked ? ' completed' : ''}${isActiveNow ? ' active-now' : ''}`}
              >
                <div className="time-label">{block.time}</div>
                <div className="time-dot-wrap">
                  <div className="time-dot" onClick={() => toggleBlock(key)} />
                </div>
                <div
                  className={`block-card${checked ? ' checked' : ''}`}
                  onClick={() => toggleBlock(key)}
                >
                  <div className="block-header">
                    <div className="block-title">{block.title}</div>
                    <span className="block-tag">{block.tag}</span>
                  </div>
                  <div className="block-desc">{block.desc}</div>
                  <div className="completed-check-overlay">{checked ? '✓' : ''}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
