import { WORKOUT_PLAN } from '../data';
import WorkoutDayDots from './WorkoutDayDots';

export default function WorkoutTab({ appState, setAppState }) {
  return (
    <div className="tab-panel active" id="panel-workout">
      <div className="container">
        <div className="section-title">12-WEEK WORKOUT PLAN</div>
        <div className="section-sub">PROGRESSIVE OVERLOAD — TRAIN 5 DAYS/WEEK</div>

        <div className="workout-week">
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            This Week's Workouts
          </div>
          <WorkoutDayDots appState={appState} setAppState={setAppState} />
        </div>

        {WORKOUT_PLAN.map((day, idx) => (
          <div key={idx} className="workout-plan-day">
            <div className="wp-day-title">
              {day.day}
              <span className="wp-focus-tag">{day.focus}</span>
            </div>
            <div className="exercise-list">
              {day.exercises.map((ex, i) => (
                <div key={i} className="exercise-row">
                  <div className="ex-name">{ex.name}</div>
                  <div className="ex-sets">{ex.sets}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
