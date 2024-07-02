type BaseDevice = {
  label: string;
  widthFeet: number;
  lengthFeet: number;
  energyMw: number;
  cost: number;
};

export type Device = BaseDevice & ({
  type: 'Megapack 2XL' | 'Megapack 2' | 'Megapack' | 'Powerpack'
  releaseYear: number;
} | { type: 'Transformer', releaseYear: never })

export type DeviceType = Device['type'];
