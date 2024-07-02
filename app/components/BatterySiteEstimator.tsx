"use client";

import DevicePurchaseOption from './DevicePurchaseOption';
import { Device, DeviceType } from '../types';
import { useReducer } from 'react';
import { formatCurrency } from '../utils';


type Summary = {
  usedDevicesByTypeCounts: { [key in DeviceType]: number };
  totalCost: number;
};
type ReducerAction = {
  type: 'addItem' | 'removeItem';
  deviceType: DeviceType;
};

export default function BatterySiteEstimator({ deviceOptions }: { deviceOptions: Device[] }) {
  const [summary, dispatch] = useReducer(
    (state, action: ReducerAction) => {
      const computeDevicesTotalCost = (devicesByTypeCounts: { [key in DeviceType]: number }) => {
        const devicesByType: { [key in DeviceType]?: Device } = deviceOptions.reduce((acc, option) => {
          acc[option.type] = option;
          return acc;
        }, {} as { [key in DeviceType]?: Device })

        return Object.entries(devicesByTypeCounts).reduce((acc, [deviceType, count]) => {
          const device = devicesByType[deviceType as DeviceType];
          return acc + count * (device?.cost ?? 0);
        }, 0);
      }

      if (action.type === 'addItem') {
        const deviceType = action.deviceType;

        const usedDevicesByTypeCounts = {
          ...state.usedDevicesByTypeCounts,
          [deviceType]: 1 + (state.usedDevicesByTypeCounts[deviceType] || 0)
        };

        return {
          usedDevicesByTypeCounts,
          totalCost: computeDevicesTotalCost(usedDevicesByTypeCounts)
        };
      }

      if (action.type === 'removeItem') {
        const deviceType = action.deviceType;

        const usedDevicesByTypeCounts = {
          ...state.usedDevicesByTypeCounts,
          [deviceType]: Math.max((state.usedDevicesByTypeCounts[deviceType] || 0) - 1, 0),
        };

        return {
          usedDevicesByTypeCounts,
          totalCost: computeDevicesTotalCost(usedDevicesByTypeCounts)
        };
      }

      throw new Error(`Unknown action type. Got: ${action.type}`);
    }, {
    usedDevicesByTypeCounts: {},
    totalCost: 0,
  });

  return <div className="flex flex-row my-3 p-3">
    <div className="basis-1/2">
      <h2 className="text-xl mb-3">Select device</h2>
      {deviceOptions.map(option => <DevicePurchaseOption key={option.label} className="mb-2" option={option} onAdd={() => dispatch({ type: 'addItem', deviceType: option.type })} onRemove={() => dispatch({ type: 'removeItem', deviceType: option.type })} />)}
    </div>
    <div className="basis-1/2">
      <div className="text-xl flex justify-between">
        <div>Total cost: {formatCurrency(summary?.totalCost)}</div>
      </div>
      <div>Layout</div>
    </div>
  </div>
}
