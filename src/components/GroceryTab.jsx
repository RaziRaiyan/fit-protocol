import { GROCERY_SUNDAY, GROCERY_BIWEEKLY, GROCERY_PANTRY } from '../data';

function CheckSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GroceryList({ items, prefix, groceryChecks, onToggle }) {
  return (
    <>
      {items.map((item, idx) => {
        const key = `${prefix}_${idx}`;
        const checked = !!groceryChecks[key];
        return (
          <div
            key={idx}
            className={`grocery-item${checked ? ' checked-item' : ''}`}
            onClick={() => onToggle(key)}
          >
            <div className={`checkbox-custom${checked ? ' checked' : ''}`}>
              <CheckSvg />
            </div>
            <div className="grocery-item-name">{item.name}</div>
            <div className="grocery-item-qty">{item.qty}</div>
          </div>
        );
      })}
    </>
  );
}

export default function GroceryTab({ appState, setAppState }) {
  function toggleItem(key) {
    setAppState(prev => ({
      ...prev,
      groceryChecks: { ...prev.groceryChecks, [key]: !prev.groceryChecks[key] },
    }));
  }

  function clearGrocery() {
    setAppState(prev => ({ ...prev, groceryChecks: {} }));
  }

  return (
    <div className="tab-panel active" id="panel-grocery">
      <div className="container">
        <div className="section-title">GROCERY LIST</div>
        <div className="section-sub">BUY EVERY SUNDAY — CHECK OFF AS YOU GO</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grocery-cols">
          <div>
            <div className="grocery-section">
              <div className="grocery-section-title">🥚 Buy Every Sunday</div>
              <GroceryList
                items={GROCERY_SUNDAY}
                prefix="sun"
                groceryChecks={appState.groceryChecks}
                onToggle={toggleItem}
              />
            </div>
          </div>
          <div>
            <div className="grocery-section">
              <div className="grocery-section-title">🍗 Buy Every Two Weeks</div>
              <GroceryList
                items={GROCERY_BIWEEKLY}
                prefix="bw"
                groceryChecks={appState.groceryChecks}
                onToggle={toggleItem}
              />
            </div>
            <div className="grocery-section" style={{ marginTop: '1.5rem' }}>
              <div className="grocery-section-title">📦 Pantry / Restock</div>
              <GroceryList
                items={GROCERY_PANTRY}
                prefix="pantry"
                groceryChecks={appState.groceryChecks}
                onToggle={toggleItem}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={clearGrocery}
            style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.7rem', padding: '0.6rem 1.2rem', border: '1px solid var(--border)', background: 'none', color: 'var(--muted)', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            Reset List
          </button>
        </div>
      </div>
    </div>
  );
}
