import { useState, useEffect, useCallback } from 'react';
import { openDB, dbGet, dbSet } from './db';
import { getTodayDayIdx, todayStr } from './utils';
import Header from './components/Header';
import SleepResetBanner from './components/SleepResetBanner';
import TimelineTab from './components/TimelineTab';
import MealsTab from './components/MealsTab';
import WorkoutTab from './components/WorkoutTab';
import TasksTab from './components/TasksTab';
import GroceryTab from './components/GroceryTab';
import SleepResetTab from './components/SleepResetTab';
import DailyReviewTab from './components/DailyReviewTab';

const INITIAL_STATE = {
  timelineChecks: {},
  weeklyTasks: {},
  biweeklyTasks: {},
  workoutWeek: {},
  workoutMode: 'gym',
  groceryChecks: {},
  streak: 0,
  lastStreakDate: null,
  weeklyCompletions: {},
  sleepResetActive: false,
  sleepResetDay: 0,
  sleepResetStartDate: null,
  sleepResetReason: null,
  sleepStepChecks: {},
  sleepLogs: [],
  dailyHabitChecks: {},
};

const TABS = [
  { id: 'timeline', label: '📅 Timeline' },
  { id: 'meals', label: '🥗 Meal Plan' },
  { id: 'workout', label: '💪 Workout' },
  { id: 'tasks', label: '✅ Weekly Tasks' },
  { id: 'grocery', label: '🛒 Grocery' },
  { id: 'sleep', label: '🌙 Sleep Reset' },
  { id: 'review', label: '📊 Daily Review' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedDay, setSelectedDay] = useState(getTodayDayIdx());
  const [selectedMealDay, setSelectedMealDay] = useState(0);
  const [appState, setAppStateRaw] = useState(INITIAL_STATE);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    openDB().then(async () => {
      const saved = await dbGet('appState');
      if (saved) {
        setAppStateRaw(prev => ({ ...prev, ...saved }));
      }
      setDbReady(true);
    });
  }, []);

  const setAppState = useCallback((updater) => {
    setAppStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      dbSet('appState', next);
      return next;
    });
  }, []);

  // Auto-refresh every minute for active-now highlight
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!dbReady) return null;

  return (
    <>
      <Header appState={appState} />
      <SleepResetBanner appState={appState} setAppState={setAppState} onNavigate={() => setActiveTab('sleep')} />

      <div className="tabs" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'timeline' && (
        <TimelineTab
          appState={appState}
          setAppState={setAppState}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      )}
      {activeTab === 'meals' && (
        <MealsTab
          selectedMealDay={selectedMealDay}
          setSelectedMealDay={setSelectedMealDay}
        />
      )}
      {activeTab === 'workout' && (
        <WorkoutTab appState={appState} setAppState={setAppState} />
      )}
      {activeTab === 'tasks' && (
        <TasksTab appState={appState} setAppState={setAppState} />
      )}
      {activeTab === 'grocery' && (
        <GroceryTab appState={appState} setAppState={setAppState} />
      )}
      {activeTab === 'sleep' && (
        <SleepResetTab appState={appState} setAppState={setAppState} />
      )}
      {activeTab === 'review' && (
        <DailyReviewTab appState={appState} setAppState={setAppState} />
      )}
    </>
  );
}
