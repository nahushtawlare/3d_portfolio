import { Suspense, useEffect, useState, FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../CanvasLoader'

type ComputerProps = {
    isMobile: boolean
}

const Computer: FC<ComputerProps> = (isMobile) => {
    const computer = useGLTF('./desktop_pc/scene.gltf')
    return (
        <mesh>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                scale={isMobile ? 0.7 : 0.75}
                position={isMobile ? [0, 0, -1] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
                object={computer.scene}
            />
        </mesh>
    )
}

const ComputerCanvas: FC = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)')
        setIsMobile(mediaQuery.matches)

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches)
        }
        mediaQuery.addEventListener('change', handleMediaQueryChange)

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computer isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    )
}

export default ComputerCanvas
