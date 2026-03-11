export const chatExamples = [
  {
    id: "energy",
    label: "Energy anomaly analysis",
    messages: [
      {
        role: "user",
        text: "Why is energy consumption 23% higher than yesterday?"
      },
      {
        role: "ai",
        text: `Analysing energy data for all buildings... Found 3 contributing factors:

① **Outdoor temperature:** 32°C today vs 27°C yesterday — accounts for approximately +12% increase. This is expected and within normal variance.

② **Chiller-2 efficiency degradation (Pacific Centre):** Current COP 4.1 vs baseline COP 5.3 — this is abnormal and accounts for approximately +8% excess consumption. I've raised a maintenance inspection work order (WO-2026-0851).

③ **AHU-3 fresh air damper fault (Aberdeen Industrial):** Damper stuck at 85% open, should be 40% during current occupancy. Accounts for approximately +3% excess. I've sent an automated alert to site technician.

Fixing items ② and ③ should recover approximately 11% efficiency.
**Estimated saving if resolved today: HKD 847.**`
      }
    ]
  },
  {
    id: "compliance",
    label: "EPD compliance check",
    messages: [
      {
        role: "user",
        text: "Is the portfolio compliant with EPD IAQ requirements right now?"
      },
      {
        role: "ai",
        text: `Checking IAQ readings across all 6 buildings against EPD Class 1 requirements...

⚠️ **BORDERLINE — 2 buildings require attention:**

**Aberdeen Industrial** — CO₂: 1,340 ppm (EPD Class 1 limit: 1,000 ppm) — **NON-COMPLIANT**
→ Action taken: Increased fresh air supply by 20%. Expected normalisation in 15 min.

**1U Mall** — CO₂: 1,119 ppm (limit: 1,000 ppm) — **WARNING**
→ Action taken: Fresh air supply increased by 10%. Monitoring.

✅ 4 buildings fully compliant (Central Plaza, Harbour View, Kowloon Bay, Pacific Centre)

Monthly EPD report: On track for Class 1 certification across 4 of 6 buildings.
I'll alert you if Aberdeen Industrial CO₂ does not drop below 1,000 ppm within 20 minutes.`
      }
    ]
  },
  {
    id: "performance",
    label: "Worst performer",
    messages: [
      {
        role: "user",
        text: "Which building has the worst energy performance this month and what should I do?"
      },
      {
        role: "ai",
        text: `Aberdeen Industrial is the weakest performer this month — **Energy Score: 55/100** (portfolio average: 74).

Root causes identified:

① **3 AHUs running outside optimal schedule:** currently 06:00–22:00, recommended 07:00–20:00. Saving opportunity: **HKD 8,400/month**.

② **No BAS integration:** all setpoint changes are manual. This building would benefit most from automation.

③ **Cooling setpoints 2°C below requirement during non-occupied hours** — excessive night cooling consuming 18% of daily energy.

If you approve all 3 optimisations, projected improvement: **Energy Score 55 → 71 within 14 days**.

Shall I apply changes ① and ③ automatically? (Change ② requires hardware installation quote.)`,
        showAction: true,
        actionLabel: "Yes, apply changes",
        actionResponse: "✅ Changes applied. Aberdeen Industrial AHU schedule updated to 07:00–20:00. Night cooling setpoint raised from 22°C to 26°C. Monitoring energy impact — I'll report results in tomorrow's morning briefing."
      }
    ]
  }
];

export const fallbackResponse = "I'll analyse that for you. Based on current sensor data across your portfolio, I can see several patterns worth investigating. For detailed analysis, I can generate a full report — would you like me to do that?";
