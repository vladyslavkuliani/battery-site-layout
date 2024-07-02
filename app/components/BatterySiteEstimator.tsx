"use client";

import DevicePurchaseOption from './DevicePurchaseOption';
import { Device, DeviceType } from '../types';
import { useReducer } from 'react';
import { formatCurrency } from '../utils';


type DeviceCountByType = { [key in DeviceType]?: number };
type Summary = {
  usedDevicesByTypeCounts: DeviceCountByType;
  totalCost: number;
};
type ReducerAction = {
  type: 'addItem' | 'removeItem';
  deviceType: DeviceType;
};

export default function BatterySiteEstimator({ deviceOptions }: { deviceOptions: Device[] }) {
  const devicesByType: { [key in DeviceType]?: Device } = deviceOptions.reduce((acc, option) => {
    acc[option.type] = option;
    return acc;
  }, {} as { [key in DeviceType]?: Device })

  const computedDeviceMetric = (devicesCountsByType: DeviceCountByType, metricType: 'cost' | 'energyMw') => {
    return Object.entries(devicesCountsByType).reduce((acc, [deviceType, count]) => {
      const device = devicesByType[deviceType as DeviceType];
      return acc + count * (device?.[metricType] ?? 0);
    }, 0);
  };

  const [summary, dispatch] = useReducer(
    (state: Summary, action: ReducerAction) => {
      const makeState = (usedDevicesByTypeCounts: DeviceCountByType) => {
        return {
          usedDevicesByTypeCounts,
          totalCost: computedDeviceMetric(usedDevicesByTypeCounts, 'cost'),
          requiredEnergy: computedDeviceMetric(usedDevicesByTypeCounts, 'energyMw')
        }
      }

      if (action.type === 'addItem') {
        const deviceType = action.deviceType;

        const usedDevicesByTypeCounts = {
          ...state.usedDevicesByTypeCounts,
          [deviceType]: 1 + (state.usedDevicesByTypeCounts[deviceType] || 0)
        };

        return makeState(usedDevicesByTypeCounts);
      }

      if (action.type === 'removeItem') {
        const deviceType = action.deviceType;

        const usedDevicesByTypeCounts = {
          ...state.usedDevicesByTypeCounts,
          [deviceType]: Math.max((state.usedDevicesByTypeCounts[deviceType] || 0) - 1, 0),
        };

        return makeState(usedDevicesByTypeCounts);
      }

      throw new Error(`Unknown action type. Got: ${action.type}`);
    }, {
    usedDevicesByTypeCounts: {},
    totalCost: 0,
    requiredEnergy: 0,
  });

  return <div className="flex flex-row my-3 p-3">
    <div className="basis-1/2">
      <h2 className="text-xl mb-3">Select device</h2>
      {deviceOptions.map(option => <DevicePurchaseOption key={option.label} className="mb-2" option={option} onAdd={() => dispatch({ type: 'addItem', deviceType: option.type })} onRemove={() => dispatch({ type: 'removeItem', deviceType: option.type })} />)}
    </div>
    <div className="basis-1/2">
      <div className="text-xl flex justify-between">
        <div>Total cost: {formatCurrency(summary?.totalCost)}</div>
        <div>Total energy: {summary?.requiredEnergy}MWh</div>
      </div>
      <div>Layout</div>
    </div>
  </div>
}
