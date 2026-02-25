"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type DataSceneProps = {
	onReady?: () => void;
};

/* ── deterministic pseudo-random ─────────────────────── */
const fract = (v: number) => {
	const x = Math.sin(v * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};

/* ── geometry ─────────────────────────────────────────── */
const NODE_COUNT = 60;
const EDGE_COUNT = 80;

type Vec3 = [number, number, number];

function buildGraph() {
	const nodes: Vec3[] = Array.from({ length: NODE_COUNT }, (_, i) => [
		(fract(i * 3.1 + 0.5) - 0.5) * 14,
		(fract(i * 5.7 + 1.3) - 0.5) * 8,
		(fract(i * 7.3 + 2.9) - 0.5) * 6,
	]);

	const edges: [Vec3, Vec3][] = Array.from({ length: EDGE_COUNT }, (_, i) => {
		const a = Math.floor(fract(i * 11.3 + 4.1) * NODE_COUNT);
		const b = Math.floor(fract(i * 17.9 + 8.7) * NODE_COUNT);
		return [nodes[a]!, nodes[b]!];
	});

	return { nodes, edges };
}

/* ── edge material (glowing lines) ───────────────────── */
function Edges({ edges }: { edges: [Vec3, Vec3][] }) {
	const ref = useRef<THREE.LineSegments>(null);

	const { positions, colors } = useMemo(() => {
		const pos: number[] = [];
		const col: number[] = [];
		edges.forEach(([a, b], i) => {
			pos.push(...a, ...b);
			const t = fract(i * 3.7);
			if (t < 0.5) {
				// emerald
				col.push(0.0, 0.82, 0.52, 0.0, 0.82, 0.52);
			} else {
				// blue
				col.push(0.18, 0.66, 1.0, 0.18, 0.66, 1.0);
			}
		});
		return {
			positions: new Float32Array(pos),
			colors: new Float32Array(col),
		};
	}, [edges]);

	useFrame((state) => {
		if (!ref.current) return;
		const mat = ref.current.material as THREE.LineBasicMaterial;
		mat.opacity = 0.18 + Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
	});

	return (
		<lineSegments ref={ref}>
			<bufferGeometry>
				<bufferAttribute
					args={[positions, 3]}
					attach="attributes-position"
				/>
				<bufferAttribute args={[colors, 3]} attach="attributes-color" />
			</bufferGeometry>
			<lineBasicMaterial vertexColors transparent opacity={0.22} />
		</lineSegments>
	);
}

/* ── node spheres ─────────────────────────────────────── */
function Nodes({ nodes }: { nodes: Vec3[] }) {
	const meshRef = useRef<THREE.InstancedMesh>(null);

	useEffect(() => {
		const mesh = meshRef.current;
		if (!mesh) return;
		const m = new THREE.Matrix4();
		nodes.forEach((pos, i) => {
			const scale = 0.04 + fract(i * 9.1) * 0.07;
			m.makeScale(scale, scale, scale);
			m.setPosition(...pos);
			mesh.setMatrixAt(i, m);
		});
		mesh.instanceMatrix.needsUpdate = true;
	}, [nodes]);

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
			<sphereGeometry args={[1, 8, 8]} />
			<meshBasicMaterial color="#c6f5ff" transparent opacity={0.75} />
		</instancedMesh>
	);
}

/* ── root scene ──────────────────────────────────────── */
function Scene({ onReady }: DataSceneProps) {
	const groupRef = useRef<THREE.Group>(null);
	const mouse = useRef({ x: 0, y: 0 });
	const { nodes, edges } = useMemo(() => buildGraph(), []);

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
		};
		window.addEventListener("mousemove", onMove);
		const t = window.setTimeout(() => onReady?.(), 600);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.clearTimeout(t);
		};
	}, [onReady]);

	useFrame((state) => {
		const g = groupRef.current;
		if (!g) return;

		// slow auto-rotation + mouse tilt
		const t = state.clock.elapsedTime;
		g.rotation.y = THREE.MathUtils.lerp(
			g.rotation.y,
			mouse.current.x * 0.22 + t * 0.04,
			0.025,
		);
		g.rotation.x = THREE.MathUtils.lerp(
			g.rotation.x,
			mouse.current.y * 0.1,
			0.025,
		);
	});

	return (
		<group ref={groupRef}>
			<Edges edges={edges} />
			<Nodes nodes={nodes} />
		</group>
	);
}

/* ── exported component ─────────────────────────────── */
export default function DataScene({ onReady }: DataSceneProps) {
	return (
		<Canvas
			gl={{ antialias: true, alpha: false }}
			camera={{ position: [0, 0, 11], fov: 55, near: 0.1, far: 100 }}
			style={{ background: "transparent" }}
		>
			<color attach="background" args={["#03050a"]} />
			{/* soft fill lights */}
			<ambientLight intensity={0.3} />
			<pointLight
				position={[5, 5, 8]}
				intensity={6}
				color="#00d084"
				distance={30}
				decay={2}
			/>
			<pointLight
				position={[-8, -4, -4]}
				intensity={5}
				color="#2ea8ff"
				distance={30}
				decay={2}
			/>
			<pointLight
				position={[0, 8, 0]}
				intensity={2}
				color="#9b7dff"
				distance={20}
				decay={2}
			/>
			<Scene onReady={onReady} />
		</Canvas>
	);
}
