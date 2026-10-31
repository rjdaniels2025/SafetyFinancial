import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * Soft white smoke drifting over a dark section, drawn live with WebGL.
 *
 * The field is rendered at a fraction of the screen resolution (smoke is soft, so nothing is lost) and only
 * while it is on screen. It parts around the pointer, and can finish in a cloud bank that blends into the
 * section below and rises as the visitor scrolls away. With reduced motion a single still frame is drawn.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uPointer;   // xy: position (0-1, y up), z: strength
uniform float uExit;     // 0-1 as the section scrolls away
uniform float uIntensity;
uniform float uBias;     // 1 keeps the left-hand text column clearer
uniform vec4 uBank;      // rgb: colour of the section below, a: 1 to draw the cloud bank
uniform float uBankRest; // resting height of the bank as a fraction of the section

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.15;
  float t = uTime;

  // The pointer pushes the smoke aside and thins it slightly
  vec2 m = vec2(uPointer.x * aspect, uPointer.y) * 1.15;
  vec2 d = p - m;
  float near = exp(-dot(d, d) * 9.0) * uPointer.z;
  p -= d * near * 0.55;

  // Domain-warped noise gives slow, curling wisps
  vec2 wind = vec2(-t * 0.022, t * 0.007);
  vec2 q = vec2(fbm(p * 1.25 + wind), fbm(p * 1.25 + vec2(5.2, 1.3) + wind * 1.3));
  vec2 r = vec2(fbm(p * 1.6 + 3.0 * q + vec2(1.7, 9.2) + t * 0.019), fbm(p * 1.6 + 3.0 * q + vec2(8.3, 2.8) - t * 0.015));
  float f = fbm(p * 1.35 + 2.3 * r + wind * 0.6);

  float dens = pow(smoothstep(0.36, 0.95, f), 1.35);
  // Lit from above: crests catch the light, hollows stay a cool silver-green
  vec3 col = mix(vec3(0.62, 0.71, 0.67), vec3(1.0), clamp(f * f * 2.4 + r.y * 0.25, 0.0, 1.0));

  // Composition: denser towards the right and the edges, lighter behind the text
  float side = mix(1.0, 0.28 + 0.72 * smoothstep(0.2, 0.9, uv.x), uBias);
  float edges = 0.55 + 0.45 * max(smoothstep(0.5, 0.05, uv.y), smoothstep(0.55, 1.0, uv.y));
  float alpha = dens * side * edges * uIntensity * (1.0 + uExit * 2.2) * (1.0 - near * 0.45);
  alpha = clamp(alpha, 0.0, 0.92);

  // Cloud bank: billowing tops that rise with scrolling and meet the next section in its exact colour
  float bank = 0.0;
  if (uBank.a > 0.5) {
    float line = mix(uBankRest, 1.1, uExit) + (fbm(vec2(p.x * 2.4 - t * 0.035, t * 0.02)) - 0.5) * 0.2;
    bank = smoothstep(line, line - 0.16, uv.y + (f - 0.5) * 0.1);
    bank = max(bank, smoothstep(0.04, 0.0, uv.y));
  }
  float a = max(alpha, bank);
  vec3 bankCol = mix(col, uBank.rgb, smoothstep(0.15, 0.85, bank));
  vec3 c = mix(col, bankCol, bank / max(a, 0.001));
  gl_FragColor = vec4(c * a, a);
}
`;

interface SmokeFieldProps {
  /** Overall smoke opacity, 0–1. */
  intensity?: number;
  /** Keep the left-hand text column clearer (for heroes with text on the left). */
  biasRight?: boolean;
  /** Hex colour of the section below; draws a cloud bank that blends into it. */
  bank?: string;
  /** Resting height of the cloud bank in pixels. */
  bankRest?: number;
  /** 0–1 scroll progress as the section leaves the screen, from useScrollExit. */
  exit?: MutableRefObject<number>;
  className?: string;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as const;
};

export default function SmokeField({ intensity = 0.5, biasRight = false, bank, bankRest = 80, exit, className = '' }: SmokeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return; // No WebGL: the CSS backdrop underneath still carries the scene

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u('uRes'), uTime = u('uTime'), uPointer = u('uPointer'), uExit = u('uExit');
    const uBankRest = u('uBankRest');
    gl.uniform1f(u('uIntensity'), intensity);
    const uBias = u('uBias');
    const [br, bg, bb] = bank ? hexToRgb(bank) : [0, 0, 0];
    gl.uniform4f(u('uBank'), br, bg, bb, bank ? 1 : 0);

    const still = !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    // Smoke is soft, so a reduced resolution is indistinguishable and far cheaper
    let scale = coarse ? 0.42 : 0.5;
    const MAX_PIXELS = 420_000;
    const frameGap = coarse ? 1000 / 30 : 0;
    const seed = Math.random() * 40;
    const start = performance.now();
    const pointer = { x: 0.7, y: 0.6, z: 0, tx: 0.7, ty: 0.6, tz: 0 };
    let visible = true;
    let frame = 0;
    let last = 0;
    // Adaptive quality: if frames come in slowly, drop the resolution (at most twice)
    let sampled = 0;
    let sampleStart = 0;
    let downgrades = 0;

    const draw = (now: number) => {
      const time = still ? seed + 12 : seed + (now - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.z += (pointer.tz - pointer.z) * 0.04;
      gl.uniform1f(uTime, time % 2000);
      gl.uniform3f(uPointer, pointer.x, pointer.y, pointer.z);
      gl.uniform1f(uExit, still ? 0 : exit?.current ?? 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < frameGap) return;
      // A long gap means the tab was in the background or scrolled away; restart the measurement
      if (now - last > 250) sampled = 0;
      last = now;
      draw(now);
      if (downgrades < 2) {
        if (sampled === 0) sampleStart = now;
        if (++sampled === 40) {
          const average = (now - sampleStart) / 39;
          if (average > Math.max(frameGap, 16.7) * 1.7) {
            scale *= 0.6;
            downgrades += 1;
            resize();
          }
          sampled = 0;
        }
      }
    };

    function resize() {
      const fit = Math.min(scale, Math.sqrt(MAX_PIXELS / Math.max(1, canvas.clientWidth * canvas.clientHeight)));
      const w = Math.max(1, Math.round(canvas.clientWidth * fit));
      const h = Math.max(1, Math.round(canvas.clientHeight * fit));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // On narrow screens the text spans the full width, so the smoke is spread more evenly
      gl.uniform1f(uBias, biasRight ? (canvas.clientWidth >= 1024 ? 1 : 0.45) : 0);
      gl.uniform1f(uBankRest, Math.min(0.45, bankRest / Math.max(1, canvas.clientHeight)));
      if (still) draw(performance.now());
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    // Track the pointer over the section that holds the smoke
    const host = canvas.parentElement?.parentElement ?? canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (e.clientY - rect.top) / rect.height;
      pointer.tz = 1;
    };
    const onLeave = () => (pointer.tz = 0);
    if (!still && host) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    if (!still) frame = requestAnimationFrame(loop);
    canvas.style.opacity = '1';

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host?.removeEventListener('pointermove', onMove);
      host?.removeEventListener('pointerleave', onLeave);
      gl.deleteProgram(program);
    };
  }, [intensity, biasRight, bank, bankRest, exit]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
