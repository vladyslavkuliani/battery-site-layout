import * as THREE from 'three'
import * as React from 'react'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Device, DeviceType } from '../types'

function Box({ meshProps, boxX }: { meshProps: JSX.IntrinsicElements['mesh'], boxX?: number }) {
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
      <boxGeometry args={[boxX || 1, 1, 0]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'green'} />
    </mesh>
  )
}

function Container({ rows }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ camera, mouse }) => {
    // ref.current.rotation.y -= 0.005
  })
  const { camera } = useThree()
  camera.position.z = 8;

  let y = 6.5;
  return (<mesh ref={ref} position={[0, 0, 0]}>
    {
      rows.map((row) => {
        let x = -9.5;
        y -= 1.2;
        return row.map((length, i) => {
          x = x + (row[i - 1] ? row[i - 1] / 20 + length / 20 + 0.5 : 3 + length / 20 );

          return (
            <Box key={`${length}-${i}`} meshProps={{
              position: [x, y, 0],
            }} boxX={length / 10} />
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

  return (
    <Canvas className='border'>
      <ambientLight intensity={1} />
      <spotLight position={[50, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Container rows={rows} />
    </Canvas>
  )
}
