import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Device } from '../types';
import { formatCurrency, formatFeet } from '../utils';
import Counter from './Counter';
import counterStyles from './Counter.module.css';
import deviceOptionStyles from './DevicePurchaseOption.module.css';

export default function DevicePurchaseOption({ option, className, onInput }: { option: Device, className?: string, onInput: (n: number) => void }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Card className={deviceOptionStyles.card}>
        <CardHeader title={option.label}></CardHeader>
        <CardContent className="flex items-center">
          <div className='flex items-center basis-1/5'>
            <Grid4x4Icon />
            <span>{formatFeet(option.lengthFeet)}</span>
            <span className='mx-1'>X</span>
            <span>{formatFeet(option.widthFeet)}</span>
          </div>

          <div className='flex items-center justify-center basis-1/6'>
            <ElectricBoltIcon />
            {option.energyMw}
          </div>

          <div className='basis-1/5'>
            {formatCurrency(option.cost)}
          </div>

          {option.releaseYear && <div className='flex items-center'>
            <CalendarMonthIcon />{option.releaseYear}
          </div>
          }

        </CardContent>
      </Card>

      <Counter className={counterStyles.counter} onInput={onInput} />
    </div>
  );
}

