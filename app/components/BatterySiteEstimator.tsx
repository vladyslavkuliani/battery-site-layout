"use client";

import DevicePurchaseOption from './DevicePurchaseOption';
import { Device } from '../types';

export default function BatterySiteEstimator({ deviceOptions }: { deviceOptions: Device[] }) {
  return <div className="flex flex-row my-3 p-3">
    <div className="basis-1/2">
      <h2 className="text-xl mb-3">Select device</h2>
      {deviceOptions.map(option => <DevicePurchaseOption key={option.label} className="mb-2" option={option} />)}
    </div>
    <div className="basis-1/2">
      <div>Summary</div>
      <div>Layout</div>
    </div>
  </div>

}
