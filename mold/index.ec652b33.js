var t,i=globalThis,s={},h={},e=i.parcelRequire5b7a;null==e&&((e=function(t){if(t in s)return s[t].exports;if(t in h){var i=h[t];delete h[t];var e={id:t,exports:{}};return s[t]=e,i.call(e.exports,e,e.exports),e.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,i){h[t]=i},i.parcelRequire5b7a=e),e.register;class n{constructor(t,i,s){this.r=1,this.sensorAngle=60,this.sensorDist=20,this.x=t,this.y=i,this.p5=s,this.vx=this.p5.cos(this.heading),this.vy=this.p5.sin(this.heading),this.heading=360*this.p5.random(),this.rotAngle=30}display(){this.p5.noStroke(),this.p5.fill(255),this.p5.ellipse(this.x,this.y,this.r,this.r)}update(){this.updatePos(),this.updateHeading()}updatePos(){let t=this.p5.random(-.1,.1),i=this.heading*(1+t);this.vx=this.p5.cos(i),this.vy=this.p5.sin(i),this.x=(this.x+this.vx+this.p5.width)%this.p5.width,this.y=(this.y+this.vy+this.p5.height)%this.p5.height}updateHeading(){let t=this.getValue(this.sensorAngle),i=this.getValue(-this.sensorAngle),s=this.getValue(0),h=this.p5.random(this.rotAngle-5,this.rotAngle+5);s>i&&s>t?this.heading+=0:s<i&&s<t?.5>this.p5.random(1)?this.heading+=h:this.heading-=h:i>t?this.heading+=-h:t>i&&(this.heading+=h)}getValue(t){let i=(this.x+this.sensorDist*this.p5.cos(this.heading+t))%this.p5.width,s=(this.y+this.p5.height+this.sensorDist*this.p5.sin(this.heading+t))%this.p5.height,h=this.p5.pixelDensity(),e=h*this.p5.floor(s)*4*(h*this.p5.width)+h*this.p5.floor(i)*4;return this.p5.pixels[e]}}new((t=e("7Pz0b"))&&t.__esModule?t.default:t)(t=>{let i=[];t.setup=()=>{var s=t.createCanvas(t.windowWidth,t.windowHeight-60);t.angleMode(t.DEGREES);for(let s=0;s<5e3;s++)i[s]=new n(t.random(.1*t.width,.9*t.width),t.random(.1*t.height,.9*t.height),t);s.style("display","block"),s.parent("sketch-holder")},t.windowResized=()=>{t.resizeCanvas(t.windowWidth,t.windowHeight-60)},t.draw=()=>{t.background(0,5),t.loadPixels();for(let t=0;t<5;t++){for(let t=0;t<5e3;t++)i[t].update();for(let t=0;t<5e3;t++)i[t].display()}}});
//# sourceMappingURL=index.ec652b33.js.map
