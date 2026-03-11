import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import { DAILY_HABITS, SLEEP_STEPS } from '../data';
import { todayStr, computeResetDay, formatDate } from '../utils';

function CheckSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FallbackTips({ missedHabits, missedSleepSteps, isResetActive }) {
  const tips = [];

  if (missedHabits.find(h => h.id === 'dh1')) {
    tips.push('Set your alarm tonight before you sleep — place your phone across the room to avoid snoozing.');
  }
  if (missedHabits.find(h => h.id === 'dh2')) {
    tips.push('Leave your shoes by the door tonight as a reminder to step outside within 30 min of waking.');
  }
  if (missedHabits.find(h => h.id === 'dh3')) {
    tips.push('Pack your gym bag tonight so there\'s zero friction tomorrow morning.');
  }
  if (missedHabits.find(h => h.id === 'dh4')) {
    tips.push('Set a 1 PM phone reminder labelled "Last Caffeine" — the 6–8 hour half-life is real.');
  }
  if (missedHabits.find(h => h.id === 'dh6') || missedHabits.find(h => h.id === 'dh7')) {
    tips.push('Set a 9 PM alarm tonight for wind-down. Dim the lights and put the phone face-down.');
  }
  if (missedHabits.find(h => h.id === 'dh8')) {
    tips.push('Your bedtime is the anchor of the whole protocol. Missing it compounds into the next day.');
  }
  if (isResetActive && missedSleepSteps.length > 0) {
    tips.push(`Focus on completing the sleep reset steps tomorrow — ${missedSleepSteps.length} step${missedSleepSteps.length > 1 ? 's' : ''} still pending.`);
  }

  const shown = tips.slice(0, 3);

  if (shown.length === 0) {
    return (
      <div style={{ fontSize: '0.82rem', color: 'var(--success)', fontFamily: "'Space Mono',monospace" }}>
        ✓ All habits completed — nothing to improve today. Keep it up.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {shown.map((tip, i) => (
        <div key={i} style={{ fontSize: '0.82rem', display: 'flex', gap: '0.6rem', lineHeight: 1.6 }}>
          <span style={{ color: 'var(--accent2)', flexShrink: 0 }}>▸</span>
          <span style={{ color: 'var(--text)' }}>{tip}</span>
        </div>
      ))}
    </div>
  );
}

function AiUnavailableNotice({ missedHabits, missedSleepSteps, isResetActive }) {
  return (
    <div className="review-ai-notice">
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: '#f1a035', marginBottom: '0.8rem' }}>
        GEMINI NANO NOT READY
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
        The flag is enabled — but the model still needs to be downloaded. Follow these steps:
      </div>
      {[
        ['1', 'Go to', 'chrome://components'],
        ['2', 'Find', '"Optimization Guide On Device Model"'],
        ['3', 'Click "Check for update" — Chrome will download Gemini Nano (~1.7 GB)'],
        ['4', 'Wait for the component to show a version number, then try again'],
      ].map(([num, label, val]) => (
        <div key={num} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: '#f1a035', flexShrink: 0, width: '1rem' }}>{num}</span>
          <span style={{ color: 'var(--muted)' }}>
            {label}{' '}
            {num !== '3' && num !== '4'
              ? <code style={{ background: 'var(--surface2)', padding: '0.1em 0.4em', borderRadius: '3px', color: 'var(--text)' }}>{val}</code>
              : val}
          </span>
        </div>
      ))}
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', color: 'var(--muted)', margin: '1rem 0 0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Showing rule-based tips in the meantime:
      </div>
      <FallbackTips missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />
    </div>
  );
}

function AiErrorNotice({ missedHabits, missedSleepSteps, isResetActive }) {
  return (
    <div className="review-ai-notice">
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', color: '#f87171', marginBottom: '0.4rem' }}>
        GENERATION FAILED
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '1rem' }}>
        Something went wrong with Gemini Nano. Showing rule-based tips instead:
      </div>
      <FallbackTips missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />
    </div>
  );
}

async function createAiSession(systemPrompt) {
  if (typeof LanguageModel !== 'undefined') {
    const availability = await LanguageModel.availability();
    if (availability === 'unavailable') throw Object.assign(new Error('unavailable'), { code: 'unavailable' });
    return LanguageModel.create({ systemPrompt });
  } else if (window.ai?.languageModel) {
    const { available } = await window.ai.languageModel.capabilities();
    if (available === 'no') throw Object.assign(new Error('unavailable'), { code: 'unavailable' });
    return window.ai.languageModel.create({ systemPrompt });
  }
  throw Object.assign(new Error('unavailable'), { code: 'unavailable' });
}

export default function DailyReviewTab({ appState, setAppState }) {
  const [tipsState, setTipsState] = useState('idle'); // idle | loading | done | error | unavailable
  const [aiTips, setAiTips] = useState('');
  const [socialState, setSocialState] = useState('idle'); // idle | loading | done | error | unavailable
  const [socialPost, setSocialPost] = useState('');
  const [shareModal, setShareModal] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState('');
  const [shareGenerating, setShareGenerating] = useState(false);
  const shareCardRef = useRef(null);

  const today = todayStr();
  const isResetActive = appState.sleepResetActive;
  const currentResetDay = computeResetDay(appState.sleepResetStartDate);
  const resetDateKey = appState.sleepResetStartDate || today;

  const habitChecks = appState.dailyHabitChecks || {};
  const completedHabits = DAILY_HABITS.filter(h => habitChecks[`${today}_${h.id}`]);
  const missedHabits = DAILY_HABITS.filter(h => !habitChecks[`${today}_${h.id}`]);

  const sleepStepChecks = appState.sleepStepChecks || {};
  const completedSleepSteps = isResetActive
    ? SLEEP_STEPS.filter(s => sleepStepChecks[`${resetDateKey}_${s.id}`])
    : [];
  const missedSleepSteps = isResetActive
    ? SLEEP_STEPS.filter(s => !sleepStepChecks[`${resetDateKey}_${s.id}`])
    : [];

  const totalItems = DAILY_HABITS.length + (isResetActive ? SLEEP_STEPS.length : 0);
  const doneItems = completedHabits.length + completedSleepSteps.length;
  const score = totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100);

  const scoreColor = score >= 80 ? '#4ade80' : score >= 50 ? '#f1a035' : '#f87171';
  const scoreLabel = score >= 80 ? 'GREAT DAY' : score >= 60 ? 'SOLID EFFORT' : score >= 40 ? 'ROOM TO GROW' : 'KEEP PUSHING';

  function toggleHabit(habitId) {
    const key = `${today}_${habitId}`;
    setAppState(prev => ({
      ...prev,
      dailyHabitChecks: {
        ...(prev.dailyHabitChecks || {}),
        [key]: !(prev.dailyHabitChecks || {})[key],
      },
    }));
  }

  function toggleSleepStep(stepId) {
    const key = `${resetDateKey}_${stepId}`;
    setAppState(prev => ({
      ...prev,
      sleepStepChecks: {
        ...(prev.sleepStepChecks || {}),
        [key]: !(prev.sleepStepChecks || {})[key],
      },
    }));
  }

  function buildPrompt() {
    const lines = [];
    lines.push(`Date: ${formatDate()}`);
    lines.push(`Mode: ${isResetActive ? `Sleep Reset (Day ${currentResetDay} of 4, streak protected)` : 'Normal Protocol'}`);
    lines.push(`Score: ${score}/100 (${doneItems}/${totalItems} items completed)`);
    lines.push('');

    if (completedHabits.length > 0) {
      lines.push('Completed daily habits:');
      completedHabits.forEach(h => lines.push(`- ${h.label}`));
    }
    if (missedHabits.length > 0) {
      lines.push('Missed daily habits:');
      missedHabits.forEach(h => lines.push(`- ${h.label}: ${h.detail}`));
    }

    if (isResetActive) {
      if (completedSleepSteps.length > 0) {
        lines.push('Completed sleep reset steps:');
        completedSleepSteps.forEach(s => lines.push(`- ${s.title}`));
      }
      if (missedSleepSteps.length > 0) {
        lines.push('Missed sleep reset steps:');
        missedSleepSteps.forEach(s => lines.push(`- ${s.title}`));
      }
      const todayLog = (appState.sleepLogs || []).find(l => l.date === today);
      if (todayLog) {
        lines.push(`Sleep log: slept at ${todayLog.sleep}, woke at ${todayLog.wake}`);
      } else {
        lines.push('Sleep log: not filled in today');
      }
    }

    lines.push('');
    lines.push('Give 2–3 specific, actionable tips for tomorrow based on what was missed. Use bullet points (▸). Be concise and direct. Under 120 words total.');
    return lines.join('\n');
  }

  async function generateTips() {
    setTipsState('loading');
    setAiTips('');
    const SYSTEM_PROMPT =
      'You are a concise fitness and sleep coach giving a daily habit review. Give 2–3 actionable bullet tips based specifically on what was missed. Start each bullet with ▸. Be direct and encouraging. Keep the total response under 120 words.';
    try {
      const session = await createAiSession(SYSTEM_PROMPT);
      const stream = session.promptStreaming(buildPrompt());
      let accumulated = '';
      for await (const chunk of stream) {
        accumulated += chunk;
        setAiTips(accumulated);
      }
      setTipsState('done');
      session.destroy();
    } catch (e) {
      console.error('Chrome AI tips error:', e);
      setTipsState(e.code === 'unavailable' ? 'unavailable' : 'error');
    }
  }

  async function generateSocialPost() {
    setSocialState('loading');
    setSocialPost('');
    const SYSTEM_PROMPT = 'You are a fitness coach helping a user write a social media post about their daily protocol score. Be authentic, direct, and motivating.';
    try {
      const session = await createAiSession(SYSTEM_PROMPT);
      const prompt = score >= 75
        ? `Write a short social media post (2–3 sentences) celebrating today's fitness protocol score of ${score}/100. Sound genuine and motivated — not corporate. Mention the score naturally. Add 1–2 relevant emojis. No hashtags.`
        : `Write a short social media post (2–3 sentences) in the voice of someone being brutally honest with themselves after scoring ${score}/100 on their fitness protocol today. Acknowledge what was missed, commit to tomorrow with discipline. Sound real — not soft. Add 1–2 relevant emojis. No hashtags.`;
      const post = await session.prompt(prompt);
      setSocialPost(post.trim());
      setSocialState('done');
      session.destroy();
    } catch (e) {
      console.error('Chrome AI social post error:', e);
      setSocialState(e.code === 'unavailable' ? 'unavailable' : 'error');
    }
  }

  async function openShareModal() {
    if (!shareCardRef.current) return;
    setShareGenerating(true);
    try {
      // Brief delay to ensure the element is fully painted before capture
      await new Promise(r => setTimeout(r, 80));
      const url = await toPng(shareCardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0a0a0a',
      });
      setShareImageUrl(url);
      setShareModal(true);
    } catch (e) {
      console.error('html-to-image error:', e);
    } finally {
      setShareGenerating(false);
    }
  }

  function handleSave() {
    const link = document.createElement('a');
    link.href = shareImageUrl;
    link.download = `fitprotocol-${today}.png`;
    link.click();
  }

  async function handlePlatformShare(platform) {
    try {
      const blob = await (await fetch(shareImageUrl)).blob();
      const file = new File([blob], `fitprotocol-${today}.png`, { type: 'image/png' });
      const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

      // Mobile: use native OS share sheet — the OS presents the app picker
      // and the chosen app receives the image file directly
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'FitProtocol Daily Review', text: socialPost });
        return;
      }

      // Desktop fallback: download image then open the platform
      handleSave();

      const desktopUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(socialPost + '\n\n[attach the downloaded image]')}`,
        instagram: 'https://www.instagram.com/',
        snapchat: 'https://www.snapchat.com/',
      };

      if (desktopUrls[platform]) {
        setTimeout(() => window.open(desktopUrls[platform], '_blank', 'noopener'), 400);
      }
    } catch (e) {
      if (e.name !== 'AbortError') handleSave();
    }
  }

  return (
    <div className="tab-panel active" id="panel-review">
      <div className="container">
        <div className="section-title">📊 DAILY REVIEW</div>
        <div className="section-sub">
          {isResetActive ? `SLEEP RESET — DAY ${currentResetDay} OF 4 · STREAK PROTECTED` : 'PROTOCOL ADHERENCE SCORE'}
        </div>

        {/* Score card */}
        <div className="review-score-card">
          <div className="review-score-ring" style={{ '--sc': scoreColor }}>
            <span className="review-score-num" style={{ color: scoreColor }}>{score}</span>
            <span className="review-score-denom">/100</span>
          </div>
          <div className="review-score-meta">
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', color: scoreColor, letterSpacing: '0.06em' }}>
              {scoreLabel}
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.62rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              {doneItems} of {totalItems} items completed today
            </div>
            {isResetActive && (
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: '#a78bfa', marginTop: '0.4rem' }}>
                🛡 Sleep reset active — habits + reset steps both scored
              </div>
            )}
          </div>
        </div>

        {/* Daily habits checklist */}
        <div className="review-section-title">DAILY PROTOCOL HABITS</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          TAP TO MARK AS DONE FOR TODAY
        </div>
        <div className="review-habits-list">
          {DAILY_HABITS.map(habit => {
            const done = !!(habitChecks[`${today}_${habit.id}`]);
            return (
              <div
                key={habit.id}
                className={`review-habit-item${done ? ' done' : ''}`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className={`review-habit-dot${done ? ' done' : ''}`}>
                  {done && <CheckSvg />}
                </div>
                <div>
                  <div className="review-habit-label">{habit.label}</div>
                  <div className="review-habit-detail">{habit.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sleep reset steps summary */}
        {isResetActive && (
          <>
            <div className="review-section-title" style={{ marginTop: '1.8rem' }}>
              SLEEP RESET STEPS — DAY {currentResetDay} STATUS
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: 'var(--muted)', marginBottom: '1rem' }}>
              CHECK THESE OFF IN THE SLEEP RESET TAB
            </div>
            <div className="review-habits-list">
              {SLEEP_STEPS.map(step => {
                const variant = currentResetDay === 0 && step.tonight ? step.tonight : step;
                const done = !!(sleepStepChecks[`${resetDateKey}_${step.id}`]);
                return (
                  <div key={step.id} className={`review-habit-item${done ? ' done' : ''}`} onClick={() => toggleSleepStep(step.id)}>
                    <div className={`review-habit-dot${done ? ' done' : ''}`} style={{ flexShrink: 0 }}>
                      {done && <CheckSvg />}
                    </div>
                    <div>
                      <div className="review-habit-label">{variant.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Today's Result — social post share card */}
        <div className="review-ai-section">
          <div className="review-ai-header">
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.2rem', letterSpacing: '0.08em' }}>
                TODAY'S RESULT
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                GENERATE A SHAREABLE POST FOR YOUR DAY
              </div>
            </div>
            <button
              className="generate-review-btn"
              onClick={generateSocialPost}
              disabled={socialState === 'loading'}
            >
              {socialState === 'loading' ? 'GENERATING...' : socialState === 'done' ? '↺ REGENERATE' : 'GENERATE POST'}
            </button>
          </div>

          {socialState === 'idle' && (
            <div className="review-ai-placeholder">
              Generate a social post summarising your day — celebrating a win or owning a miss. Powered by Gemini Nano, runs locally.
            </div>
          )}

          {socialState === 'loading' && (
            <div className="review-ai-loading">
              <div className="review-ai-spinner" />
              <span>Crafting your post...</span>
            </div>
          )}

          {socialState === 'done' && socialPost && (
            <div ref={shareCardRef} className="review-share-card">
              <div className="review-share-header">
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {score >= 75 ? 'YOUR COACH IS PROUD 🔥' : 'YOUR COACH IS WATCHING 👀'}
                </div>
                {!shareGenerating && (
                  <button className="review-share-img-btn" onClick={openShareModal}>
                    ↑ SHARE IMAGE
                  </button>
                )}
              </div>
              <div className="review-share-text">{socialPost}</div>
            </div>
          )}

          {socialState === 'unavailable' && <AiUnavailableNotice missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />}
          {socialState === 'error' && <AiErrorNotice missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />}
        </div>

        {/* Coaching Insights */}
        <div className="review-ai-section">
          <div className="review-ai-header">
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.2rem', letterSpacing: '0.08em' }}>
                COACHING INSIGHTS
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                POWERED BY GEMINI NANO · RUNS ENTIRELY IN YOUR BROWSER
              </div>
            </div>
            <button
              className="generate-review-btn"
              onClick={generateTips}
              disabled={tipsState === 'loading'}
            >
              {tipsState === 'loading' ? 'GENERATING...' : tipsState === 'done' ? '↺ REGENERATE' : 'GENERATE TIPS'}
            </button>
          </div>

          {tipsState === 'idle' && (
            <div className="review-ai-placeholder">
              Mark off today's habits above, then tap Generate Tips for personalized coaching from Gemini Nano — running locally, no data sent anywhere.
            </div>
          )}

          {tipsState === 'loading' && (
            <div className="review-ai-loading">
              <div className="review-ai-spinner" />
              <span>Gemini Nano is thinking...</span>
            </div>
          )}

          {(tipsState === 'done' || (tipsState === 'loading' && aiTips)) && aiTips && (
            <div className="review-ai-tips">
              <ReactMarkdown>{aiTips}</ReactMarkdown>
            </div>
          )}

          {tipsState === 'unavailable' && <AiUnavailableNotice missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />}
          {tipsState === 'error' && <AiErrorNotice missedHabits={missedHabits} missedSleepSteps={missedSleepSteps} isResetActive={isResetActive} />}
        </div>
      </div>

      {/* Share modal */}
      {shareModal && (
        <div className="share-modal-overlay" onClick={() => setShareModal(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.1rem', letterSpacing: '0.08em' }}>SHARE AS IMAGE</div>
              <button className="share-modal-close" onClick={() => setShareModal(false)}>✕</button>
            </div>
            {shareImageUrl && (
              <img src={shareImageUrl} alt="Share preview" className="share-modal-preview" />
            )}
            <div className="share-modal-note">
              On mobile, tapping a platform opens your native share sheet. On desktop, the image is downloaded.
            </div>
            <div className="share-platform-grid">
              <button className="share-platform-btn save" onClick={handleSave}>
                <span className="spb-icon">📥</span>
                <span>SAVE IMAGE</span>
              </button>
              <button className="share-platform-btn instagram" onClick={() => handlePlatformShare('instagram')}>
                <span className="spb-icon">📸</span>
                <span>INSTAGRAM</span>
              </button>
              <button className="share-platform-btn whatsapp" onClick={() => handlePlatformShare('whatsapp')}>
                <span className="spb-icon">💬</span>
                <span>WHATSAPP</span>
              </button>
              <button className="share-platform-btn snapchat" onClick={() => handlePlatformShare('snapchat')}>
                <span className="spb-icon">👻</span>
                <span>SNAPCHAT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
