let e=new class{constructor(){this.MaxIterations=50}},t=[];!function(a,n,s,i=.01){let o=document.getElementById(a);o&&(o.type="range",o.id=a,o.className="slider",o.value=e[a],o.min=n,o.max=s,o.step=i.toString(),o.addEventListener("mouseup",(function(){window.frames[0].params[a]=parseFloat(o.value)})),t.push(o))}("MaxIterations",0,4*e.MaxIterations);
//# sourceMappingURL=index.42805b3f.js.map
