export const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export const WEEKDAY_SCHEDULE = [
  { time: "5:15", title: "Wake Up + Hydrate", desc: "Drink water, have a banana + black coffee", cat: "routine", tag: "Morning" },
  { time: "5:40", title: "Leave for Gym / Warm-Up", desc: "Head to gym, warm up before training", cat: "workout", tag: "Workout" },
  { time: "6:00", title: "Strength Training", desc: "1 hour strength session — follow the 12-week plan", cat: "workout", tag: "Workout" },
  { time: "7:00", title: "Post-Workout Meal", desc: "Whey protein shake + eggs + oats", cat: "meal", tag: "Nutrition" },
  { time: "7:30", title: "Get Ready + Commute", desc: "Shower, prep, head to work", cat: "routine", tag: "Routine" },
  { time: "8:30", title: "Work Block I", desc: "Deep work — stand & walk 2 min every hour", cat: "work", tag: "Work" },
  { time: "12:30", title: "Lunch", desc: "Meal prep container: chicken + rice + vegetables. Take a short walk after", cat: "meal", tag: "Nutrition" },
  { time: "13:00", title: "Work Block II", desc: "Continue hourly movement breaks throughout afternoon", cat: "work", tag: "Work" },
  { time: "16:00", title: "Afternoon Snack", desc: "Greek yogurt + almonds", cat: "meal", tag: "Nutrition" },
  { time: "17:30", title: "Work Ends", desc: "Wrap up work, start commute home", cat: "work", tag: "Work" },
  { time: "18:30", title: "Evening Walk", desc: "Complete 10–12k steps target. Fresh air, decompress", cat: "walk", tag: "Active" },
  { time: "20:00", title: "Dinner", desc: "Chicken / fish + vegetables. Avoid large heavy meals.", cat: "meal", tag: "Nutrition" },
  { time: "21:30", title: "Wind Down + Stretching", desc: "Light stretching, mobility work. No screens stress.", cat: "routine", tag: "Recovery" },
  { time: "22:00", title: "Sleep", desc: "7–8 hours for muscle recovery and hormone balance", cat: "sleep", tag: "Sleep" },
];

export const WEEKEND_SAT_SCHEDULE = [
  { time: "7:00", title: "Wake Up + Hydrate", desc: "Natural wake, drink water", cat: "routine", tag: "Morning" },
  { time: "7:30", title: "Breakfast", desc: "Eggs + oats + fruit", cat: "meal", tag: "Nutrition" },
  { time: "9:00", title: "Gym Session", desc: "Full body training — Saturday session", cat: "workout", tag: "Workout" },
  { time: "10:30", title: "Post-Workout Meal", desc: "Whey + banana + eggs", cat: "meal", tag: "Nutrition" },
  { time: "12:00", title: "Afternoon — Stay Active", desc: "Free time but stay active: walks, errands, cycling", cat: "walk", tag: "Active" },
  { time: "20:00", title: "Dinner + Relaxation", desc: "Normal dinner and relaxation time", cat: "meal", tag: "Nutrition" },
  { time: "22:30", title: "Sleep", desc: "Rest and recovery — aim for 8 hours", cat: "sleep", tag: "Sleep" },
];

export const WEEKEND_SUN_SCHEDULE = [
  { time: "7:00", title: "Wake Up + Hydrate", desc: "Natural wake, drink water", cat: "routine", tag: "Morning" },
  { time: "7:30", title: "Breakfast", desc: "Eggs + oats + fruit", cat: "meal", tag: "Nutrition" },
  { time: "9:00", title: "Recovery Walk", desc: "45–60 min walk + mobility / stretching session", cat: "walk", tag: "Recovery" },
  { time: "11:00", title: "Grocery Shopping", desc: "Buy weekly groceries — use the grocery list tab!", cat: "routine", tag: "Task" },
  { time: "13:00", title: "Lunch", desc: "Meal prep container or fresh cook", cat: "meal", tag: "Nutrition" },
  { time: "15:00", title: "Meal Prep (Sun–Wed)", desc: "Cook 1.2kg chicken, 450g rice, vegetables. Portion into 6 containers for Mon–Wed", cat: "meal", tag: "Prep" },
  { time: "17:00", title: "Rest + Free Time", desc: "Recovery, light activity, relaxation", cat: "routine", tag: "Recovery" },
  { time: "20:00", title: "Dinner", desc: "Normal dinner + prepare for the week ahead", cat: "meal", tag: "Nutrition" },
  { time: "22:30", title: "Sleep", desc: "Rest and recovery — great week incoming!", cat: "sleep", tag: "Sleep" },
];

export const MEAL_PLAN = [
  {
    day: "Day 1",
    meals: [
      { name: "Breakfast", desc: "4 eggs, 50g oats, black coffee", p: 28, c: 35, f: 18, kcal: 410 },
      { name: "Lunch", desc: "200g chicken, 120g cooked rice, vegetables", p: 52, c: 42, f: 6, kcal: 430 },
      { name: "Post-Workout", desc: "Whey protein + banana", p: 25, c: 28, f: 2, kcal: 230 },
      { name: "Dinner", desc: "200g chicken + broccoli", p: 48, c: 8, f: 6, kcal: 280 },
      { name: "Snack", desc: "Greek yogurt + almonds", p: 15, c: 12, f: 10, kcal: 195 },
    ],
    totals: { p: 168, c: 125, f: 42, kcal: 1545 }
  },
  {
    day: "Day 2",
    meals: [
      { name: "Breakfast", desc: "3 eggs + 2 egg whites, oats", p: 26, c: 30, f: 12, kcal: 330 },
      { name: "Lunch", desc: "Chicken + rice + vegetables", p: 50, c: 42, f: 6, kcal: 425 },
      { name: "Post-Workout", desc: "Whey protein + banana", p: 25, c: 28, f: 2, kcal: 230 },
      { name: "Dinner", desc: "200g fish + sweet potato", p: 44, c: 30, f: 5, kcal: 340 },
      { name: "Snack", desc: "Greek yogurt", p: 15, c: 9, f: 4, kcal: 130 },
    ],
    totals: { p: 160, c: 139, f: 29, kcal: 1455 }
  },
  {
    day: "Day 3",
    meals: [
      { name: "Breakfast", desc: "4 eggs + apple", p: 24, c: 20, f: 16, kcal: 320 },
      { name: "Lunch", desc: "Chicken + rice", p: 48, c: 40, f: 6, kcal: 410 },
      { name: "Post-Workout", desc: "Whey shake", p: 25, c: 5, f: 2, kcal: 138 },
      { name: "Dinner", desc: "Paneer/tofu + vegetables", p: 28, c: 12, f: 14, kcal: 285 },
      { name: "Snack", desc: "Almonds", p: 6, c: 6, f: 14, kcal: 170 },
    ],
    totals: { p: 131, c: 83, f: 52, kcal: 1323 }
  },
  {
    day: "Day 4",
    meals: [
      { name: "Breakfast", desc: "4 eggs, oats, black coffee", p: 28, c: 35, f: 18, kcal: 410 },
      { name: "Lunch", desc: "Chicken + rice + vegetables", p: 50, c: 42, f: 6, kcal: 425 },
      { name: "Post-Workout", desc: "Whey protein + banana", p: 25, c: 28, f: 2, kcal: 230 },
      { name: "Dinner", desc: "Chicken + broccoli", p: 48, c: 8, f: 6, kcal: 280 },
      { name: "Snack", desc: "Greek yogurt", p: 15, c: 9, f: 4, kcal: 130 },
    ],
    totals: { p: 166, c: 122, f: 36, kcal: 1475 }
  },
  {
    day: "Day 5",
    meals: [
      { name: "Breakfast", desc: "Oats + whey mixed", p: 28, c: 35, f: 5, kcal: 300 },
      { name: "Lunch", desc: "Chicken + sweet potato", p: 48, c: 30, f: 5, kcal: 360 },
      { name: "Post-Workout", desc: "Whey + banana", p: 25, c: 28, f: 2, kcal: 230 },
      { name: "Dinner", desc: "Fish + vegetables", p: 40, c: 12, f: 5, kcal: 255 },
      { name: "Snack", desc: "Greek yogurt", p: 15, c: 9, f: 4, kcal: 130 },
    ],
    totals: { p: 156, c: 114, f: 21, kcal: 1275 }
  },
  {
    day: "Day 6",
    meals: [
      { name: "Breakfast", desc: "Eggs + oats", p: 26, c: 35, f: 16, kcal: 390 },
      { name: "Lunch", desc: "Chicken + rice", p: 48, c: 40, f: 6, kcal: 410 },
      { name: "Post-Workout", desc: "Whey", p: 25, c: 5, f: 2, kcal: 138 },
      { name: "Dinner", desc: "Paneer/tofu", p: 28, c: 8, f: 14, kcal: 270 },
      { name: "Snack", desc: "Almonds", p: 6, c: 6, f: 14, kcal: 170 },
    ],
    totals: { p: 133, c: 94, f: 52, kcal: 1378 }
  },
  {
    day: "Day 7",
    meals: [
      { name: "Breakfast", desc: "Eggs + fruit", p: 24, c: 22, f: 16, kcal: 330 },
      { name: "Lunch", desc: "Chicken + rice", p: 48, c: 40, f: 6, kcal: 410 },
      { name: "Post-Workout", desc: "Whey + banana", p: 25, c: 28, f: 2, kcal: 230 },
      { name: "Dinner", desc: "Fish or chicken", p: 44, c: 5, f: 6, kcal: 250 },
      { name: "Snack", desc: "Greek yogurt", p: 15, c: 9, f: 4, kcal: 130 },
    ],
    totals: { p: 156, c: 104, f: 34, kcal: 1350 }
  },
];

export const WORKOUT_PLAN = [
  { day: "Day 1", focus: "Chest + Triceps", exercises: [
    { name: "Bench Press", sets: "4 × 6–8 reps" },
    { name: "Incline Dumbbell Press", sets: "4 × 8–10 reps" },
    { name: "Cable / Dumbbell Fly", sets: "3 × 12 reps" },
    { name: "Dips", sets: "3 × failure" },
    { name: "Tricep Pushdown", sets: "3 × 12 reps" },
  ]},
  { day: "Day 2", focus: "Back + Biceps", exercises: [
    { name: "Pull-ups", sets: "4 × failure" },
    { name: "Barbell / Dumbbell Row", sets: "4 × 6–8 reps" },
    { name: "Lat Pulldown", sets: "3 × 10 reps" },
    { name: "Face Pull", sets: "3 × 15 reps" },
    { name: "Bicep Curl", sets: "3 × 12 reps" },
  ]},
  { day: "Day 3", focus: "Legs", exercises: [
    { name: "Squat", sets: "5 × 5 reps" },
    { name: "Romanian Deadlift", sets: "4 × 8 reps" },
    { name: "Leg Press", sets: "3 × 12 reps" },
    { name: "Walking Lunges", sets: "3 × 12 each leg" },
    { name: "Calf Raises", sets: "4 × 15 reps" },
  ]},
  { day: "Day 4", focus: "Shoulders", exercises: [
    { name: "Overhead Press", sets: "4 × 6–8 reps" },
    { name: "Lateral Raise", sets: "4 × 15 reps" },
    { name: "Rear Delt Fly", sets: "3 × 15 reps" },
    { name: "Dumbbell Shrugs", sets: "3 × 12 reps" },
  ]},
  { day: "Day 5", focus: "Full Body + Core", exercises: [
    { name: "Deadlift", sets: "5 × 5 reps" },
    { name: "Pull-ups", sets: "3 × failure" },
    { name: "Pushups", sets: "3 × failure" },
    { name: "Hanging Leg Raises", sets: "3 × 12 reps" },
    { name: "Plank", sets: "3 × 60 seconds" },
  ]},
];

export const WEEKLY_TASKS = [
  { id: "wt1", name: "Sunday Grocery Shopping", desc: "Buy all items from the grocery list" },
  { id: "wt2", name: "Plan the Week", desc: "Review workout schedule & meal plan for coming days" },
  { id: "wt3", name: "Sunday Recovery Walk", desc: "45–60 min walk + mobility/stretching" },
  { id: "wt4", name: "Track Body Weight", desc: "Weigh in once a week, same time, same conditions" },
  { id: "wt5", name: "Check Progressive Overload", desc: "Review strength numbers, plan next week increases" },
];

export const BIWEEKLY_TASKS = [
  { id: "bwt1", name: "Chicken Order (2.5kg)", desc: "Order chicken breast — enough for 2 weeks of prep" },
  { id: "bwt2", name: "Wednesday Meal Prep (Thu–Sat)", desc: "Cook 1.2kg chicken, 450g rice, vegetables. Portion 6 containers" },
  { id: "bwt3", name: "Whey Protein Restock Check", desc: "Check protein powder levels, reorder if needed" },
];

export const GROCERY_SUNDAY = [
  { name: "Eggs", qty: "30 pcs" },
  { name: "Greek Yogurt", qty: "~1 kg" },
  { name: "Oats", qty: "500 g" },
  { name: "Rice", qty: "700 g" },
  { name: "Bananas", qty: "7 pcs" },
  { name: "Apples / other fruit", qty: "4–5 pcs" },
  { name: "Broccoli", qty: "500 g" },
  { name: "Carrots", qty: "300 g" },
  { name: "Spinach", qty: "300 g" },
  { name: "Bell Peppers", qty: "3 pcs" },
  { name: "Onions", qty: "4–5 pcs" },
  { name: "Tomatoes", qty: "4–5 pcs" },
  { name: "Garlic & Ginger", qty: "as needed" },
  { name: "Almonds", qty: "200 g" },
];

export const GROCERY_BIWEEKLY = [
  { name: "Chicken Breast", qty: "2.5 kg (order online)" },
];

export const GROCERY_PANTRY = [
  { name: "Olive Oil", qty: "refill if needed" },
  { name: "Whey Protein", qty: "restock if low" },
  { name: "Salt, Pepper, Paprika, Garlic powder", qty: "spices" },
];

export const SLEEP_STEPS = [
  {
    id: "ss1",
    title: "Wake Up Early — No Matter What",
    desc: "Even if you slept at 1–2 AM, wake at 6:30–7 AM tomorrow. This builds sleep pressure for the next night.",
    detail: "→ Set an alarm tonight for 6:30 AM\n→ Do NOT snooze or go back to sleep\n→ Getting up tired is the whole point — it resets your pressure system\n→ This is the single most important step"
  },
  {
    id: "ss2",
    title: "Get Morning Sunlight Immediately",
    desc: "Within 30 minutes of waking, get outside. Sunlight tells your brain 'it's daytime' and resets the internal clock.",
    detail: "→ 10–15 minutes outdoors is enough\n→ Don't wear sunglasses during this time\n→ Even on cloudy days, outdoor light is 10–100× brighter than indoor\n→ This is the most powerful circadian signal your body has"
  },
  {
    id: "ss3",
    title: "Exercise Early (You Already Have This!)",
    desc: "Your 6 AM gym plan actually accelerates the reset. Morning exercise shifts circadian rhythm earlier and improves sleep quality.",
    detail: "→ Gym at 6 AM = circadian reset + sleep pressure build-up\n→ Even a 20-min walk counts on low-energy days\n→ Avoid intense evening exercise during the reset period\n→ Your protocol is already built for this"
  },
  {
    id: "ss4",
    title: "No Caffeine After 1 PM",
    desc: "Caffeine has a 6–8 hour half-life. Coffee at 3 PM = half active at 9–11 PM. This directly delays your sleep onset.",
    detail: "→ Coffee and black tea: morning only\n→ Green tea also has caffeine — limit after noon\n→ No pre-workout supplements in the evening\n→ This one rule alone can shift sleep by 1–2 hours"
  },
  {
    id: "ss5",
    title: "Control Evening Light After 9 PM",
    desc: "Artificial blue light suppresses melatonin production. This is the #1 cause of modern sleep delay.",
    detail: "→ Dim all house lights after 9 PM\n→ Enable Night Mode / warm display on phone\n→ Avoid bright laptop screens if possible\n→ Candles or lamp light is ideal\n→ Blue light blocking glasses can help if you must use screens"
  },
  {
    id: "ss6",
    title: "Wind-Down Routine at 9:30 PM",
    desc: "Signal your brain that sleep is approaching. This is non-negotiable during the reset period.",
    detail: "→ 9:30 PM: Light stretching (5–10 min)\n→ Warm shower — the temperature drop afterward promotes sleep\n→ Reading (physical book or e-ink, not phone)\n→ Calm music or nothing\n→ Keep the same wind-down cue every night — your brain learns it"
  },
  {
    id: "ss7",
    title: "If You Can't Sleep — Get Up",
    desc: "Don't lie in bed frustrated. After 20 minutes of lying awake, get up. This prevents your brain associating bed with wakefulness.",
    detail: "→ Don't check the time repeatedly\n→ Get up, go to another dim room\n→ Read something calm — nothing stimulating\n→ No phone, no email\n→ Return only when you feel genuinely sleepy\n→ This is called Stimulus Control Therapy and it works"
  },
  {
    id: "ss8",
    title: "Optional: Magnesium Glycinate",
    desc: "Magnesium helps muscle relaxation and nervous system calm. It can meaningfully improve sleep quality during the reset.",
    detail: "→ Dose: 200–400 mg Magnesium Glycinate\n→ Take 30–60 minutes before bed\n→ Glycinate form is best absorbed with fewest side effects\n→ Not a sleeping pill — it supports natural relaxation\n→ Available at most pharmacies and online"
  },
];
