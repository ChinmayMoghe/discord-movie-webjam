import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Pyramid from "./objects/Pyramid";
import Noise from "./objects/Noise";
import noise, { perlin3 } from "./utils/noise";

function App() {
  const seed = Math.floor(Math.random() * 2 ** 16);
  noise.seed(seed);
  const sampleNoise = (x, y, z) => {
    let scale = 1 / 8;
    let octaves = 20;
    let persistence = 0.5;
    let lacunarity = 2;
    let amp = 1;
    let freq = 1;
    let value = 0;
    for (let i = 0; i < octaves; i++) {
      value += amp * perlin3(x * freq * scale, y * freq * scale, z);
      amp *= persistence;
      freq *= lacunarity;
    }
    return value;
  };
  const zOfXY = (x, y, t) => {
    return sampleNoise(x * Math.E, y * Math.E, t);
  };

  const colorofXYZ = (x, y, z, t) => {
    return {
      r: z * Math.E,
      g: z / 5,
      b: Math.sqrt(x ** 2 + y ** 2) / 150,
    };
  };
  return (
    <div className="App">
      <Canvas
        style={{ backgroundColor: "black" }}
        camera={{ position: [0, 2, 10], fov: 75 }}
      >
        <ambientLight intensity={1} color={"white"} />
        <OrbitControls />
        <Stars />
        <Pyramid color="blue" scale={[1, 1, 1]} />
        <Noise
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          grid={{ width: 200, height: 200, separation: 0.5 }}
          zofXY={zOfXY}
          colorofXYZ={colorofXYZ}
          anim={{
            init: 0,
            update: (t) => t + 0.02,
          }}
        />
      </Canvas>
    </div>
  );
}

export default App;
