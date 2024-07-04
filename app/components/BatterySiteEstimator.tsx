"use client";

import DevicePurchaseOption from './DevicePurchaseOption';
import SiteLayout from './SiteLayout';
import { Device, DeviceType } from '../types';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../utils';
import { Alert, Link } from '@mui/material';


type DeviceCountByType = { [key in DeviceType]?: number };
type Summary = {
  totalCost: number;
  requiredEnergy: number;
  requiredLandSize: number;
  missingTransformers: number;
  requiredTransformersCount: number;
  megapacksCount: number;
};

export default function BatterySiteEstimator({ deviceOptions, on }: { deviceOptions: Device[] }) {
  const devicesByType: { [key in DeviceType]?: Device } = deviceOptions.reduce((acc, option) => {
    acc[option.type] = option;
    return acc;
  }, {} as { [key in DeviceType]?: Device })

  const computeDeviceMetric = (devicesCountsByType: DeviceCountByType, metricType: 'cost' | 'energyMw') => {
    return Object.entries(devicesCountsByType).reduce((acc, [deviceType, count]) => {
      const device = devicesByType[deviceType as DeviceType];
      return acc + count * (device?.[metricType] ?? 0);
    }, 0);
  };
  const computeDeviceLandSize = (devicesCountsByType: DeviceCountByType) => {
    return Object.entries(devicesCountsByType).reduce((acc, [deviceType, count]) => {
      const device = devicesByType[deviceType as DeviceType];
      return acc + count * (device?.widthFeet ?? 0) * (device?.lengthFeet ?? 0);
    }, 0);
  };

  const [devicesCountsByType, setDevicesCount] = useState<DeviceCountByType>({});
  const setDeviceCount = (deviceType: DeviceType, count: number) => {
    setDevicesCount({
      ...devicesCountsByType,
      [deviceType]: count,
    })
  };

  const [summary, setSummary] = useState<Summary>({
    totalCost: 0,
    requiredEnergy: 0,
    requiredLandSize: 0,
    missingTransformers: 0,
    requiredTransformersCount: 0,
    megapacksCount: 0,
  })

  useEffect(() => {
    const megapacksCount = Object.entries(devicesCountsByType).reduce((acc, [deviceType, count]) => {
      if (deviceType === 'Transformer') {
        return acc;
      }

      return acc + count;
    }, 0);
    const requiredTransformersCount = Math.ceil(megapacksCount / 4);

    setSummary({
      totalCost: computeDeviceMetric(devicesCountsByType, 'cost'),
      requiredEnergy: computeDeviceMetric(devicesCountsByType, 'energyMw'),
      requiredLandSize: computeDeviceLandSize(devicesCountsByType),
      megapacksCount: megapacksCount,
      requiredTransformersCount: requiredTransformersCount,
      missingTransformers: Math.max(requiredTransformersCount - (devicesCountsByType['Transformer'] ?? 0), 0),
    })
  }, [devicesCountsByType]);

  return <div className="flex flex-row my-3 p-3">
    <div className="basis-1/2">
      <h2 className="text-xl mb-3">Select device</h2>
      {deviceOptions.map(option => (
        <DevicePurchaseOption
          key={option.label}
          className="mb-2"
          option={option}
          count={devicesCountsByType[option.type] || 0}
          onInput={(number) => setDeviceCount(option.type, number)}
        />))}
    </div>
    <div className="basis-1/2">
      <div className='text-xl mb-3'>Summary</div>
      <div className='mb-4'>
        <div>Total cost: {formatCurrency(summary?.totalCost)}</div>
        <div>Total energy: {summary?.requiredEnergy}MWh</div>
        <div className="mb-2">Land size: {summary.requiredLandSize}Sq Ft</div>

        {summary.missingTransformers ? <Alert severity="warning">
          You need at least {summary.requiredTransformersCount} {summary.requiredTransformersCount > 1 ? 'transformers' : 'transformer'} to support {summary.megapacksCount} {summary.megapacksCount > 1 ? 'batteries' : 'battery'}. But you've added {devicesCountsByType['Transformer'] ?? 0} so far.
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setDeviceCount('Transformer', (devicesCountsByType['Transformer'] ?? 0) + summary.missingTransformers);
            }}
          >
            Quick add {summary.missingTransformers} missing transformers.
          </Link>
        </Alert> : null}
      </div>

      <div className='text-xl h-4/5'>
        <SiteLayout devicesByType={devicesByType} devicesCountsByType={devicesCountsByType} />
      </div>
    </div>
  </div>
}
