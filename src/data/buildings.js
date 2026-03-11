export const buildings = [
  {
    id: "one-taikoo-place",
    name: "One Taikoo Place",
    type: "Retail/Shopping",
    floors: 6,
    energyScore: 85,
    basEnabled: true,
    equipment: ["AHU-GF-R2-1", "CHW-Pump-1", "CW-Pump-1", "Chiller-1", "Chiller-2", "Cooling-Tower-1"],
    sensors: {
      saTemp: { label: "SA Temp", value: 15.9, unit: "°C", min: 10, max: 18, status: "ok" },
      raTemp: { label: "RA Temp", value: 23.9, unit: "°C", min: 20, max: 26, status: "ok" },
      vsdTemp: { label: "VSD Temp", value: 48.0, unit: "°C", min: 0, max: 55, status: "warning" },
      co2: { label: "CO₂", value: 1119, unit: "ppm", min: 400, max: 1200, status: "warning" },
      humidity: { label: "Humidity", value: 63.2, unit: "%", min: 30, max: 70, status: "ok" },
      dewPoint: { label: "Dew Point", value: 16.5, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 2,
    energySavedToday: 142,
    costSavedToday: 156,
    phase: "Peak Operations"
  },
  {
    id: "pacific-centre",
    name: "Pacific Centre",
    type: "Commercial Office",
    floors: 28,
    energyScore: 61,
    basEnabled: true,
    equipment: ["AHU-B1-01", "AHU-B1-02", "CHW-Pump-1", "CHW-Pump-2", "Chiller-1", "Chiller-2", "Chiller-3"],
    sensors: {
      saTemp: { label: "SA Temp", value: 17.2, unit: "°C", min: 10, max: 18, status: "ok" },
      raTemp: { label: "RA Temp", value: 25.1, unit: "°C", min: 20, max: 26, status: "ok" },
      vsdTemp: { label: "VSD Temp", value: 51.3, unit: "°C", min: 0, max: 55, status: "warning" },
      co2: { label: "CO₂", value: 987, unit: "ppm", min: 400, max: 1200, status: "ok" },
      humidity: { label: "Humidity", value: 71.4, unit: "%", min: 30, max: 70, status: "warning" },
      dewPoint: { label: "Dew Point", value: 18.1, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 4,
    energySavedToday: 89,
    costSavedToday: 97,
    phase: "Peak Operations",
    predictiveFault: {
      equipment: "Chiller-3",
      fault: "Compressor bearing wear",
      confidence: 94,
      daysToFailure: "8–14",
      repairCost: "HKD 9,500–12,000",
      emergencyCost: "HKD 28,000–45,000",
      replacementCost: "HKD 320,000"
    }
  },
  {
    id: "harbour-view",
    name: "Harbour View Tower",
    type: "Mixed-Use",
    floors: 42,
    energyScore: 72,
    basEnabled: true,
    equipment: ["AHU-L1-01", "AHU-L20-01", "CHW-Pump-1", "Chiller-1", "Chiller-2", "Cooling-Tower-1"],
    sensors: {
      saTemp: { label: "SA Temp", value: 14.8, unit: "°C", min: 10, max: 18, status: "ok" },
      raTemp: { label: "RA Temp", value: 22.4, unit: "°C", min: 20, max: 26, status: "ok" },
      vsdTemp: { label: "VSD Temp", value: 42.1, unit: "°C", min: 0, max: 55, status: "ok" },
      co2: { label: "CO₂", value: 782, unit: "ppm", min: 400, max: 1200, status: "ok" },
      humidity: { label: "Humidity", value: 58.9, unit: "%", min: 30, max: 70, status: "ok" },
      dewPoint: { label: "Dew Point", value: 15.2, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 1,
    energySavedToday: 203,
    costSavedToday: 223,
    phase: "Peak Operations"
  },
  {
    id: "central-plaza",
    name: "Central Plaza",
    type: "Commercial Office",
    floors: 35,
    energyScore: 90,
    basEnabled: true,
    equipment: ["AHU-01", "AHU-02", "AHU-03", "CHW-Pump-1", "Chiller-1", "Chiller-2"],
    sensors: {
      saTemp: { label: "SA Temp", value: 13.2, unit: "°C", min: 10, max: 18, status: "ok" },
      raTemp: { label: "RA Temp", value: 21.7, unit: "°C", min: 20, max: 26, status: "ok" },
      vsdTemp: { label: "VSD Temp", value: 38.6, unit: "°C", min: 0, max: 55, status: "ok" },
      co2: { label: "CO₂", value: 645, unit: "ppm", min: 400, max: 1200, status: "ok" },
      humidity: { label: "Humidity", value: 52.1, unit: "%", min: 30, max: 70, status: "ok" },
      dewPoint: { label: "Dew Point", value: 12.8, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 0,
    energySavedToday: 318,
    costSavedToday: 349,
    phase: "Peak Operations"
  },
  {
    id: "kowloon-bay",
    name: "Kowloon Bay Centre",
    type: "Industrial/Warehouse",
    floors: 8,
    energyScore: 78,
    basEnabled: false,
    equipment: ["AHU-GF-01", "CHW-Pump-1", "Chiller-1"],
    sensors: {
      saTemp: { label: "SA Temp", value: 16.4, unit: "°C", min: 10, max: 18, status: "ok" },
      raTemp: { label: "RA Temp", value: 24.3, unit: "°C", min: 20, max: 26, status: "ok" },
      vsdTemp: { label: "VSD Temp", value: 44.8, unit: "°C", min: 0, max: 55, status: "ok" },
      co2: { label: "CO₂", value: 890, unit: "ppm", min: 400, max: 1200, status: "ok" },
      humidity: { label: "Humidity", value: 61.7, unit: "%", min: 30, max: 70, status: "ok" },
      dewPoint: { label: "Dew Point", value: 15.9, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 1,
    energySavedToday: 67,
    costSavedToday: 73,
    phase: "Pre-Shutdown"
  },
  {
    id: "aberdeen-industrial",
    name: "Aberdeen Industrial",
    type: "Industrial/Warehouse",
    floors: 5,
    energyScore: 55,
    basEnabled: false,
    equipment: ["AHU-GF-01", "AHU-GF-02", "Chiller-1"],
    sensors: {
      saTemp: { label: "SA Temp", value: 19.1, unit: "°C", min: 10, max: 18, status: "warning" },
      raTemp: { label: "RA Temp", value: 27.4, unit: "°C", min: 20, max: 26, status: "warning" },
      vsdTemp: { label: "VSD Temp", value: 53.2, unit: "°C", min: 0, max: 55, status: "warning" },
      co2: { label: "CO₂", value: 1340, unit: "ppm", min: 400, max: 1200, status: "critical" },
      humidity: { label: "Humidity", value: 74.3, unit: "%", min: 30, max: 70, status: "warning" },
      dewPoint: { label: "Dew Point", value: 20.1, unit: "°C", min: 5, max: 25, status: "ok" }
    },
    pendingRecs: 5,
    energySavedToday: 12,
    costSavedToday: 13,
    phase: "Night Mode"
  }
];

export const getBuildingById = (id) => buildings.find(b => b.id === id);
