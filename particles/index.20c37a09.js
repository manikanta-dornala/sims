function i(i){return i&&i.__esModule?i.default:i}var t=globalThis,s={},e={},o=t.parcelRequire5b7a;null==o&&((o=function(i){if(i in s)return s[i].exports;if(i in e){var t=e[i];delete e[i];var o={id:i,exports:{}};return s[i]=o,t.call(o.exports,o,o.exports),o.exports}var h=Error("Cannot find module '"+i+"'");throw h.code="MODULE_NOT_FOUND",h}).register=function(i,t){e[i]=t},t.parcelRequire5b7a=o),o.register;var h=o("7Pz0b");const a=new class{constructor(){this.particleSize=5,this.lineMaxDist=150,this.WallThickness=0,this.WallBuffer=50,this.InitialPopulation=160,this.MaxSpeed=3,this.MinSpeed=.5,this.MaxForce=.2}};var h=(o("7Pz0b"),o("7Pz0b"));class r{constructor(i){this.p5=i,this.position=this.p5.createVector(Math.random()*i.windowWidth,Math.random()*i.windowHeight),this.heading=2*Math.random()*this.p5.PI,this.velocity=this.p5.createVector(this.p5.cos(this.heading),this.p5.sin(this.heading)).normalize().mult(a.MaxSpeed*Math.random()),this.color=this.p5.color(255*Math.random(),255*Math.random(),255*Math.random()),this.size=1,this.mass=1}draw(){this.p5.push(),this.p5.translate(this.position.x,this.position.y),this.p5.fill(this.color),this.p5.ellipse(0,0,this.size,this.size),this.p5.fill(0,0,0),this.p5.pop()}step(i){var t=this.p5.createVector(i.x,i.y);t=t.mult(this.mass),this.velocity.add(t),this.velocity.mag()<a.MinSpeed&&(this.velocity.normalize(),this.velocity.mult(a.MinSpeed)),this.velocity.limit(a.MaxSpeed),this.position.add(this.velocity),this.warpWorld()}warpWorld(){var i=this.p5.windowWidth,t=this.p5.windowHeight,s=a.WallBuffer;this.position.x<s?this.position.x=i-1.1*s:this.position.x>i-s&&(this.position.x=1.1*s),this.position.y<s?this.position.y=t-1.1*s:this.position.y>t-s&&(this.position.y=1.1*s)}getDistanceFrom(t){var s=i(h).Vector.dist(this.position,t),e=this.p5.createVector(t.x,t.y);(this.position.y<a.WallBuffer||this.position.y>this.p5.windowHeight-a.WallBuffer)&&(e.y=-t.y+this.p5.windowHeight-a.WallBuffer),(this.position.x<a.WallBuffer||this.position.x>this.p5.windowWidth-a.WallBuffer)&&(e.x=-t.x+this.p5.windowWidth-a.WallBuffer);var o=i(h).Vector.dist(this.position,e);return this.p5.min(s,o)}}class n{constructor(i){this.particles=[],this.p5=i}run(){this.particles.forEach(i=>{i.draw(),this.drawLines(i,this.particles);let t=2*Math.random()*this.p5.PI,s=this.p5.createVector(this.p5.cos(t),this.p5.sin(t)).normalize().mult(.1*a.MaxSpeed*Math.random());i.step(s)})}drawLines(t,s){s.forEach(s=>{let e=i(h).Vector.dist(s.position,t.position);e<a.lineMaxDist&&this.p5.map(e,0,a.lineMaxDist,2,0)>.75&&(this.p5.stroke(this.p5.color(0,255,0,this.p5.map(e,0,a.lineMaxDist,255,0))),this.p5.strokeWeight(this.p5.map(e,0,a.lineMaxDist,2,0)),this.p5.line(t.position.x,t.position.y,s.position.x,s.position.y))})}addNewParticle(){let i=new r(this.p5);i.size=a.particleSize,this.particles.push(i)}}new(i(h))(i=>{var t=new n(i);i.setup=()=>{var s=i.createCanvas(i.windowWidth,i.windowHeight);s.mouseOver(()=>{}),s.mouseOut(()=>{}),s.style("display","block"),s.parent("sketch-holder");for(let i=0;i<a.InitialPopulation;i++)t.addNewParticle()},i.windowResized=()=>{i.resizeCanvas(i.windowWidth,i.windowHeight)},i.draw=()=>{i.background(0,0,0),t.run()}});
//# sourceMappingURL=index.20c37a09.js.map
