function Pyramid({
  emissive = "#000",
  color = "#000",
  roughness = 0,
  scale = [0.5, 0.5, 0.5],
  rotation = [-360, 65, 0],
}) {
  return (
    <mesh scale={scale} rotation={rotation}>
      <coneBufferGeometry
        attach="geometry"
        args={[4, 6, 3, 2, false, 0, 6.284]}
      />
      <meshStandardMaterial
        attach="material"
        color={color}
        emissive={emissive}
        roughness={roughness}
      />
    </mesh>
  );
}

export default Pyramid;
