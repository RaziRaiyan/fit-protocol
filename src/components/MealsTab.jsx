import { MEAL_PLAN } from '../data';

export default function MealsTab({ selectedMealDay, setSelectedMealDay }) {
  const plan = MEAL_PLAN[selectedMealDay];
  const t = plan.totals;

  return (
    <div className="tab-panel active" id="panel-meals">
      <div className="container">
        <div className="section-title">7-DAY MEAL PLAN</div>
        <div className="section-sub">~1900 KCAL / 160G PROTEIN PER DAY</div>

        <div className="meal-day-nav">
          {MEAL_PLAN.map((d, idx) => (
            <button
              key={idx}
              className={`day-btn${idx === selectedMealDay ? ' active' : ''}`}
              onClick={() => setSelectedMealDay(idx)}
            >
              {d.day}
            </button>
          ))}
        </div>

        <div className="meal-plan-grid">
          {plan.meals.map((meal, idx) => (
            <div key={idx} className="meal-card">
              <div className="meal-card-title">{meal.name}</div>
              <div className="meal-desc">{meal.desc}</div>
              <div className="macro-row">
                <span className="macro-chip p">P: {meal.p}g</span>
                <span className="macro-chip c">C: {meal.c}g</span>
                <span className="macro-chip f">F: {meal.f}g</span>
                <span className="macro-chip cal">{meal.kcal} kcal</span>
              </div>
            </div>
          ))}
        </div>

        <div className="day-total-bar">
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', alignSelf: 'center', marginRight: '1rem' }}>
            Daily Total
          </div>
          <div className="total-item">
            <div className="total-val" style={{ color: 'var(--accent)' }}>{t.p}g</div>
            <div className="total-lab">Protein</div>
          </div>
          <div className="total-item">
            <div className="total-val" style={{ color: 'var(--accent3)' }}>{t.c}g</div>
            <div className="total-lab">Carbs</div>
          </div>
          <div className="total-item">
            <div className="total-val" style={{ color: 'var(--accent2)' }}>{t.f}g</div>
            <div className="total-lab">Fat</div>
          </div>
          <div className="total-item">
            <div className="total-val">{t.kcal}</div>
            <div className="total-lab">Calories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
