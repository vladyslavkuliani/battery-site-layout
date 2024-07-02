import { promises as fs } from 'fs';

import DevicePurchaseOption from './components/DevicePurchaseOption';
import { Device } from './types';


export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/app/api/deviceOptions.json', 'utf8');
  const deviceOptions = JSON.parse(file) as Device[];

  return (
    <main className="container mx-auto">
      <h1 className="my-4 text-2xl">Battery Site Estimator</h1>
      <div className="flex flex-row my-3 p-3">
        <div className="basis-1/2">
          <h2 className="text-xl mb-3">Select device</h2>
          {deviceOptions.map(option => <DevicePurchaseOption className="mb-2" option={option} />)}
        </div>
        <div className="basis-1/2">
          <div>Summary</div>
          <div>Layout</div>
        </div>
      </div>
    </main>
  );
}
