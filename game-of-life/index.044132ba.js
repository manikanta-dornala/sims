var i=globalThis,e={},r={},t=i.parcelRequire5b7a;null==t&&((t=function(i){if(i in e)return e[i].exports;if(i in r){var t=r[i];delete r[i];var s={id:i,exports:{}};return e[i]=s,t.call(s.exports,s,s.exports),s.exports}var a=Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(i,e){r[i]=e},i.parcelRequire5b7a=t),t.register;var s=t("7Pz0b");class a{constructor(){this.gridXSize=300,this.gridYSize=300,this.cells=[];for(var i=0;i<this.gridXSize;i++){for(var e=[0],r=0;r<this.gridYSize;r++)e.push(0);this.cells.push(e)}this.randomizeWorld()}randomizeWorld(){for(var i=0;i<this.gridXSize;i++)for(var e=0;e<this.gridYSize;e++)this.cells[i][e]=0,.1>Math.random()&&(this.cells[i][e]=1)}retrieveLiveNeighbors(i,e){for(var r=0,t=-1;t<2;t++)for(var s=-1;s<2;s++){if(0==t&&0==s)continue;let a=(this.gridXSize+i+t)%this.gridXSize,o=(this.gridYSize+e+s)%this.gridYSize;r+=this.cells[a][o]}return r}simulateLife(){for(var i=JSON.parse(JSON.stringify(this.cells)),e=0;e<this.gridXSize;e++)for(var r=0;r<this.gridYSize;r++){var t=this.retrieveLiveNeighbors(e,r);1==this.cells[e][r]?(t<2&&(i[e][r]=0),(2==t||3==t)&&(i[e][r]=1),t>3&&(i[e][r]=0)):3==t&&(i[e][r]=1)}this.cells=JSON.parse(JSON.stringify(i))}}new(s&&s.__esModule?s.default:s)(i=>{let e=new a;i.setup=()=>{var e=i.createCanvas(.9*i.windowWidth,.9*i.windowHeight);e.mouseOver(()=>{}),e.mouseOut(()=>{}),e.style("display","block"),e.parent("sketch-holder")},i.windowResized=()=>{i.resizeCanvas(.7*i.windowWidth,.9*i.windowHeight)},i.draw=()=>{i.background(0,0,0),function(e){e.cells;let r=i.max(i.width/e.gridXSize,1),t=i.max(i.height/e.gridYSize,1);for(var s=0;s<e.gridXSize;s++)for(var a=0;a<e.gridYSize;a++)if(1==e.cells[s][a]){let o=e.retrieveLiveNeighbors(s,a);i.fill(100*o*Math.random(),100*o*Math.random(),100*o*Math.random()),i.strokeWeight(0),i.rect(s*r,a*t,r,t)}}(e),i.frameCount%2==0&&e.simulateLife()}});
//# sourceMappingURL=index.044132ba.js.map
