import { WEEKLY_TASKS, BIWEEKLY_TASKS } from '../data';
import { getWeekKey, getBiweekKey } from '../utils';
import WorkoutDayDots from './WorkoutDayDots';

function CheckSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function TasksTab({ appState, setAppState }) {
  const weekKey = getWeekKey();
  const bwKey = getBiweekKey();

  const focuses = ['Chest+Tri', 'Back+Bi', 'Legs', 'Shoulders', 'Full Body', 'Full Body', null];

  function toggleWeeklyTask(task) {
    const stateKey = `${weekKey}_${task.id}`;
    setAppState(prev => ({
      ...prev,
      weeklyTasks: { ...prev.weeklyTasks, [stateKey]: !prev.weeklyTasks[stateKey] },
    }));
  }

  function toggleBiweeklyTask(task) {
    const stateKey = `${bwKey}_${task.id}`;
    setAppState(prev => ({
      ...prev,
      biweeklyTasks: { ...prev.biweeklyTasks, [stateKey]: !prev.biweeklyTasks[stateKey] },
    }));
  }

  return (
    <div className="tab-panel active" id="panel-tasks">
      <div className="container">
        <div className="section-title">RECURRING TASKS</div>
        <div className="section-sub">WEEKLY & BI-WEEKLY TRACKER</div>

        <div className="tracker-grid">
          <div className="tracker-card">
            <div className="tracker-card-title" style={{ color: 'var(--accent)' }}>📦 WEEKLY TASKS</div>
            <div className="tracker-card-sub">Reset every Monday</div>
            {WEEKLY_TASKS.map(task => {
              const stateKey = `${weekKey}_${task.id}`;
              const done = !!appState.weeklyTasks[stateKey];
              return (
                <div key={task.id} className="tracker-item" onClick={() => toggleWeeklyTask(task)}>
                  <div className={`tracker-dot${done ? ' done' : ''}`}>
                    {done && <CheckSvg />}
                  </div>
                  <div className="tracker-item-info">
                    <div className="tracker-item-name">{task.name}</div>
                    <div className="tracker-item-desc">{task.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tracker-card">
            <div className="tracker-card-title" style={{ color: 'var(--accent2)' }}>🔄 BI-WEEKLY TASKS</div>
            <div className="tracker-card-sub">Reset every 2 weeks</div>
            {BIWEEKLY_TASKS.map(task => {
              const stateKey = `${bwKey}_${task.id}`;
              const done = !!appState.biweeklyTasks[stateKey];
              return (
                <div key={task.id} className="tracker-item" onClick={() => toggleBiweeklyTask(task)}>
                  <div
                    className={`tracker-dot${done ? ' done' : ''}`}
                    style={!done ? { borderColor: 'rgba(241,160,53,0.4)' } : undefined}
                  >
                    {done && <CheckSvg />}
                  </div>
                  <div className="tracker-item-info">
                    <div className="tracker-item-name">{task.name}</div>
                    <div className="tracker-item-desc">{task.desc}</div>
                    <div className="last-done">
                      {done ? '✓ Completed this period' : 'Pending this 2-week period'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tracker-card" style={{ marginTop: 0 }}>
          <div className="tracker-card-title" style={{ color: 'var(--accent3)' }}>📊 THIS WEEK'S WORKOUTS</div>
          <div className="tracker-card-sub">5 sessions target — track each day</div>
          <WorkoutDayDots appState={appState} setAppState={setAppState} focuses={focuses} smallText />
        </div>
      </div>
    </div>
  );
}
