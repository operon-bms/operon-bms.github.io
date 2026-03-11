# FacilityAI Demo — JLL Hong Kong

**Autonomous Facility Management Agent** — Not just monitoring, but action.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Login with any credentials to access the demo.

---

## 🎯 Demo Flow (5 Screens)

### Screen 1: Overnight Summary (Landing Page)
**URL:** `/summary`

The FM opens the app at 7 AM and sees what FacilityAI already did while they were sleeping:
- **17 actions taken automatically** — CHW setpoints, AHU fan speeds, fresh air adjustments, TES charging shifts
- **1 fault detected** — Vendor contacted, awaiting confirmation
- **3 decisions needed** — Total time required: ~4 minutes

**Key message:** "FacilityAI ran your buildings last night. Here's what happened."

---

### Screen 2: Predictive Maintenance → Vendor → Work Order
**URL:** `/predictive`

Shows the full predictive → vendor → work order flow as one continuous screen:
- Chiller-3 bearing wear detected (94% confidence, 8–14 days to failure)
- Cost comparison: Planned repair HKD 9,500–12,000 vs Emergency HKD 28,000–45,000
- **AI Quote Validator** — Catches HKD 73,000 overquote from vendor
- One-tap work order approval → Sent to CoolTech HK

**Key message:** "Total FM time: 8 seconds. Potential savings: HKD 73,000 on this repair alone."

---

### Screen 3: ROI Calculator
**URL:** `/roi`

Live, interactive ROI calculator with sliders:
- Input: Number of buildings, FM headcount, average salary
- Output: Monthly savings, annual savings, payback period
- Shows headcount reduction impact (typically 50–60%)

**Key message:** "Positive cash flow from month 1. FacilityAI pays for itself immediately."

---

### Screen 4: EPD Compliance Autopilot
**URL:** `/compliance`

Hong Kong Environmental Protection Department compliance automation:
- WSD water test schedule with overdue/urgent/compliant status
- One-click certificate generation (12 seconds vs 4–6 hours manually)
- Auto-reminder and escalation system

**Key message:** "Full EPD compliance, auto-generated. No manual data compilation."

---

### Screen 5: Water Tank Guardian (HK-Specific)
**URL:** `/water`

Intelligent water tank monitoring — Hong Kong WSD compliant:
- Real-time overflow prevention (52 minutes before projected overflow)
- Float valve failure detection
- Water quality compliance tracking
- Consumption anomaly detection (leaks, theft)

**Key message:** "HKD 150,000–400,000 in damage prevented from one float valve failure."

---

## 🆕 New Features (Competitor Cannot Show)

### 1. Autonomous Overnight Actions
- System runs buildings automatically overnight
- Presents FM with summary, not dashboards
- "What did the AI already do?" not "What's happening now?"

### 2. Repair Quote Validator
- AI cross-references vendor quotes against sensor data
- Detects overquotes (average savings: HKD 23,000 per quote)
- Recommends counter-proposal scope

### 3. Monthly Bill Explainer
- Electricity bill variance explained line-by-line
- Weather impact, extended hours, efficiency drops identified
- Generates owner-ready report in 12 seconds

### 4. Tenant Complaint Intelligence
- Cross-references complaints against sensor data
- Auto-resolves valid complaints (adjusts setpoints)
- Provides data-backed responses for perception issues
- Resolution time: 52 seconds (vs 30–90 minutes manually)

### 5. AI Shift Handover Brief
- Auto-generated brief at shift change
- Open items, contractor schedule, monitoring load
- Zero information gap between shifts

### 6. Side-by-Side Comparison
**URL:** `/comparison`

Direct comparison with competitor platform:
- Upfront cost: HKD 0 vs USD $76,000
- AI costs: Included vs You pay Claude separately
- Ready by: Week 1 pilot vs Sep 2026
- HK-specific features: EPD, WSD, CLP tariffs

---

## 📁 New Files Added

### Pages
- `src/pages/OvernightSummary.jsx` — New landing page
- `src/pages/ROICalculator.jsx` — Live ROI calculator
- `src/pages/ComplianceAutopilot.jsx` — EPD compliance
- `src/pages/WaterTankGuardian.jsx` — Water tank monitoring
- `src/pages/ComparisonPage.jsx` — Competitor comparison

### Components
- `src/components/BillExplainer.jsx` — Monthly bill variance explainer
- `src/components/QuoteValidator.jsx` — Repair quote validator
- `src/components/TenantComplaintIntelligence.jsx` — Tenant complaint loop
- `src/components/ShiftHandoverBrief.jsx` — Shift handover brief

---

## 🎨 Design Philosophy

**Autonomy, not monitoring.**

The competitor's demo shows a monitoring platform — dashboards, charts, sensor readings, recommendations to approve. It is visually impressive but it is fundamentally a tool that makes FM work easier.

This demo shows something categorically different: an autonomous agent that runs buildings overnight and presents humans with decisions, not data.

Every screen answers one question: **"What did the human not have to do because the AI did it?"**

---

## 🇭🇰 Hong Kong Specific Features

1. **EPD IAQ Compliance** — Environmental Protection Department Indoor Air Quality certificates
2. **WSD Water Tank Monitoring** — Water Supplies Department compliant tank monitoring
3. **CLP/HKE Tariff Intelligence** — Time-of-use tariff arbitrage opportunities
4. **HK Vendor Network** — Pre-integrated Hong Kong maintenance vendors
5. **Gravity Tank System** — Rooftop/mid-floor tank overflow prevention (HK building pattern)

---

## 💰 Pricing Model

All tiers include: unlimited AI usage, predictive maintenance, vendor matching, HK compliance reports, 24/7 support. No hidden API costs — Claude usage is included.

| Buildings | Price (HKD/month) |
|-----------|-------------------|
| 1–5       | 45,000            |
| 6–10      | 75,000            |
| 11–20     | 135,000           |
| 21–50     | 285,000           |
| 50+       | 520,000           |

---

## 🏃‍♂️ Running the Demo

```bash
# Development
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Live Demo:** https://operon-bms.github.io

---

## 📊 Demo Script (5 Minutes)

**Minute 1:** Open Overnight Summary — "This is what happened while you slept."
**Minute 2:** Show Predictive Maintenance + Quote Validator — "HKD 73,000 overquote caught."
**Minute 3:** ROI Calculator — "Drag the sliders. Positive cash flow from month 1."
**Minute 4:** Water Tank Guardian — "Overflow prevented 52 minutes before it happened."
**Minute 5:** Comparison Page — "They monitor buildings. We run them."

---

## 🔐 Security

- ISO 27001 compliant infrastructure
- All data encrypted at rest and in transit
- No real building data in this demo — all simulated

---

## 📞 Contact

Built for JLL Hong Kong facility management team.

**Demo Philosophy:** Autonomy, not monitoring.
