export const allRecommendations = {
  "1u-mall": [
    {
      id: "rec-001",
      priority: 1,
      confidence: 91,
      category: "Setpoint",
      action: "Reduce AHU-2 fan speed from 85% → 70%",
      detail: "Occupancy sensor shows Zone B at 40% capacity. Supply air volume exceeds demand by approximately 45%. Reducing fan speed will lower energy consumption without impacting comfort.",
      energyImpact: 12.4,
      status: "pending",
      equipment: "AHU-GF-R2-1",
      timestamp: "14:12"
    },
    {
      id: "rec-002",
      priority: 2,
      confidence: 87,
      category: "Setpoint",
      action: "Raise CHW setpoint from 6°C → 7.5°C during 14:00–17:00",
      detail: "Current chilled water temp is 1.5°C below required. Raising setpoint reduces compressor load while maintaining zone comfort within ±0.5°C.",
      energyImpact: 18.2,
      status: "pending",
      equipment: "Chiller-1",
      timestamp: "13:45"
    },
    {
      id: "rec-003",
      priority: 3,
      confidence: 78,
      category: "Schedule",
      action: "Pre-cool schedule: start 30 min earlier tomorrow",
      detail: "Weather forecast shows 34°C tomorrow. Early pre-cooling prevents peak demand spike and reduces maximum kW draw by estimated 15%.",
      energyImpact: 8.7,
      status: "monitoring",
      equipment: "AHU-GF-R2-1",
      timestamp: "12:30"
    }
  ],
  "pacific-centre": [
    {
      id: "rec-004",
      priority: 1,
      confidence: 93,
      category: "Setpoint",
      action: "Reduce CHW flow rate by 12% on Chiller-2",
      detail: "Delta-T across evaporator indicates excess flow. Reducing flow rate will improve COP from 4.1 to estimated 4.8.",
      energyImpact: 24.1,
      status: "pending",
      equipment: "Chiller-2",
      timestamp: "14:05"
    },
    {
      id: "rec-005",
      priority: 1,
      confidence: 89,
      category: "Maintenance",
      action: "Schedule Chiller-3 bearing inspection",
      detail: "Vibration signature anomaly detected. 94% match to pre-failure pattern. Scheduled maintenance prevents emergency repair.",
      energyImpact: 0,
      status: "pending",
      equipment: "Chiller-3",
      timestamp: "13:22"
    },
    {
      id: "rec-006",
      priority: 2,
      confidence: 85,
      category: "Setpoint",
      action: "Increase AHU-B1-02 supply air temp from 13°C → 14.5°C",
      detail: "Current supply overcools Zone A. Tenants reporting discomfort. Raising supply temp balances comfort and energy.",
      energyImpact: 9.6,
      status: "pending",
      equipment: "AHU-B1-02",
      timestamp: "11:50"
    },
    {
      id: "rec-007",
      priority: 3,
      confidence: 76,
      category: "Schedule",
      action: "Shift peak cooling to TES discharge 14:00–16:00",
      detail: "TES tank at 82% capacity. Using stored cooling during peak hours reduces grid demand and avoids peak tariff.",
      energyImpact: 31.5,
      status: "monitoring",
      equipment: "Chiller-1",
      timestamp: "10:15"
    }
  ],
  "harbour-view": [
    {
      id: "rec-008",
      priority: 2,
      confidence: 84,
      category: "Setpoint",
      action: "Optimise cooling tower fan staging",
      detail: "Tower fan running at 100% with ambient wet-bulb at 24°C. Staging to 75% maintains condenser approach within 1°C.",
      energyImpact: 14.3,
      status: "pending",
      equipment: "Cooling-Tower-1",
      timestamp: "14:18"
    }
  ],
  "central-plaza": [],
  "kowloon-bay": [
    {
      id: "rec-009",
      priority: 2,
      confidence: 82,
      category: "Schedule",
      action: "Reduce after-hours HVAC to minimum ventilation",
      detail: "HVAC running full capacity until 22:00 despite building vacancy after 19:00. Switch to minimum OA mode at 19:00.",
      energyImpact: 22.8,
      status: "pending",
      equipment: "AHU-GF-01",
      timestamp: "13:55"
    }
  ],
  "aberdeen-industrial": [
    {
      id: "rec-010",
      priority: 1,
      confidence: 95,
      category: "Schedule",
      action: "Adjust AHU schedule from 06:00–22:00 → 07:00–20:00",
      detail: "3 AHUs running 2 hours beyond occupancy. Adjusting schedule saves HKD 8,400/month with no comfort impact.",
      energyImpact: 38.2,
      status: "pending",
      equipment: "AHU-GF-01",
      timestamp: "14:20"
    },
    {
      id: "rec-011",
      priority: 1,
      confidence: 92,
      category: "Setpoint",
      action: "Raise night cooling setpoint from 22°C → 26°C",
      detail: "Excessive night cooling consuming 18% of daily energy. Building unoccupied 20:00–07:00, no comfort requirement.",
      energyImpact: 28.7,
      status: "pending",
      equipment: "Chiller-1",
      timestamp: "14:15"
    },
    {
      id: "rec-012",
      priority: 2,
      confidence: 88,
      category: "IAQ",
      action: "Increase fresh air supply to reduce CO₂ from 1,340 → <1,000 ppm",
      detail: "CO₂ exceeds EPD Class 1 limit (1,000 ppm). Increase OA damper from 30% to 50%.",
      energyImpact: -4.2,
      status: "monitoring",
      equipment: "AHU-GF-02",
      timestamp: "13:40"
    },
    {
      id: "rec-013",
      priority: 3,
      confidence: 75,
      category: "Maintenance",
      action: "Clean AHU-GF-01 coils — pressure drop 23% above baseline",
      detail: "Elevated static pressure indicates fouled coils. Cleaning improves airflow efficiency and reduces fan energy.",
      energyImpact: 11.5,
      status: "pending",
      equipment: "AHU-GF-01",
      timestamp: "12:20"
    },
    {
      id: "rec-014",
      priority: 3,
      confidence: 71,
      category: "Setpoint",
      action: "Enable demand-controlled ventilation based on CO₂",
      detail: "Fixed ventilation rate exceeds requirement during low occupancy. DCV can reduce OA energy by 25%.",
      energyImpact: 15.3,
      status: "pending",
      equipment: "AHU-GF-02",
      timestamp: "11:45"
    }
  ]
};
