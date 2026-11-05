import { ba, aY as X, S, bc, V, a } from "./DZyj3ghP.js";

const vs = `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fsShader = `
precision highp float;
varying vec2 vUv;
uniform vec4 u_clip;
uniform vec2 u_res;
uniform float u_time;
uniform float u_amp;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float getGlyph(vec2 p, float seed) {
  if (p.x < 0.14 || p.x > 0.86 || p.y < 0.12 || p.y > 0.88) return 0.0;
  vec2 gp = (p - vec2(0.14, 0.12)) / vec2(0.72, 0.76);
  vec2 cell = floor(gp * vec2(4.0, 5.0));
  
  float h = hash12(cell * 7.19 + vec2(seed * 43.17, seed * 19.33));
  float symCellX = min(cell.x, 3.0 - cell.x);
  float hSym = hash12(vec2(symCellX, cell.y) * 11.23 + seed * 31.7);
  return step(0.44, mix(h, hSym, 0.4));
}

vec3 matrixStream(vec2 uv, float numCols, float speedScale, float time, float density) {
  vec2 st = vec2(uv.x * numCols, uv.y * (numCols * 0.65));
  vec2 cell = floor(st);
  vec2 f = fract(st);

  float colId = cell.x;
  float rowId = cell.y;

  float colRnd = hash12(vec2(colId, 47.19));
  if (colRnd > density) return vec3(0.0);

  // Slower, smooth and calming rain velocity
  float speed = (0.45 + colRnd * 0.45) * speedScale;
  float dropPos = fract(colRnd * 23.45 - time * speed * 0.08);
  
  float relY = dropPos - uv.y;
  if (relY < 0.0) relY += 1.0;

  float trailLen = 0.35 + colRnd * 0.45;
  if (relY > trailLen) return vec3(0.0);

  // Calm, steady character glyph cycling
  float charTime = floor(time * (4.5 + colRnd * 3.5));
  float charSeed = hash12(vec2(colId * 23.7 + rowId * 9.13, charTime * 0.11));

  float g = getGlyph(f, charSeed);
  if (g < 0.5) return vec3(0.0);

  float trail = pow(1.0 - relY / trailLen, 1.6);
  float isHead = smoothstep(0.025, 0.0, relY);

  // FULLY PURE GREEN — NO WHITE AT ALL (keeps white text 100% legible)
  vec3 headCol = vec3(0.08, 0.78, 0.22); // Pure bright terminal green (never white)
  vec3 midCol  = vec3(0.02, 0.48, 0.12); // Medium matrix phosphor green
  vec3 tailCol = vec3(0.003, 0.18, 0.04); // Deep muted shadow green

  vec3 col = mix(tailCol, midCol, smoothstep(0.0, 0.6, trail));
  col = mix(col, headCol, isHead * 0.85);

  // Soft, subdued brightness so white info text pops out in foreground
  return col * (trail * 0.45 + isHead * 0.28);
}

void main() {
  vec2 suv = gl_FragCoord.xy / u_res;
  
  vec2 q = vec2(suv.x - u_clip.x, (suv.y - u_clip.y) / u_clip.w);
  float ang = atan(q.y, q.x);
  float lob = sin(ang * 3.0 + u_time * 0.7) * 0.6 + sin(ang * 5.0 - u_time * 0.45) * 0.4;
  float maxR = u_clip.z + lob * u_amp;
  float dist = length(q);
  if (dist > maxR) discard;

  float edgeFade = smoothstep(maxR, maxR - 0.015, dist);

  vec2 uv = suv;
  float aspect = u_res.x / u_res.y;
  uv.x *= aspect;

  // Deep inky black backdrop
  vec3 finalColor = vec3(0.001, 0.003, 0.0015);
  
  // Layer 1: Primary gentle green stream (64 columns)
  finalColor += matrixStream(uv, 64.0, 0.8, u_time, 0.90);
  
  // Layer 2: Deeper soft ambient stream (92 columns)
  finalColor += matrixStream(uv + vec2(0.37, 0.19), 92.0, 1.0, u_time, 0.75) * 0.35;

  // Center vignette:
  // Center is dimmed down to ~35% brightness so white typography stands out cleanly
  float normDist = dist / maxR;
  float textSafety = mix(0.35, 0.75, smoothstep(0.2, 0.8, normDist));
  finalColor *= textSafety;

  // Soft CRT scanline
  float scanline = 0.97 + 0.03 * sin(gl_FragCoord.y * 1.5);
  finalColor *= scanline;

  gl_FragColor = vec4(finalColor * edgeFade, edgeFade);
}
`;

class J {
  constructor(core) {
    this.core = core;
    this.mesh = null;
    this.live = false;
    this.ready = null;
    this.uClip = { value: new V(0.5, 0.5, 0, 1) };
    this.uRes = { value: new a(1, 1) };
    this.uTime = { value: 0 };
    this.uAmp = { value: 0 };
  }

  ensure() {
    if (this.ready) return this.ready;

    const geo = new ba();
    geo.setAttribute('position', new X(new Float32Array([
      -1, -1, 0,
       3, -1, 0,
      -1,  3, 0
    ]), 3));

    const mat = new S({
      vertexShader: vs,
      fragmentShader: fsShader,
      uniforms: {
        u_clip: this.uClip,
        u_res: this.uRes,
        u_time: this.uTime,
        u_amp: this.uAmp
      },
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    this.mesh = new bc(geo, mat);
    this.mesh.renderOrder = -100;
    this.mesh.frustumCulled = false;

    this.ready = Promise.resolve();
    return this.ready;
  }

  tick(dt, holeP) {
    if (holeP < 0.01) {
      if (this.live) {
        this.live = false;
        if (this.mesh) this.core.over.remove(this.mesh);
      }
      return;
    }

    this.ensure();
    if (!this.mesh) return;

    if (!this.live) {
      this.live = true;
      this.core.over.add(this.mesh);
      this.mesh.renderOrder = -100;
      const idx = this.core.over.children.indexOf(this.mesh);
      if (idx > 0) {
        this.core.over.children.splice(idx, 1);
        this.core.over.children.unshift(this.mesh);
      }
    }

    const post = this.core.post.u;
    const cx = post.u_center.value.x;
    const cy = post.u_center.value.y;
    const n = Math.min(1, Math.max(0, holeP));
    const radius = post.u_radius.value * n;
    const aspect = post.u_aspect.value.x;
    const t = post.u_time.value;
    const breath = radius * (1 + post.u_breath.value * Math.sin(t * 1.6));

    this.uClip.value.set(cx, cy, breath * 0.99, aspect);
    this.uTime.value = t;
    this.uAmp.value = post.u_wave.value * Math.sin(Math.PI * n);
    this.core.renderer.getDrawingBufferSize(this.uRes.value);
  }

  dispose() {
    if (this.mesh) {
      this.core.over.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.mesh = null;
    }
  }
}

export { J as Rain };
