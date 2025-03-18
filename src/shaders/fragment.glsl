varying vec2 vUv;
uniform float iTime;
uniform vec2 iResolution;

void main() {
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}
