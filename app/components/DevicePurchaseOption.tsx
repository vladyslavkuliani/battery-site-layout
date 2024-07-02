import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Device } from '../types';
import { formatCurrency, formatFeet } from '../utils';

export default function DevicePurchaseOption({ option, className }: { option: Device, className?: string }) {
  return (
    <Card className={className}>
      <CardHeader title={option.label}></CardHeader>
      <CardContent className="flex">
        <div className="mr-2">
          <Grid4x4Icon />
          <span>{formatFeet(option.lengthFeet)}</span>
          <span className='mx-1'>X</span>
          <span>{formatFeet(option.widthFeet)}</span>
        </div>

        <div className="mr-2">
          <ElectricBoltIcon />
          {option.energyMw}
        </div>

        <div className='mr-2'>
          {formatCurrency(option.cost)}
        </div>

        {option.releaseYear && <div>
          <CalendarMonthIcon />{option.releaseYear}
        </div>
        }
      </CardContent>
    </Card>
  );
}

