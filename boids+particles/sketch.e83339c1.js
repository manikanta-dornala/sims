function i(i){return i&&i.__esModule?i.default:i}var t=globalThis,s={},e={},o=t.parcelRequire5b7a;null==o&&((o=function(i){if(i in s)return s[i].exports;if(i in e){var t=e[i];delete e[i];var o={id:i,exports:{}};return s[i]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(i,t){e[i]=t},t.parcelRequire5b7a=o),(0,o.register)("6wK9I",function(i,t){Object.defineProperty(i.exports,"default",{get:()=>s,set:void 0,enumerable:!0,configurable:!0});var s=class{constructor(){this.isPaused=!1,this.boidSize=5,this.lineMaxDist=150,this.WallThickness=0,this.WallBuffer=50,this.InitialPopulation=10,this.MaxPopulation=150,this.MaxSpeed=3,this.MinSpeed=2.5,this.MaxForce=.2,this.SeperationWeight=5,this.AlignmentWeight=1.5,this.CohesionWeight=1.5,this.SphereOfInfluence=50,this.CohesionNeighborhood=100,this.DesiredSeperation=25,this.SimulationSpeed=10}}});var a=o("7Pz0b"),r=o("6wK9I"),a=(o("7Pz0b"),o("7Pz0b"));class n{constructor(i){this.sizeMultiplier=5,this.p5=i,this.color=this.p5.color(255*Math.random(),255*Math.random(),255*Math.random()),this.mass=this.p5.map(Math.random(),0,1,1,2)}draw(i,t){this.p5.push(),this.p5.translate(i.x,i.y),this.p5.rotate(t),this.p5.map(this.mass,1,2,1,this.sizeMultiplier),this.p5.fill(this.color),this.p5.stroke(255,255,255),this.p5.ellipse(0,0,this.sizeMultiplier*this.mass,this.sizeMultiplier*this.mass),this.p5.fill(this.color),this.p5.pop()}}class h{constructor(i){this.p5=i,this.position=this.p5.createVector(Math.random()*i.windowWidth,Math.random()*i.windowHeight),this.heading=2*Math.random()*this.p5.PI,this.velocity=this.p5.createVector(this.p5.cos(this.heading),this.p5.sin(this.heading)).normalize().mult(window.params.MaxSpeed*Math.random()),this.color=this.p5.color(255*Math.random(),255*Math.random(),255*Math.random()),this.shape=new n(this.p5),this.shape.sizeMultiplier=2}set mass(i){this.shape.mass=i}get mass(){return this.shape.mass}draw(){this.shape.draw(this.position,this.velocity.heading())}step(t){var s=i(a).Vector.mult(t,this.mass);this.velocity.add(s),this.velocity.mag()<window.params.MinSpeed&&(this.velocity.normalize(),this.velocity.mult(window.params.MinSpeed)),this.velocity.limit(window.params.MaxSpeed),this.position.add(this.velocity),this.warpWorld()}warpWorld(){var i=this.p5.windowWidth,t=this.p5.windowHeight,s=window.params.WallBuffer;this.position.x<s?this.position.x=i-1.1*s:this.position.x>i-s&&(this.position.x=1.1*s),this.position.y<s?this.position.y=t-1.1*s:this.position.y>t-s&&(this.position.y=1.1*s)}getDistanceFrom(t){var s=i(a).Vector.dist(this.position,t),e=this.p5.createVector(t.x,t.y);(this.position.y<window.params.WallBuffer||this.position.y>this.p5.windowHeight-window.params.WallBuffer)&&(e.y=-t.y+this.p5.windowHeight-window.params.WallBuffer),(this.position.x<window.params.WallBuffer||this.position.x>this.p5.windowWidth-window.params.WallBuffer)&&(e.x=-t.x+this.p5.windowWidth-window.params.WallBuffer);var o=i(a).Vector.dist(this.position,e);return this.p5.min(s,o)}AlignmentForce(t){var s=this.p5.createVector(0,0),e=0;if(t?.forEach(i=>{var t=this.getDistanceFrom(i.position);t>0&&t<window.params.SphereOfInfluence&&(s.add(i.velocity),e++)}),e>0){s.div(e);var o=i(a).Vector.sub(s,this.velocity);return o.limit(window.params.MaxForce),o.mult(window.params.AlignmentWeight),o}return this.p5.createVector(0,0)}CohesionForce(i){var t=this.p5.createVector(0,0),s=0;if(i?.forEach(i=>{var e=this.getDistanceFrom(i.position);if(e>0&&e<window.params.CohesionNeighborhood){var o=this.p5.createVector();o.x=i.position.x,o.y=i.position.y,t.add(i.position),s++}}),s>0){t.mult(1/s);var e=this.Seek(t);return e.mult(window.params.CohesionWeight),e}return this.p5.createVector(0,0)}RepulsionForce(t){var s=0,e=this.p5.createVector(0,0);return t?.forEach(t=>{var o=this.getDistanceFrom(t.position);if(o>0&&o<window.params.DesiredSeperation){s++;var r=i(a).Vector.sub(this.position,t.position);r.mult(1/o),e.add(r)}}),e.mag()>0&&s>0&&e.limit(window.params.MaxForce),e.mult(window.params.SeperationWeight),e}Seek(t){var s=i(a).Vector.sub(t,this.position);s.normalize(),s.mult(window.params.MaxSpeed);var e=i(a).Vector.sub(s,this.velocity);return e.limit(window.params.MaxForce),e}Flee(t){var s=i(a).Vector.sub(this.position,t);s.normalize(),s.mult(window.params.MaxSpeed);var e=i(a).Vector.sub(s,this.velocity);return e.limit(window.params.MaxForce),e}GetSteeringForces(i){var t=this.AlignmentForce(i),s=this.RepulsionForce(i),e=this.CohesionForce(i),o=this.p5.createVector(0,0);return o.add(t),o.add(s),o.add(e),o}}class p{constructor(i){this.boids=[],this.p5=i}run(){this.boids.forEach(i=>{if(!1==window.params.isPaused&&this.p5.frameCount%window.params.SimulationSpeed!=0&&window.params.SimulationSpeed>0){let t=i.GetSteeringForces(this.boids);i.step(t)}i.draw(),this.drawLines(i,this.boids)})}drawLines(t,s){s.forEach(s=>{let e=i(a).Vector.dist(s.position,t.position);e<window.params.lineMaxDist&&(this.p5.stroke(this.p5.color(0,255,0,this.p5.map(e,0,window.params.lineMaxDist,255,0))),this.p5.strokeWeight(this.p5.map(e,0,window.params.lineMaxDist,2,0)),this.p5.line(t.position.x,t.position.y,s.position.x,s.position.y))})}addNewboid(){if(this.boids.length<window.params.MaxPopulation){let i=new h(this.p5);this.boids.push(i)}}}window.params=new r.default,new(i(a))(i=>{let t=new p(i);window.simulation=t,i.setup=()=>{let s=i.createCanvas(i.windowWidth,i.windowHeight);s.mouseOver(()=>{}),s.mouseOut(()=>{}),s.style("display","block"),s.parent("sketch-holder");for(let i=0;i<window.params.InitialPopulation;i++)t.addNewboid()},i.windowResized=()=>{i.resizeCanvas(i.windowWidth,i.windowHeight)},i.draw=()=>{i.background(0,0,0),t.run()},i.keyPressed=()=>{i.key=" ",window.params.isPaused=!window.params.isPaused}});
//# sourceMappingURL=sketch.e83339c1.js.map
