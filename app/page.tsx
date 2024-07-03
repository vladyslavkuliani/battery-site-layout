import { promises as fs } from 'fs';

import BatterySiteEstimator from './components/BatterySiteEstimator';
import { Device } from './types';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/app/api/deviceOptions.json', 'utf8');
  const deviceOptions = JSON.parse(file) as Device[];

  return (
    <main className="container mx-auto my-3">
      <h1 className="my-4 text-2xl">Battery Site Estimator</h1>
      <BatterySiteEstimator deviceOptions={deviceOptions} />
    </main>
  );
}
