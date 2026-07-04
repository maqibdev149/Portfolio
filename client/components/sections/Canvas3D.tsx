import { Component, type ReactNode, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";
import type { HeroVisualMode } from "@/hooks/useHeroVisualMode";
import { HeroGradientBlob } from "./HeroGradientBlob";

const BRAND_CYAN = "#00BFFF";
const BRAND_BLUE = "#3B82F6";
const BRAND_PURPLE = "#8B5CF6";

type SceneMode = Extract<HeroVisualMode, "desktop-3d" | "mobile-3d">;

function useCodeTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 360;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#060d1a";
    ctx.fillRect(0, 0, 512, 360);

    const lines = [
      { text: "const build = async () => {", color: BRAND_CYAN },
      { text: "  await testEveryEdge();", color: BRAND_BLUE },
      { text: "  return <ShipIt />;", color: BRAND_PURPLE },
      { text: "};", color: BRAND_CYAN },
    ];

    let y = 52;
    lines.forEach((line) => {
      ctx.fillStyle = line.color;
      ctx.font = "bold 22px monospace";
      ctx.fillText(line.text, 28, y);
      y += 44;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Laptop({ simplified }: { simplified: boolean }) {
  const codeTexture = useCodeTexture();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || simplified) return;
    groupRef.current.position.y =
      0.15 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 0]} rotation={[0.15, -0.45, 0]}>
      <mesh position={[0, -0.12, 0]} castShadow={false}>
        <boxGeometry args={[2.4, 0.1, 1.65]} />
        <meshStandardMaterial color="#111827" metalness={0.85} roughness={0.25} />
      </mesh>

      <mesh position={[0, -0.06, -0.05]}>
        <boxGeometry args={[2.15, 0.02, 1.4]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </mesh>

      <group position={[0, 0.55, -0.78]} rotation={[-1.05, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.35, 1.55, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.35} />
        </mesh>

        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.05, 1.25]} />
          <meshStandardMaterial
            map={codeTexture ?? undefined}
            emissive={BRAND_BLUE}
            emissiveIntensity={0.35}
            color="#ffffff"
          />
        </mesh>
      </group>
    </group>
  );
}

function TechTile({
  position,
  children,
}: {
  position: [number, number, number];
  children: ReactNode;
}) {
  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[0.62, 0.62, 0.06]} />
          <meshStandardMaterial
            color="#0f2744"
            transparent
            opacity={0.9}
            emissive={BRAND_BLUE}
            emissiveIntensity={0.45}
            metalness={0.55}
            roughness={0.2}
          />
        </mesh>
        <Html
          center
          distanceFactor={5.5}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="flex items-center justify-center w-9 h-9 text-white text-2xl drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
            {children}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function GlowPortal() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <group position={[0, -0.55, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 2.15, 64]} />
        <meshBasicMaterial
          color={BRAND_BLUE}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.028, 16, 100]} />
        <meshBasicMaterial color={BRAND_CYAN} transparent opacity={0.85} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[1.2, 48]} />
        <meshBasicMaterial
          color={BRAND_PURPLE}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight position={[0, 0.4, 0]} intensity={1.4} color={BRAND_BLUE} distance={4} />
    </group>
  );
}

function OrbitLines() {
  return (
    <>
      <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[2.6, 0.004, 8, 120]} />
        <meshBasicMaterial color={BRAND_BLUE} transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, -0.5, 0.2]}>
        <torusGeometry args={[3.1, 0.003, 8, 120]} />
        <meshBasicMaterial color={BRAND_PURPLE} transparent opacity={0.15} />
      </mesh>
    </>
  );
}

function HeroScene({ mode }: { mode: SceneMode }) {
  const isMobile = mode === "mobile-3d";
  const sceneRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!sceneRef.current || isMobile) return;
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      pointer.x * 0.18,
      0.04,
    );
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      pointer.y * 0.08,
      0.04,
    );
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 4, 4]} intensity={1.1} color={BRAND_BLUE} />
      <pointLight position={[-2, 1, 3]} intensity={0.5} color={BRAND_PURPLE} />

      {!isMobile && (
        <Stars
          radius={6}
          depth={4}
          count={350}
          factor={2}
          saturation={0}
          fade
          speed={0.4}
        />
      )}

      <group ref={sceneRef} position={[0.2, 0, 0]}>
        {!isMobile && <OrbitLines />}
        <GlowPortal />
        <Laptop simplified={isMobile} />

        {!isMobile && (
          <>
            <TechTile position={[1.65, 1.35, 0.4]}>
              <SiReact />
            </TechTile>
            <TechTile position={[2.05, 0.15, 0.8]}>
              <SiTailwindcss />
            </TechTile>
            <TechTile position={[-1.55, 0.95, 0.5]}>
              <SiNextdotjs />
            </TechTile>
          </>
        )}
      </group>
    </>
  );
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <HeroGradientBlob />;
    }
    return this.props.children;
  }
}

interface Canvas3DProps {
  mode: SceneMode;
}

export function Canvas3D({ mode }: Canvas3DProps) {
  const isMobile = mode === "mobile-3d";

  return (
    <CanvasErrorBoundary>
      <div
        className={`absolute inset-0 pointer-events-none ${
          isMobile ? "opacity-45" : "opacity-100"
        }`}
      >
        <Canvas
          camera={{ position: [0, 0.35, 5.2], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop="always"
          shadows={false}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: isMobile ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: "transparent" }}
          className="!absolute inset-0"
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
            });
          }}
        >
          <Suspense fallback={null}>
            <HeroScene mode={mode} />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
