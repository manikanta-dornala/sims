var e=globalThis,t={},r={},n=e.parcelRequire5b7a;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequire5b7a=n),(0,n.register)("5gHYJ",function(e,t){Object.defineProperty(e.exports,"default",{get:()=>r,set:void 0,enumerable:!0,configurable:!0});var r=class{constructor(){this.Segments=6}}});var o=n("7Pz0b"),a=n("5gHYJ");new(o&&o.__esModule?o.default:o)(e=>{let t=[],r=0,n=new a.default;function o(t,r){let n=function(t,r){let n=e.int(e.random(4,10)),o=[],a=e.PI/t;for(let t=0;t<n;t++){let t=e.random(a),n=e.random(r,1.5*r);o.push(e.createVector(n*e.cos(t),n*e.sin(t)))}for(let t=n-1;t>=0;t--){let r=o[t];o.push(e.createVector(r.x,-r.y))}return o}(t,r);return function(t,r){let n=[];for(let o=0;o<t;o++){let a=o*e.TWO_PI/t;for(let t=0;t<r.length;t++){let o=r[t],i=o.mag(),l=e.atan2(o.y,o.x)+a,s=e.cos(l)*i,u=e.sin(l)*i;n.push(e.createVector(s,u))}}return n}(t,n)}window.params=n,e.setup=()=>{var r=e.createCanvas(.9*e.windowWidth,.9*e.windowHeight);r.mouseOver(()=>{}),r.mouseOut(()=>{}),r.style("display","block"),r.parent("sketch-holder"),t=o(Math.floor(n.Segments),e.height/3)},e.windowResized=()=>{e.resizeCanvas(.9*e.windowWidth,.9*e.windowHeight)},e.draw=()=>{e.background(255),e.fill(255,255,255),r+=e.PI/10,e.frameCount%90==0&&(t=o(Math.floor(n.Segments),e.height/3)),function(t,r,n){e.beginShape(),e.strokeWeight(8);for(let o=0;o<t.length;o++){let a=t[o];e.vertex(r+a.x,n+a.y)}e.endShape(e.CLOSE)}(t,e.width/2,e.height/2)}});
//# sourceMappingURL=sketch.a3c8843a.js.map