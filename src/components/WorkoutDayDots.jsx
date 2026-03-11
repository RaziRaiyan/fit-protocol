import { getWeekKey } from '../utils';
import { WORKOUT_PLAN } from '../data';

const WORKOUT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const IS_WORKOUT_DAY = [true, true, true, true, true, true, false];

export default function WorkoutDayDots({ appState, setAppState, focuses, smallText }) {
  const weekKey = getWeekKey();
  const defaultFocuses = ['Chest', 'Back', 'Legs', 'Shoulders', 'Full Body', 'Full Body', null];

  return (
    <div className="workout-days">
      {WORKOUT_DAYS.map((d, idx) => {
        const key = `${weekKey}_${d}`;
        const done = !!appState.workoutWeek[key];
        const isRest = !IS_WORKOUT_DAY[idx];
        const focusLabel = focuses
          ? focuses[idx]
          : (WORKOUT_PLAN[Math.min(idx, 4)]?.focus?.split(' ')[0] || '?');

        function toggle() {
          if (isRest) return;
          setAppState(prev => ({
            ...prev,
            workoutWeek: { ...prev.workoutWeek, [key]: !prev.workoutWeek[key] },
          }));
        }

        return (
          <div key={d} className="workout-day-badge">
            <div className="wd-label">{d}</div>
            <div
              className={`wd-circle${done ? ' done' : ''}${isRest ? ' rest' : ''}`}
              style={smallText ? { fontSize: '0.55rem' } : undefined}
              onClick={toggle}
            >
              {isRest ? 'REST' : done ? '✓' : focusLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
