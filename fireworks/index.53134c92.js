function i(i){return i&&i.__esModule?i.default:i}var t=globalThis,s={},e={},o=t.parcelRequire5b7a;null==o&&((o=function(i){if(i in s)return s[i].exports;if(i in e){var t=e[i];delete e[i];var o={id:i,exports:{}};return s[i]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(i,t){e[i]=t},t.parcelRequire5b7a=o),o.register;var a=o("7Pz0b");const r=new class{constructor(){this.isPaused=!1,this.particleSize=1,this.lineMaxDist=150,this.WallThickness=0,this.WallBuffer=150,this.InitialPopulation=5,this.MaxSpeed=8,this.MinSpeed=6,this.MaxForce=.2,this.g=.08}};var a=(o("7Pz0b"),o("7Pz0b"));class h{constructor(i){this.isVisible=!0,this.frameCount=0,this.p5=i,this.position=this.p5.createVector(Math.random()*i.windowWidth,Math.random()*i.windowHeight),this.heading=2*Math.random()*this.p5.PI,this.velocity=this.p5.createVector(this.p5.cos(this.heading),this.p5.sin(this.heading)).normalize().mult(this.p5.map(Math.random(),0,1,r.MinSpeed,r.MaxSpeed)),this.color=this.p5.color(255*parseInt((5*Math.random()).toFixed())/5,255*parseInt((5*Math.random()).toFixed())/5,255*parseInt((5*Math.random()).toFixed())/5),this.size=r.particleSize,this.mass=r.particleSize}draw(){this.isVisible&&(this.p5.push(),this.p5.translate(this.position.x,this.position.y),this.p5.stroke(this.color),this.p5.ellipse(0,0,this.size),this.p5.fill(this.color),this.p5.pop(),!r.isPaused&&this.frameCount++,this.frameCount>300&&(this.isVisible=!1))}step(t){var s=i(a).Vector.mult(t,1/this.mass);this.velocity.add(s),this.position.add(this.velocity),this.warpWorld()}warpWorld(){(this.position.x<r.WallBuffer||this.position.x>this.p5.windowWidth-r.WallBuffer||this.position.y<r.WallBuffer||this.position.y>this.p5.windowHeight-r.WallBuffer)&&(this.isVisible=!1)}explode(){let i=[];for(let t=0;t<300;t++){let t=new h(this.p5);t.position=this.position.copy(),t.size=this.p5.map(Math.random(),0,1,1,1.5),t.mass=this.p5.map(Math.random(),0,1,1,2),t.color=this.color,t.frameCount=this.p5.map(Math.random(),0,1,250,280),t.velocity.normalize().mult(this.p5.map(Math.random(),0,1,.1,2)).add(this.p5.createVector(0,-2)),i.push(t)}return i}}class l{constructor(i){this.particles=[],this.explosionParticles=[],this.p5=i,this.groundHeight=this.p5.windowHeight-r.WallBuffer,this.g=this.p5.createVector(0,r.g)}run(){this.drawGround();let t=Math.random()>.9;!r.isPaused&&Math.random()>.98&&this.addNewParticle(),this.particles.forEach(s=>{if(s.isVisible){if(!r.isPaused&&!t){let t=i(a).Vector.mult(this.g,s.mass);s.step(t),.1>s.velocity.mag()&&(this.explosionParticles.push(...s.explode()),s.isVisible=!1)}s.draw()}}),this.particles=this.particles.filter(i=>i.isVisible),this.explosionParticles.forEach(s=>{if(s.isVisible){if(!r.isPaused&&!t){let t=i(a).Vector.mult(this.g,s.mass);s.step(t),s.position.y>this.groundHeight&&(s.isVisible=!1)}s.draw()}}),this.explosionParticles=this.explosionParticles.filter(i=>i.isVisible)}drawGround(){this.p5.stroke(255,255,255),this.p5.line(0,this.groundHeight,this.p5.windowWidth,this.groundHeight)}addNewParticle(){let i=new h(this.p5);i.velocity=this.p5.createVector(0,-1*this.p5.map(Math.random(),0,1,r.MinSpeed,r.MaxSpeed)),i.position=this.p5.createVector(this.p5.map(Math.random(),0,1,2*r.WallBuffer,this.p5.windowWidth-2*r.WallBuffer),this.groundHeight),this.particles.push(i)}}new(i(a))(i=>{var t=new l(i);i.setup=()=>{var s=i.createCanvas(i.windowWidth,i.windowHeight);s.mouseOver(()=>{}),s.mouseOut(()=>{}),s.style("display","block"),s.parent("sketch-holder");for(let i=0;i<r.InitialPopulation;i++)t.addNewParticle()},i.windowResized=()=>{i.resizeCanvas(i.windowWidth,i.windowHeight)},i.draw=()=>{i.background(20,20,0),t.run()},i.keyPressed=()=>{i.key=" ",r.isPaused=!r.isPaused}});
//# sourceMappingURL=index.53134c92.js.map
