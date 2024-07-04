import * as THREE from 'three'
import * as React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Device, DeviceType } from '../types'
import { Checkbox, FormControlLabel } from '@mui/material'

function Box({ meshProps, boxX, is3D }: { meshProps: JSX.IntrinsicElements['mesh'], boxX?: number, is3D: boolean }) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)

  return (
    <mesh
      {...meshProps}
      ref={ref}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[boxX || 1, 1, is3D ? 1 : 0]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'white'} />
    </mesh>
  )
}

function Container({ rows, is3D, shouldRotate }: { rows: Array<Array<number>>; is3D: boolean; shouldRotate: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)

  const { camera } = useThree();
  camera.position.z = 8;
  camera.position.x = 0.1;

  useFrame(({ camera }) => {
    if (is3D) {
      if (camera.position.y >= -4) {
        camera.translateY(-0.05)
        camera.lookAt(0, 0, 0)
      }

      if (shouldRotate) {
        ref.current.rotation.z -= 0.001
      }
    }
    else if (!is3D && camera.position.y < 0) {
      ref.current.rotation.z = 0

      camera.translateY(0.05);
      camera.lookAt(0, 0, 0)
    }
  })



  let y = 6.5;
  const spacer = is3D ? 1.5 : 1;
  return (<mesh ref={ref} position={[0, 0, 0]}>
    {
      rows.map((row) => {
        let x = -9.5;
        y -= 1.2 * spacer;
        return row.map((length, i) => {

          x = x + (row[i - 1] ? row[i - 1] / 20 + length / 20 + 0.5 * spacer : 3 + length / 20);

          return (
            <Box
              key={`${length}-${i}`}
              meshProps={{
                position: [x, y, 0],
              }}
              boxX={length / 10}
              is3D={is3D}
            />
          );
        })
      })
    }
  </mesh>);
}

export default function SiteLayout({ devicesByType, devicesCountsByType }: { devicesByType: { [key in DeviceType]?: Device }, devicesCountsByType: { [key in DeviceType]?: number } }) {
  const rows: Array<Array<number>> = [];
  let rowCounter = 0;

  const boxLengths = Object.entries(devicesCountsByType).reduce((acc, entry) => {
    const [deviceType, count] = entry;

    const device = devicesByType[deviceType as DeviceType];
    return [...acc, ...Array(count).fill(device?.lengthFeet)];
  }, []);
  boxLengths.forEach((length) => {
    const index = rowCounter % 10;
    rows[index] = (rows[index] || []).concat(length);
    rowCounter++;
  });

  const [is3D, setShow3D] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);
  useEffect(() => {
    if (!is3D) {
      setShouldRotate(false);
    }
  }, [is3D])

  return (
    <div className='h-4/5'>
      <div className="flex">
        <FormControlLabel
          control={<Checkbox style={{ 'color': '#4B77BE' }} onChange={() => setShow3D(!is3D)} />}
          label="Enable 3D preview"
        />
        <FormControlLabel
          disabled={!is3D}
          control={<Checkbox style={{ 'color': '#4B77BE' }} checked={shouldRotate} onChange={() => setShouldRotate(!shouldRotate)} />}
          label="Enable rotation"
        />
      </div>
      <Canvas className='border'>
        <ambientLight intensity={1} />
        <spotLight position={[50, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Container rows={rows} is3D={is3D} shouldRotate={shouldRotate} />
      </Canvas>
    </div>
  )
}
