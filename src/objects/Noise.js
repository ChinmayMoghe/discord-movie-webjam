import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Noise = ({
  position,
  rotation,
  grid: { width, height, separation },
  colorofXYZ,
  zofXY,
  anim: { init, update },
}) => {
  let t = init;
  let { positions, colors, normals } = useMemo(() => {
    let positions = [],
      colors = [],
      normals = [];
    //vertex buffers
    for (let yv = 0; yv < height; yv++) {
      for (let xv = 0; xv < height; xv++) {
        let x = separation * (xv - (width - 1) / 2);
        let y = separation * (yv - (width - 1) / 2);
        let z = zofXY(x, y, t);
        positions.push(x, y, z);
        let { r, g, b } = colorofXYZ(x, y, z, t);
        colors.push(r, g, b);
        normals.push(0, 0, 1);
      }
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      normals: new Float32Array(normals),
    };
  }, [height, separation, width, zofXY, t, colorofXYZ]);

  // index buffer
  let indices = useMemo(() => {
    let indices = [];
    let i = 0;
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1);
        indices.push(i + width + 1, i + width, i);
        i++;
      }
      i++;
    }
    return new Uint16Array(indices);
  }, [width, height]);

  let posRef = useRef(),
    colorRef = useRef();
  useFrame(() => {
    t = update(t);
    console.log({ posRef, colorRef });
    const positions = posRef.current.array,
      colors = colorRef.current.array;

    let i = 0;
    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        positions[i + 2] = zofXY(positions[i], positions[i + 1], t);

        let c = colorofXYZ(positions[i], positions[i + 1], positions[i + 2], t);
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
        i += 3;
      }
    }

    posRef.current.needsUpdate = true;
    colorRef.current.needsUpdate = true;
  });
  return (
    <mesh position={position} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          ref={colorRef}
          attachObject={["attributes", "color"]}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "normal"]}
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors={true}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
};

export default Noise;
