function e(e){return e&&e.__esModule?e.default:e}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=i.parcelRequire5b7a;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,i.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,i){t[e]=i},i.parcelRequire5b7a=o);var r=o("7Pz0b");class s{constructor(){this.isPaused=!1}}class d{constructor(e){this.p5=e}run(){this.p5.background(220,255,255),this.p5.fill(0,0,0),this.p5.circle(Math.random()*this.p5.windowWidth,Math.random()*this.p5.windowHeight,40)}}new(e(r))((e=>{let i=!1,n=new s;window.params=n;let t=new d(e);window.simulation=t,e.setup=()=>{var n=e.createCanvas(.9*e.windowWidth,.9*e.windowHeight);n.mouseOver((()=>{i=!0})),n.mouseOut((()=>{i=!1})),n.style("display","block"),n.parent("sketch-holder")},e.windowResized=()=>{e.resizeCanvas(.9*e.windowWidth,.9*e.windowHeight)},e.draw=()=>{t.run()}}));
//# sourceMappingURL=sketch.da7d73d5.js.map
