var e=globalThis,t={},i={},r=e.parcelRequire5b7a;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},e.parcelRequire5b7a=r),r.register;var o=r("7Pz0b");new(o&&o.__esModule?o.default:o)(e=>{let t;let i=-.7,r=0,o=1.3;e.preload=()=>{t=e.loadShader("shader.vert","shader.frag")},e.setup=()=>{e.createCanvas(Math.ceil(e.windowWidth)+10,Math.ceil(e.windowHeight)+10,e.WEBGL)},e.windowResized=()=>{e.resizeCanvas(Math.ceil(e.windowWidth)+10,Math.ceil(e.windowHeight)+10)};let s=()=>{if(e.mouseIsPressed){let t=(e.pmouseX-e.mouseX)/e.width*o,s=(e.pmouseY-e.mouseY)/e.height*o;i+=t,r-=s}};e.draw=()=>{e.background(0,0,0),t.setUniform("u_aspect",e.width/e.height),t.setUniform("u_center_x",i),t.setUniform("u_center_y",r),t.setUniform("u_grid_length",o),t.setUniform("u_aspect",e.width/e.height),t.setUniform("u_framecount",.001*e.millis()),t.setUniform("minx",i-o/2*e.width/e.height),t.setUniform("maxx",i+o/2*e.width/e.height),t.setUniform("miny",r-o/2),t.setUniform("maxy",r+o/2),console.log(o),e.shader(t),e.rect(0,0,e.width,e.height),s()},e.mouseWheel=t=>{t.delta<0?o*=.99:o*=1.0101010101010102,o=e.constrain(o,0,3)}});
//# sourceMappingURL=index.31aeebdb.js.map
