import { useState, useEffect, useCallback, useRef } from 'react';
import { buildings as initialBuildings } from '../data/buildings';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getStatus(value, min, max) {
  const range = max - min;
  if (value >= max - range * 0.05) return 'critical';
  if (value >= max - range * 0.15 || value <= min + range * 0.05) return 'warning';
  return 'ok';
}

function jitterValue(sensor) {
  const range = sensor.max - sensor.min;
  const isAnomaly = Math.random() < 0.02;
  const delta = isAnomaly
    ? (Math.random() - 0.4) * range * 0.08
    : (Math.random() - 0.5) * range * 0.02;
  
  const newValue = clamp(
    sensor.value + delta,
    sensor.min,
    sensor.max
  );
  
  const decimals = sensor.unit === 'ppm' ? 0 : 1;
  const rounded = Number(newValue.toFixed(decimals));
  
  return {
    ...sensor,
    value: rounded,
    status: getStatus(rounded, sensor.min, sensor.max),
  };
}

export function useLiveData() {
  const [buildingData, setBuildingData] = useState(() =>
    initialBuildings.map(b => ({
      ...b,
      sensors: { ...b.sensors },
    }))
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    setIsUpdating(true);
    setBuildingData(prev =>
      prev.map(building => {
        const newSensors = {};
        for (const [key, sensor] of Object.entries(building.sensors)) {
          newSensors[key] = jitterValue(sensor);
        }
        // Jitter energy saved slightly
        const energyDelta = Math.random() < 0.3 ? Math.round(Math.random() * 3) : 0;
        return {
          ...building,
          sensors: newSensors,
          energySavedToday: building.energySavedToday + energyDelta,
          costSavedToday: building.costSavedToday + Math.round(energyDelta * 1.1),
        };
      })
    );
    setTimeout(() => setIsUpdating(false), 500);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(tick, 5000);
    return () => clearInterval(intervalRef.current);
  }, [tick]);

  const getBuildingData = useCallback(
    (id) => buildingData.find(b => b.id === id),
    [buildingData]
  );

  return { buildingData, getBuildingData, isUpdating };
}
