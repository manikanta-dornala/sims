var e=globalThis,r={},i={},t=e.parcelRequire5b7a;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){i[e]=r},e.parcelRequire5b7a=t),t.register;var s=t("7Pz0b");class n{constructor(){this.isPaused=!1}}class o{constructor(e){this.p5=e}run(){this.p5.background(220,255,255),this.p5.fill(0,0,0),this.p5.circle(Math.random()*this.p5.windowWidth,Math.random()*this.p5.windowHeight,40)}}new(s&&s.__esModule?s.default:s)(e=>{let r=new n;window.params=r;let i=new o(e);window.simulation=i,e.setup=()=>{var r=e.createCanvas(.9*e.windowWidth,.9*e.windowHeight);r.mouseOver(()=>{}),r.mouseOut(()=>{}),r.style("display","block"),r.parent("sketch-holder")},e.windowResized=()=>{e.resizeCanvas(.9*e.windowWidth,.9*e.windowHeight)},e.draw=()=>{i.run()}});
//# sourceMappingURL=sketch.061da3fb.js.map