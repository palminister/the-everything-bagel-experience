import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance, Center } from '@react-three/drei'
import { Vector3 } from 'three'
import { r } from '@/helpers/utils'

const Seed = ({ ...props }) => {
  const instance = useRef()
  // Each seed spins
  useFrame((state, delta) => {
    instance.current.rotation.x -= delta * Math.random()
    instance.current.rotation.y -= delta * Math.random() * 2
  })
  return <Instance ref={instance} {...props} />
}

export const Seeds = ({ count = 100, radius = 10, speed = 0.1, z = 0 }) => {
  const seeds = useMemo(() => {
    // Initialize seed positions
    const position = new Vector3(Math.sin(0) * radius, Math.cos(0) * radius, 0)
    // Add next seed positions
    const positions = new Array(count).fill().map((_, index) => {
      const angle = (index / 20) * Math.PI * 2
      const nextPosition = position
        .add(new Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0))
        .clone()
      nextPosition.z = (Math.random() * 2 - 1) * 10
      return nextPosition
    })
    return positions
  }, [count, radius])

  const group = useRef()
  useFrame((state, delta) => {
    group.current.rotation.z -= delta * speed
  })

  return (
    <Center ref={group} position-z={z}>
      <Instances>
        <sphereGeometry args={[0.5, 3, 3]} />
        <meshStandardMaterial color='black' />
        {seeds.map((position, index) => (
          <Seed key={index} position={position} scale={[r() - 0.05, r() - 0.05, r() - 0.05]} />
        ))}
      </Instances>
    </Center>
  )
}
