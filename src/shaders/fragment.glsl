varying vec2 vUv;
uniform float time;
varying vec2 color;
void main() {
  float dash = sin(vUv.x*50. + time);

  if(dash<0.) discard;

  gl_FragColor = vec4(vUv.x, 0.1, 0.0, 1.0);
}