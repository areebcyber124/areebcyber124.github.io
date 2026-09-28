import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CyberCanvasProps {
  activeSection: string;
  scrollProgress: number;
  performanceTier?: 'high' | 'balanced' | 'low';
  interactiveOrbit?: boolean;
}

export const CyberCanvas: React.FC<CyberCanvasProps> = ({
  activeSection,
  scrollProgress,
  performanceTier = 'high',
  interactiveOrbit = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, lastX: 0, lastY: 0, rotX: 0, rotY: 0 });
  const scrollRef = useRef(scrollProgress);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.028);

    // CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: performanceTier === 'high',
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    const pixelRatio = performanceTier === 'low' ? 1 : Math.min(window.devicePixelRatio || 1, performanceTier === 'balanced' ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x04060a, 1);
    container.appendChild(renderer.domElement);

    // Context loss safety
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x06b6d4, 3.5); // Cyan key
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.5); // Emerald rim
    rimLight.position.set(-10, -10, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 4, 30);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // OBJECT 1: CYBER GRID FLOOR
    const gridHelper = new THREE.GridHelper(80, 50, 0x06b6d4, 0x0d2137);
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // OBJECT 2: CENTRAL HOLOGRAPHIC SHIELD / CORE
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x083344,
      roughness: 0.2,
      metalness: 0.9,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner crystalline core
    const innerGeo = new THREE.OctahedronGeometry(1.8, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x064e3b,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Surrounding orbital rings
    const ringGeo1 = new THREE.TorusGeometry(4.4, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(4.9, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // OBJECT 3: FLOATING DATA PARTICLES
    const particleCount = performanceTier === 'low' ? 350 : performanceTier === 'balanced' ? 800 : 1500;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cyanColor = new THREE.Color(0x06b6d4);
    const emeraldColor = new THREE.Color(0x10b981);
    const slateColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixed = Math.random() > 0.5 ? cyanColor : Math.random() > 0.5 ? emeraldColor : slateColor;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Custom circle texture for soft round particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(6,182,212,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // OBJECT 4: 3D NETWORK NODES & LASER LINKS
    const nodeCount = performanceTier === 'low' ? 18 : 36;
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 25
      );
      nodePositions.push(pos);
      const sphere = new THREE.Mesh(nodeGeo, nodeMat);
      sphere.position.copy(pos);
      nodeGroup.add(sphere);
      nodeSpheres.push(sphere);
    }

    // Dynamic line connections between close nodes
    const maxDistance = 9;
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    nodeGroup.add(networkLines);

    // MOUSE & TOUCH EVENT LISTENERS
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (mouseRef.current.isDragging && interactiveOrbit) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        mouseRef.current.rotY += deltaX * 0.005;
        mouseRef.current.rotX += deltaY * 0.005;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.targetY = (touch.clientY / window.innerHeight - 0.5) * 2;

        if (interactiveOrbit) {
          const deltaX = touch.clientX - mouseRef.current.lastX;
          const deltaY = touch.clientY - mouseRef.current.lastY;
          mouseRef.current.rotY += deltaX * 0.005;
          mouseRef.current.rotX += deltaY * 0.005;
          mouseRef.current.lastX = touch.clientX;
          mouseRef.current.lastY = touch.clientY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.isDragging = true;
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // CAMERA POSITION BY SECTION TARGETS
    const sectionTargets: Record<string, { pos: THREE.Vector3; lookAt: THREE.Vector3; coreScale: number; gridY: number }> = {
      home: { pos: new THREE.Vector3(0, 0.5, 17), lookAt: new THREE.Vector3(0, 0, 0), coreScale: 1, gridY: -6 },
      about: { pos: new THREE.Vector3(-5, 2.5, 14), lookAt: new THREE.Vector3(1, 0, 0), coreScale: 0.9, gridY: -5 },
      cybersecurity: { pos: new THREE.Vector3(0, -3.2, 11), lookAt: new THREE.Vector3(0, 0, 0), coreScale: 1.25, gridY: -7 },
      cpp: { pos: new THREE.Vector3(6, 2, 13), lookAt: new THREE.Vector3(-1, 0, 0), coreScale: 0.85, gridY: -5.5 },
      python: { pos: new THREE.Vector3(-6, -2, 12), lookAt: new THREE.Vector3(1, 0, 0), coreScale: 1.1, gridY: -6.5 },
      ailab: { pos: new THREE.Vector3(0, 3, 9), lookAt: new THREE.Vector3(0, 1, 0), coreScale: 1.4, gridY: -5 },
      projects: { pos: new THREE.Vector3(7, -1.5, 15), lookAt: new THREE.Vector3(-1, 0, 0), coreScale: 0.9, gridY: -6 },
      knowledge: { pos: new THREE.Vector3(-5, 4, 14), lookAt: new THREE.Vector3(1, 0, 0), coreScale: 0.8, gridY: -5 },
      contact: { pos: new THREE.Vector3(0, 5, 18), lookAt: new THREE.Vector3(0, 0, 0), coreScale: 1.1, gridY: -7 },
    };

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const currentCameraPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Section camera interpolation
      const target = sectionTargets[activeSection] || sectionTargets.home;
      
      // Add subtle parallax to target position
      const parallaxX = mouseRef.current.x * 1.5;
      const parallaxY = -mouseRef.current.y * 1.2;

      const destPos = new THREE.Vector3(
        target.pos.x + parallaxX,
        target.pos.y + parallaxY,
        target.pos.z
      );

      currentCameraPos.lerp(destPos, 0.04);
      camera.position.copy(currentCameraPos);

      // Handle user orbit rotation if dragging
      if (interactiveOrbit && (mouseRef.current.rotX !== 0 || mouseRef.current.rotY !== 0)) {
        coreGroup.rotation.y = mouseRef.current.rotY + elapsed * 0.15;
        coreGroup.rotation.x = mouseRef.current.rotX;
      } else {
        // Continuous organic rotation
        coreGroup.rotation.y = elapsed * 0.2 + mouseRef.current.x * 0.4;
        coreGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.2 - mouseRef.current.y * 0.2;
      }

      currentLookAt.lerp(target.lookAt, 0.04);
      camera.lookAt(currentLookAt);

      // Core scale animation
      const targetScale = target.coreScale * (1 + Math.sin(elapsed * 1.8) * 0.03);
      coreGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

      // Individual mesh spins
      icoMesh.rotation.y = elapsed * 0.25;
      icoMesh.rotation.z = Math.cos(elapsed * 0.2) * 0.2;
      innerMesh.rotation.y = -elapsed * 0.4;
      innerMesh.rotation.x = elapsed * 0.3;
      ring1.rotation.z = elapsed * 0.35;
      ring2.rotation.z = -elapsed * 0.25;

      // Dynamic purple shift as user scrolls down
      const sp = Math.min(1, Math.max(0, scrollRef.current));
      const cyanBase = new THREE.Color(0x06b6d4);
      const purpleKey = new THREE.Color(0xc084fc);
      const emeraldBase = new THREE.Color(0x10b981);
      const magentaRim = new THREE.Color(0xec4899);
      const skyBase = new THREE.Color(0x38bdf8);
      const violetPoint = new THREE.Color(0xa855f7);

      keyLight.color.copy(cyanBase).lerp(purpleKey, sp);
      rimLight.color.copy(emeraldBase).lerp(magentaRim, sp);
      pointLight.color.copy(skyBase).lerp(violetPoint, sp);

      icoMat.color.copy(cyanBase).lerp(purpleKey, sp);
      icoMat.emissive.copy(new THREE.Color(0x083344)).lerp(new THREE.Color(0x581c87), sp);

      innerMat.color.copy(emeraldBase).lerp(new THREE.Color(0xd946ef), sp);
      innerMat.emissive.copy(new THREE.Color(0x064e3b)).lerp(new THREE.Color(0x701a75), sp);

      ringMat1.color.copy(skyBase).lerp(new THREE.Color(0xe879f9), sp);
      ringMat2.color.copy(new THREE.Color(0x34d399)).lerp(new THREE.Color(0xa855f7), sp);
      lineMat.color.copy(cyanBase).lerp(purpleKey, sp);

      // Pulse point light intensity
      pointLight.intensity = 3 + Math.sin(elapsed * 2.5) * 1.2 + sp * 1.5;

      // Move grid continuously forward for flight illusion
      gridHelper.position.z = (elapsed * 1.5) % 1.6;
      gridHelper.position.y += (target.gridY - gridHelper.position.y) * 0.03;

      // Floating particles slow drift
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.012; // slow upward drift
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Node constellation subtle oscillation
      nodeGroup.rotation.y = elapsed * 0.04;
      nodeGroup.position.y = Math.sin(elapsed * 0.3) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      // Dispose Three.js objects
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [performanceTier, interactiveOrbit, activeSection]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {contextLost ? (
        <div className="absolute inset-0 bg-[#04060a] flex items-center justify-center text-slate-500 text-sm">
          WebGL context recovering...
        </div>
      ) : (
        <div ref={containerRef} className="w-full h-full" style={{ pointerEvents: interactiveOrbit ? 'auto' : 'none' }} />
      )}
      {/* Cinematic subtle vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#04060a_95%)] pointer-events-none" />
      <div className="scanline absolute inset-0 opacity-15 pointer-events-none" />
    </div>
  );
};
