/**
 * GLSL-код «шейдерпака»: освещение (небо, факелы, солнце с тенями),
 * колыхание листвы и травы, вода с отражением неба, туман цвета неба.
 * Всё считается в линейном HDR-пространстве; тонмаппинг — в финальном проходе.
 */

export const COMMON_UNIFORMS = /* glsl */ `
uniform float uTime;
uniform vec3 uCameraPos;
uniform vec3 uSunDir;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uAmbient;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunGlow;
uniform vec3 uBlockLight;
uniform float uFogNear;
uniform float uFogFar;
uniform float uUnderwater;
uniform vec3 uWaterFog;
uniform float uRain;
`;

export const SKY_FUNCTIONS = /* glsl */ `
vec3 skyColor(vec3 dir) {
  float y = dir.y;
  vec3 col = mix(uHorizon, uZenith, pow(clamp(y, 0.0, 1.0), 0.5));
  col = mix(col, uHorizon * 0.55, clamp(-y * 2.5, 0.0, 1.0));
  float s = max(dot(dir, uSunDir), 0.0);
  float horizonBoost = clamp(1.0 - y * 1.5, 0.25, 1.0);
  col += uSunGlow * (pow(s, 5.0) * 0.55 + pow(s, 40.0) * 1.1) * horizonBoost;
  return col;
}

/** Кривая яркости уровней света как в Minecraft (0..1 -> 0..1). */
float lightCurve(float l) {
  return l / (3.0 - 2.0 * l);
}

vec3 applyFog(vec3 col, vec3 world) {
  vec3 v = world - uCameraPos;
  float dist = length(v);
  if (uUnderwater > 0.5) {
    float f = 1.0 - exp(-dist * 0.085);
    return mix(col, uWaterFog, f);
  }
  float f = smoothstep(uFogNear, uFogFar, dist);
  f = max(f, uRain * 0.35 * smoothstep(0.0, uFogFar, dist));
  // Большая часть экрана ближе тумана — цвет неба там не нужен.
  if (f <= 0.0) return col;
  return mix(col, skyColor(v / max(dist, 1e-4)), f);
}
`;

export const SHADOW_FUNCTIONS = /* glsl */ `
#ifdef USE_SHADOWS
uniform highp sampler2DShadow uShadowMap;
uniform mat4 uShadowMatrix;
uniform float uShadowTexel;
const vec2 POISSON[16] = vec2[16](
  vec2(-0.94201624, -0.39906216), vec2(0.94558609, -0.76890725), vec2(-0.09418410, -0.92938870), vec2(0.34495938, 0.29387760),
  vec2(-0.91588581, 0.45771432), vec2(-0.81544232, -0.87912464), vec2(-0.38277543, 0.27676845), vec2(0.97484398, 0.75648379),
  vec2(0.44323325, -0.97511554), vec2(0.53742981, -0.47373420), vec2(-0.26496911, -0.41893023), vec2(0.79197514, 0.19090188),
  vec2(-0.24188840, 0.99706507), vec2(-0.81409955, 0.91437590), vec2(0.19984126, 0.78641367), vec2(0.14383161, -0.14100790)
);
float shadowFactor(vec3 world, vec3 normal, float ndl) {
  vec3 p = world + normal * 0.045 + uLightDir * 0.02;
  vec4 sc = uShadowMatrix * vec4(p, 1.0);
  vec3 c = sc.xyz * 0.5 + 0.5;
  if (c.x <= 0.0 || c.x >= 1.0 || c.y <= 0.0 || c.y >= 1.0 || c.z >= 1.0) return 1.0;
  float ref = c.z - (0.00025 + 0.0006 * (1.0 - ndl));
  // Сравнение глубины делает видеокарта и сразу сглаживает его по четырём текселям.
  float sum = 0.0;
  for (int i = 0; i < SHADOW_TAPS; i++) sum += texture(uShadowMap, vec3(c.xy + POISSON[i] * uShadowTexel * 1.6, ref));
  float s = sum / float(SHADOW_TAPS);
  vec2 e = abs(c.xy - 0.5) * 2.0;
  return mix(s, 1.0, smoothstep(0.82, 0.98, max(e.x, e.y)));
}
#else
float shadowFactor(vec3 world, vec3 normal, float ndl) { return 1.0; }
#endif
`;

export const WAVE_FUNCTIONS = /* glsl */ `
vec3 leafWave(vec3 p) {
  float t = uTime * (1.0 + uRain);
  float a = sin(t * 1.6 + p.x * 0.8 + p.z * 0.4);
  float b = sin(t * 2.2 + p.z * 0.9 - p.y * 0.5);
  return vec3(a, 0.5 * b, b) * (0.035 + 0.03 * uRain);
}
vec2 plantWave(vec3 p) {
  float t = uTime * (1.0 + uRain);
  return vec2(sin(t * 1.9 + p.x * 0.7 + p.z * 0.3), sin(t * 2.5 + p.z * 0.8 + p.x * 0.2)) * (0.07 + 0.05 * uRain);
}
float waterWave(vec3 p) {
  return (sin(uTime * 1.3 + p.x * 0.9 + p.z * 0.4) + sin(uTime * 1.7 - p.z * 1.1 + p.x * 0.3)) * 0.022 - 0.03;
}
`;

/** Общая часть вершинного шейдера блоков (основной проход и проход теней). */
export const TERRAIN_VERTEX_CORE = /* glsl */ `
in vec4 aPos;
in vec4 aData;

const vec3 NORMALS[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);

struct Decoded {
  vec4 world;
  vec3 uv;
  int face;
  int ao;
  int glow;
  int anim;
  int notWater;
};

Decoded decode() {
  Decoded d;
  int w = int(aPos.w + 0.5);
  int ub = int(aData.x + 0.5);
  int vb = int(aData.y + 0.5);
  d.face = (w >> 8) & 7;
  d.ao = (w >> 11) & 3;
  d.glow = (w >> 13) & 1;
  d.anim = (ub >> 7) & 1;
  d.notWater = (vb >> 5) & 1;
  d.uv = vec3(float(ub & 31) / 16.0, float(vb & 31) / 16.0, float(w & 255));
  d.world = modelMatrix * vec4(aPos.xyz / 16.0, 1.0);
#ifdef WAVING
  int wave = (ub >> 5) & 3;
  if (wave == 1) d.world.xyz += leafWave(d.world.xyz);
  else if (wave == 2) d.world.xz += plantWave(d.world.xyz);
  else if (wave == 3) d.world.y += waterWave(d.world.xyz);
#endif
  return d;
}
`;

export const TERRAIN_VERTEX = /* glsl */ `
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${COMMON_UNIFORMS}
${WAVE_FUNCTIONS}
${TERRAIN_VERTEX_CORE}

out vec3 vUv;
out vec3 vWorld;
out vec2 vLight;
out float vAO;
flat out int vFace;
flat out int vGlow;
flat out int vAnim;
flat out int vNotWater;

#ifdef ENTITY
uniform vec2 uEntityLight;
#endif

const float AO_LEVELS[4] = float[4](0.42, 0.62, 0.8, 1.0);

void main() {
  Decoded d = decode();
  vUv = d.uv;
  vWorld = d.world.xyz;
#ifdef ENTITY
  vLight = uEntityLight;
#else
  vLight = aData.zw / 255.0;
#endif
  vAO = AO_LEVELS[d.ao];
  vFace = d.face;
  vGlow = d.glow;
  vAnim = d.anim;
  vNotWater = d.notWater;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`;

const SAMPLE_ATLAS = /* glsl */ `
vec4 sampleAtlas(vec3 uvl, int anim, int face) {
  if (anim == 0) return texture(uAtlas, uvl);
  // Текущая жидкость: текстура течёт вниз по боковым граням и слегка дрожит сверху.
  vec2 uv = uvl.xy;
  if (face == 2) uv += vec2(sin(uTime * 0.6 + vWorld.z * 0.5), cos(uTime * 0.5 + vWorld.x * 0.5)) * 0.06 + uTime * vec2(0.02, 0.015);
  else uv.y -= uTime * 0.35;
  vec2 dx = dFdx(uvl.xy);
  vec2 dy = dFdy(uvl.xy);
  return textureGrad(uAtlas, vec3(fract(uv), uvl.z), dx, dy);
}
`;

export const TERRAIN_FRAGMENT = /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${COMMON_UNIFORMS}
${SKY_FUNCTIONS}
${SHADOW_FUNCTIONS}

in vec3 vUv;
in vec3 vWorld;
in vec2 vLight;
in float vAO;
flat in int vFace;
flat in int vGlow;
flat in int vAnim;
flat in int vNotWater;

out vec4 outColor;

#ifdef ENTITY
uniform float uNoFog;
#endif

const vec3 NORMALS_F[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);
// Затенение граней в тени, как в оригинальной игре: верх светлее, низ темнее.
const float FACE_AMBIENT[7] = float[7](0.62, 0.62, 1.0, 0.5, 0.8, 0.8, 0.9);

${SAMPLE_ATLAS}

void main() {
  vec4 tex = sampleAtlas(vUv, vAnim, vFace);
#ifdef ALPHA_TEST
  if (tex.a < 0.5) discard;
#endif
  vec3 albedo = tex.rgb;
  vec3 n = NORMALS_F[vFace];

  float sky = vLight.x;
  float blk = vLight.y;
  float skyL = lightCurve(sky);
  float blkL = lightCurve(blk);

  float ndl = vFace == 6 ? 0.45 + 0.55 * max(uLightDir.y, 0.0) : max(dot(n, uLightDir), 0.0);
  float sunVis = smoothstep(0.6, 0.95, sky);
  float shadow = ndl > 0.0 && sunVis > 0.0 ? shadowFactor(vWorld, n, ndl) : 0.0;
#ifdef ENTITY
  if (uNoFog > 0.5) shadow = 1.0;
#endif
  vec3 direct = uLightColor * ndl * shadow * sunVis;
  vec3 ambient = uAmbient * skyL * FACE_AMBIENT[vFace];
  vec3 torch = uBlockLight * blkL * blkL * 1.35;
  vec3 lighting = (ambient + torch + vec3(0.006)) * vAO + direct * mix(0.75, 1.0, vAO);
  vec3 col = albedo * lighting;
  if (vGlow == 1) col = albedo * 1.9 + col * 0.2;
  // В дождь поверхности становятся темнее и чуть «мокрее».
  col *= 1.0 - uRain * 0.25 * skyL;
#ifdef ENTITY
  if (uNoFog > 0.5) {
    outColor = vec4(col, 1.0);
    return;
  }
#endif
  outColor = vec4(applyFog(col, vWorld), 1.0);
}
`;

export const WATER_FRAGMENT = /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${COMMON_UNIFORMS}
${SKY_FUNCTIONS}
${SHADOW_FUNCTIONS}

in vec3 vUv;
in vec3 vWorld;
in vec2 vLight;
in float vAO;
flat in int vFace;
flat in int vGlow;
flat in int vAnim;
flat in int vNotWater;

out vec4 outColor;

const vec3 NORMALS_F[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);

${SAMPLE_ATLAS}

vec3 waterNormal(vec2 p) {
  float t = uTime;
  vec2 g = vec2(0.0);
  vec2 k;
  k = vec2(0.9, 0.4);   g += k * cos(dot(k, p) + t * 1.2) * 0.05;
  k = vec2(-0.5, 1.1);  g += k * cos(dot(k, p) + t * 1.5) * 0.04;
  k = vec2(1.7, -1.3);  g += k * cos(dot(k, p) + t * 2.1) * 0.02;
  k = vec2(-2.6, -0.8); g += k * cos(dot(k, p) + t * 2.7) * 0.012;
  k = vec2(4.3, 3.1);   g += k * cos(dot(k, p) + t * 3.9) * 0.005;
  return normalize(vec3(-g.x, 1.0, -g.y));
}

void main() {
  vec4 tex = sampleAtlas(vUv, vAnim, vFace);
  vec3 n = NORMALS_F[vFace];
  bool water = vNotWater == 0;
  if (water && vFace == 2) n = waterNormal(vWorld.xz);
  vec3 toCam = uCameraPos - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / max(dist, 1e-4);
  if (dot(n, v) < 0.0) n = -n;

  float skyL = lightCurve(vLight.x);
  float blkL = lightCurve(vLight.y);
  float ndl = max(dot(n, uLightDir), 0.0);
  float sunVis = smoothstep(0.6, 0.95, vLight.x);
  float shadow = sunVis > 0.0 ? shadowFactor(vWorld, NORMALS_F[vFace], max(ndl, 0.3)) : 0.0;
  vec3 lighting = uAmbient * skyL + uBlockLight * blkL * blkL * 1.35 + uLightColor * ndl * 0.35 * shadow * sunVis + vec3(0.006);
  vec3 base = tex.rgb * lighting;
  vec3 col;
  float alpha;
  if (water) {
    float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
    vec3 refl = skyColor(reflect(-v, n)) * smoothstep(0.35, 0.9, vLight.x);
    vec3 h = normalize(uLightDir + v);
    float spec = pow(max(dot(n, h), 0.0), 260.0) * 7.0 * shadow * sunVis;
    col = mix(base, refl, clamp(fres * 0.9 + 0.08, 0.0, 1.0)) + uLightColor * spec;
    alpha = clamp(mix(0.62, 0.95, fres) * (0.6 + 0.4 * tex.a / 0.75), 0.4, 0.97);
    if (uUnderwater > 0.5) alpha = 0.55;
  } else {
    // Лёд: полупрозрачный с бликом.
    vec3 h = normalize(uLightDir + v);
    col = base + uLightColor * pow(max(dot(n, h), 0.0), 80.0) * shadow * sunVis * 0.6;
    alpha = tex.a;
  }
  outColor = vec4(applyFog(col, vWorld), alpha);
}
`;

/** Проход теней: те же вершины (с колыханием), только глубина; листва даёт дырявую тень. */
export const SHADOW_VERTEX = /* glsl */ `
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${COMMON_UNIFORMS}
${WAVE_FUNCTIONS}
${TERRAIN_VERTEX_CORE}
out vec3 vUv;
void main() {
  Decoded d = decode();
  vUv = d.uv;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`;

export const SHADOW_FRAGMENT = /* glsl */ `
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
in vec3 vUv;
out vec4 outColor;
void main() {
#ifdef ALPHA_TEST
  if (texture(uAtlas, vUv).a < 0.5) discard;
#endif
  outColor = vec4(1.0);
}
`;

/** Небесный купол: градиент, квадратные солнце и луна, звёзды. */
export const SKY_VERTEX = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;

export const SKY_FRAGMENT = /* glsl */ `
${COMMON_UNIFORMS}
uniform float uNight;
uniform vec3 uSunDisk;
uniform vec3 uMoonDisk;
varying vec3 vDir;
${SKY_FUNCTIONS}

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

/** Квадратный диск вокруг направления center (как солнце в Minecraft). */
float squareDisk(vec3 dir, vec3 center, float size, out vec2 local) {
  vec3 right = normalize(cross(center, vec3(0.0, 0.0, 1.0)));
  vec3 up = cross(right, center);
  float d = dot(dir, center);
  local = vec2(dot(dir, right), dot(dir, up)) / max(d, 1e-4);
  if (d <= 0.0) return 0.0;
  vec2 a = abs(local);
  return 1.0 - smoothstep(size * 0.92, size, max(a.x, a.y));
}

void main() {
  vec3 dir = normalize(vDir);
  vec3 col = skyColor(dir);
  vec2 l;
  float sun = squareDisk(dir, uSunDir, 0.085, l);
  col += uSunDisk * sun * (1.0 - uRain);
  float moon = squareDisk(dir, -uSunDir, 0.065, l);
  if (moon > 0.0) {
    float crater = hash(floor(vec3(l * 40.0, 1.0)));
    col += uMoonDisk * moon * (0.75 + 0.25 * crater) * (1.0 - uRain);
  }
  // Звёзды вращаются вместе с небом.
  if (uNight > 0.01 && dir.y > -0.1) {
    vec3 sd = dir;
    float ang = atan(uSunDir.y, uSunDir.x);
    float c = cos(-ang);
    float s = sin(-ang);
    sd = vec3(c * sd.x - s * sd.y, s * sd.x + c * sd.y, sd.z);
    vec3 cell = floor(sd * 220.0);
    float h = hash(cell);
    if (h > 0.9965) col += vec3(0.9, 0.95, 1.0) * (h - 0.9965) * 900.0 * uNight * (1.0 - uRain) * smoothstep(-0.1, 0.2, dir.y);
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Облака: объёмные «кубические» облака, освещённые солнцем. */
export const CLOUD_VERTEX = /* glsl */ `
attribute float aShade;
varying vec3 vWorld;
varying float vShade;
void main() {
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vShade = aShade;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const CLOUD_FRAGMENT = /* glsl */ `
${COMMON_UNIFORMS}
varying vec3 vWorld;
varying float vShade;
${SKY_FUNCTIONS}
void main() {
  vec3 col = (uAmbient * 1.2 + uLightColor * 0.85) * vShade;
  col = mix(col, col * 0.55, uRain);
  vec3 v = vWorld - uCameraPos;
  float dist = length(v);
  float fog = smoothstep(uFogFar * 1.2, uFogFar * 3.2, dist);
  vec3 c = mix(col, skyColor(v / dist), fog);
  gl_FragColor = vec4(c, 0.86 * (1.0 - fog * 0.85));
}
`;

/** Полноэкранные проходы: финальный, свечение, лучи. */
export const FINAL_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * Свечение, шаг вниз (dual filter): 5 билинейных выборок покрывают 4×4 текселя источника.
 * На первом шаге оставляем только яркое — выше порога.
 */
export const BLOOM_DOWN_FRAGMENT = /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uThreshold;
uniform float uPrefilter;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
  c += texture2D(tSrc, vUv - uTexel).rgb;
  c += texture2D(tSrc, vUv + uTexel).rgb;
  c += texture2D(tSrc, vUv + vec2(uTexel.x, -uTexel.y)).rgb;
  c += texture2D(tSrc, vUv - vec2(uTexel.x, -uTexel.y)).rgb;
  c *= 0.125;
  if (uPrefilter > 0.5) c *= smoothstep(uThreshold, uThreshold + 0.1, dot(c, vec3(0.299, 0.587, 0.114)));
  gl_FragColor = vec4(c, 1.0);
}
`;

/**
 * Свечение, шаг вверх: «палатка» 3×3 из меньшей ступени прибавляется (смешиванием) к большей.
 * Билинейная выборка между четырьмя текселями — это уже среднее 2×2, поэтому палатка 3×3
 * точно собирается из четырёх выборок со сдвигом на полтекселя вместо девяти.
 */
export const BLOOM_UP_FRAGMENT = /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec2 h = uTexel * 0.5;
  vec3 c = texture2D(tSrc, vUv + h).rgb + texture2D(tSrc, vUv - h).rgb;
  c += texture2D(tSrc, vUv + vec2(h.x, -h.y)).rgb + texture2D(tSrc, vUv - vec2(h.x, -h.y)).rgb;
  gl_FragColor = vec4(c * 0.25, 1.0);
}
`;

/**
 * Лучи солнца в четверть разрешения: от пикселя к солнцу ищем открытое небо по глубине.
 * Лучи размытые сами по себе, поэтому в 16 раз меньше пикселей выглядит так же.
 */
export const RAYS_FRAGMENT = /* glsl */ `
uniform sampler2D tDepth;
uniform vec2 uSunScreen;
varying vec2 vUv;
void main() {
  float fall = 1.0 - smoothstep(0.0, 0.9, length((vUv - uSunScreen) * vec2(1.0, 0.6)));
  if (fall <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  // Шаги со случайным сдвигом на пиксель (interleaved gradient noise) — без полос.
  const int STEPS = 32;
  vec2 delta = (uSunScreen - vUv) / float(STEPS);
  float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  vec2 p = vUv + delta * jitter;
  float acc = 0.0;
  float w = 1.0;
  for (int i = 0; i < STEPS; i++) {
    p += delta;
    acc += (texture2D(tDepth, clamp(p, 0.0, 1.0)).r >= 0.99999 ? 1.0 : 0.0) * w;
    w *= 0.956;
  }
  gl_FragColor = vec4(acc / float(STEPS) * fall * 0.9, 0.0, 0.0, 1.0);
}
`;

/**
 * Финальный проход: лучи и свечение, тонмаппинг ACES, цветокоррекция, виньетка, sRGB.
 * Если картинку растягивает браузер (рендер меньше экрана) — возвращаем резкость.
 */
export const FINAL_FRAGMENT = /* glsl */ `
uniform sampler2D tColor;
uniform vec2 uTexel;
uniform float uSharpness;
#ifdef BLOOM
uniform sampler2D tBloom;
uniform float uBloomStrength;
#endif
#ifdef GOD_RAYS
uniform sampler2D tRays;
uniform float uSunVisible;
uniform vec3 uRayColor;
#endif
uniform float uExposure;
uniform float uSaturation;
uniform float uUnderwaterTint;
uniform float uTimeF;
uniform float uDamage;
/** Страх: тёмная виньетка, блеклые цвета, зерно. Сбой: рваные строки, расходящиеся цвета, помехи. */
uniform float uDread;
uniform float uGlitch;
varying vec2 vUv;

float hash12(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = vUv;
  if (uUnderwaterTint > 0.5) uv += vec2(sin(uv.y * 30.0 + uTimeF * 2.0), cos(uv.x * 25.0 + uTimeF * 1.7)) * 0.0025;
  vec3 col;
  if (uGlitch > 0.001) {
    // Строки изображения рвутся и съезжают, каналы цвета расходятся.
    float band = floor(uv.y * 42.0 + floor(uTimeF * 23.0) * 7.0);
    float n = hash12(vec2(band, floor(uTimeF * 31.0)));
    uv.x += (n - 0.5) * 0.08 * uGlitch * step(0.55, n);
    float o = 0.008 * uGlitch;
    col = vec3(texture2D(tColor, uv + vec2(o, 0.0)).r, texture2D(tColor, uv).g, texture2D(tColor, uv - vec2(o, 0.0)).b);
  } else {
    col = texture2D(tColor, uv).rgb;
    if (uSharpness > 0.0) {
      // Адаптивная резкость (как AMD CAS): чем мягче переход, тем сильнее; жёсткие края
      // почти не трогаем, поэтому ореолов нет. Считаем в сжатой яркости c/(1+c): в HDR
      // солнце в десятки раз ярче неба и оставило бы вокруг себя тёмную кайму.
      vec3 c = col / (1.0 + col);
      vec3 n = texture2D(tColor, uv + vec2(0.0, uTexel.y)).rgb;
      vec3 s = texture2D(tColor, uv - vec2(0.0, uTexel.y)).rgb;
      vec3 e = texture2D(tColor, uv + vec2(uTexel.x, 0.0)).rgb;
      vec3 w = texture2D(tColor, uv - vec2(uTexel.x, 0.0)).rgb;
      n /= 1.0 + n;
      s /= 1.0 + s;
      e /= 1.0 + e;
      w /= 1.0 + w;
      vec3 lo = min(c, min(min(n, s), min(e, w)));
      vec3 hi = max(c, max(max(n, s), max(e, w)));
      vec3 amp = sqrt(clamp(min(lo, 1.0 - hi) / max(hi, vec3(1e-4)), 0.0, 1.0));
      vec3 k = -amp * uSharpness;
      c = clamp((c + (n + s + e + w) * k) / (1.0 + 4.0 * k), 0.0, 0.999);
      col = c / (1.0 - c);
    }
  }
#ifdef BLOOM
  col += texture2D(tBloom, uv).rgb * uBloomStrength;
#endif
#ifdef GOD_RAYS
  col += uRayColor * texture2D(tRays, uv).r * uSunVisible;
#endif
  col *= uExposure;
  col = aces(col);
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);
  vec2 q = vUv - 0.5;
  col *= 1.0 - dot(q, q) * (0.55 + uDread * 1.6);
  if (uDread + uGlitch > 0.001) {
    float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(col, vec3(l) * vec3(0.92, 0.95, 1.0), uDread * 0.55);
    float grain = hash12(gl_FragCoord.xy + fract(uTimeF * 7.13) * 512.0) - 0.5;
    col += grain * (0.05 * uDread + 0.26 * uGlitch);
  }
  if (uUnderwaterTint > 0.5) col = mix(col, col * vec3(0.55, 0.75, 1.0), 0.45);
  col = mix(col, vec3(0.7, 0.0, 0.0), uDamage * smoothstep(0.15, 0.75, length(q)));
  // Шум в полшага яркости (interleaved gradient noise): плавные градиенты неба без «ступенек».
  float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  vec3 srgb = toSRGB(clamp(col, 0.0, 1.0)) + (dither - 0.5) / 255.0;
  gl_FragColor = vec4(srgb, 1.0);
}
`;
