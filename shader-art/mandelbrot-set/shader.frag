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

float iterateMandelbrot(vec2 coord){
    // initialise x and y as 0
    float x=0.;
    float y=0.;
    
    float iterations=0.;
    float MAX_ITERATIONS=max(200.,exp(-u_grid_length));
    MAX_ITERATIONS=min(10000000.,MAX_ITERATIONS);
    // MAX_ITERATIONS=10000.;
    // iterate for maximum iterations
    for(float i=0.;i<10000000.;i++){
        // exit condition
        // return how many iterations as % of max
        if(x*x+y*y>4.){
            break;
        }
        
        float xtemp=x*x-y*y+coord.x;
        y=2.*x*y+(-1.*coord.y);
        x=xtemp;
        iterations+=1.;
        if(iterations>=MAX_ITERATIONS){break;}
    }
    float d=float(iterations)/MAX_ITERATIONS;
    float ratio=smoothstep(.1,.9,d);
    float brightness=iterations>=MAX_ITERATIONS?0.:ratio;
    return brightness;
}

void main(){
    vec3 final_color=vec3(.0);
    float x=((maxx-minx)*pos.x)+minx;
    float y=((maxy-miny)*pos.y)+miny;
    float result=iterateMandelbrot(vec2(x,y));
    final_color=vec3(result);
    
    gl_FragColor=vec4(final_color,1.);
}