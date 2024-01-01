precision mediump float;

varying vec2 pos;
uniform float u_aspect;
uniform float u_center_x;
uniform float u_center_y;
uniform float u_grid_length;
uniform float u_framecount;

uniform float minx;
uniform float maxx;
uniform float miny;
uniform float maxy;

float getNumIterations(vec2 coord, float max_iters) {
    vec2 z = vec2(0);
    vec2 c = vec2(coord);
    float iterations = 1.;
    for (float i = 0.; i < 10000000.; i++) {
        vec2 z_squared = vec2(z.x * z.x - z.y * z.y, z.x * z.y + z.y * z.x);
        z = z_squared + c;
        if (length(z) > 2.) {
            break;
        }
        iterations += 1.;
        if (iterations >= max_iters) {
            break;
        }
    }
    return iterations;
}

vec3 palette(float iterations, float max_iters) {
    if (iterations >= max_iters)
        return vec3(.1);
    float brightness = iterations * pow(u_grid_length, -0.05) / max_iters;
    return vec3(brightness);
}

void main() {
    float x = ((maxx - minx) * pos.x) + minx;
    float y = ((maxy - miny) * pos.y) + miny;
    float max_iters = 100. * pow(u_grid_length, -1. / 5.);
    float iterations = getNumIterations(vec2(x, y), max_iters);
    vec3 pixel_color = palette(iterations, max_iters);
    gl_FragColor = vec4(pixel_color, 1.);
}