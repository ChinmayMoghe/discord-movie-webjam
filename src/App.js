import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Pyramid from "./objects/Pyramid";

function App() {
  return (
    <div className="App">
      <Canvas style={{ backgroundColor: "black" }}>
        <ambientLight intensity={1} color={0xfff000} />
        <spotLight position={[20, -10, 0]} angle={0.3} color={0xfff000} />
        <spotLight position={[10, -20, 0]} angle={0.3} color={0xfff000} />
        <spotLight position={[30, 40, 0]} angle={0.3} color={0xfff000} />
        <OrbitControls />
        <Stars />
        <Pyramid color="orangered" />
      </Canvas>
    </div>
  );
}

export default App;
