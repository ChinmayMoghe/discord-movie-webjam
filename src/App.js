import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Pyramid() {
  return (
    <mesh scale={[0.5, 0.5, 0.5]} rotation={[-360,65,0]}>
      <coneBufferGeometry
        attach='geometry'
        args={[3.4, 3, 5, 1, false, 0, 6.3]}
      />
      <meshStandardMaterial
        attach='material'
        color='#000'
        emissive='#000'
        roughness={0.3}
      />
    </mesh>
  );
}

function App() {
  return (
    <div className='App'>
      <Canvas>
        <ambientLight intensity={1} color={0xff0000} />
        <spotLight position={[20, -10, 0]} angle={0.3} color={0xff0000} />
        <spotLight position={[10, -20, 0]} angle={0.3} color={0xff0000} />
        <spotLight position={[30, 40, 0]} angle={0.3} color={0xff0000} />
        <OrbitControls />
        <Pyramid />
      </Canvas>
    </div>
  );
}

export default App;
