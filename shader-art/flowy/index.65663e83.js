var e=globalThis,r={},t={},i=e.parcelRequire5b7a;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in t){var i=t[e];delete t[e];var a={id:e,exports:{}};return r[e]=a,i.call(a.exports,a,a.exports),a.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){t[e]=r},e.parcelRequire5b7a=i),i.register;var a=i("7Pz0b");new(a&&a.__esModule?a.default:a)(e=>{let r;e.preload=()=>{r=e.loadShader("shader.vert","shader.frag")},e.setup=()=>{var r=e.createCanvas(e.windowWidth,e.windowHeight,e.WEBGL);r.mouseOver(()=>{}),r.mouseOut(()=>{}),r.style("display","block"),r.parent("sketch-holder")},e.windowResized=()=>{e.resizeCanvas(e.windowWidth,e.windowHeight)},e.draw=()=>{e.background(0,0,0),r.setUniform("u_aspect",e.width/e.height),r.setUniform("u_framecount",.001*e.millis()),e.shader(r),e.rect(0,0,e.width,e.height)}});
//# sourceMappingURL=index.65663e83.js.map