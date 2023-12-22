precision mediump float;

varying vec2 pos;
uniform float u_aspect;
uniform float u_framecount;

vec3 palette(float t){
    vec3 a=vec3(.5,.5,.5);
    vec3 b=vec3(.5,.5,.5);
    vec3 c=vec3(1.,1.,1.);
    vec3 d=vec3(.263,.416,.557);
    
    return a+b*cos(6.28318*(c*t+d));
}

void main(){
    vec2 uv=pos;
    uv=(uv-.5)*2.;
    uv.x=uv.x*u_aspect;
    vec2 uv0=uv;
    vec3 final_color=vec3(0.);
    for(float i=0.;i<3.;i++){
        uv=fract(uv)*2.-1.;
        float d=length(uv)*exp(-length(uv0));
        d=sin(10.*d+u_framecount)/10.;
        d=abs(d);
        // d=smoothstep(0.,.1,d);
        d=.01/d;
        vec3 col=palette(u_framecount+length(uv0)+i*4.);
        final_color+=col*d;
    }
    gl_FragColor=vec4(final_color,1.);
}