var e=globalThis,t={},i={},a=e.parcelRequire5b7a;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in i){var a=i[e];delete i[e];var r={id:e,exports:{}};return t[e]=r,a.call(r.exports,r,r.exports),r.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequire5b7a=a),(0,a.register)("2ekxp",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>i,set:void 0,enumerable:!0,configurable:!0});var i=class{constructor(){this.MaxIterations=50}}});var r=a("7Pz0b"),o=a("2ekxp");function n(e){console.log(window.params.MaxIterations),e.pixelDensity(1),e.loadPixels();for(let t=0;t<e.width;t++)for(let i=0;i<e.height;i++){let a=e.map(t,0,e.height,-2,.5),r=e.map(i,0,e.height,-1.25,1.25),o=a,n=r,s=0;for(;s<window.params.MaxIterations;){let t=a*a-r*r,i=2*a*r;if(a=t+o,r=i+n,e.abs(a+r)>2e4)break;s++}let l=e.map(s,0,window.params.MaxIterations,100,255);s==window.params.MaxIterations&&(l=255);let d=(t+i*e.width)*4;e.pixels[d+0]=0,e.pixels[d+1]=0,e.pixels[d+2]=0,e.pixels[d+3]=l}e.updatePixels()}window.params=new o.default,new(r&&r.__esModule?r.default:r)(function(e){e.setup=()=>{e.createCanvas(.75*e.windowHeight,.75*e.windowHeight),n(e)},e.windowResized=()=>{e.resizeCanvas(.95*e.windowWidth,.95*e.windowHeight)},e.draw=()=>{n(e)}});
//# sourceMappingURL=sketch.26f0b829.js.map
