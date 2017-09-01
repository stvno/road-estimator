let vega = require('vega');
let graphs = [
	{spec:'../data/spec.json',dom:"view"},
	{spec:'../data/poproad.json',dom:"poproad"},
	{spec:'../data/mweg_pop.json',dom:"mWegPpop"},
  {spec:'../data/mbox_vs_cia.json',dom:"mboxVsCia"},
  {spec:'../data/mweg_popdens.json',dom:"mWegPpopDens"},
  {spec:'../data/world.json',dom:"world"}


];

let loader = vega.loader();
let el = document.getElementById('maingraphs');
graphs.forEach(graph => {
  let div = document.createElement('div');
  div.className = 'graph';
  div.id = graph.dom;
  el.appendChild(div);
	loader.load(graph.spec).then(function(response) {
		new vega.View(vega.parse(JSON.parse(response)))
		  .renderer('canvas')  // set renderer (canvas or svg)
		  .initialize('#'+graph.dom) // initialize view within parent DOM container
		  .hover()             // enable hover encode set processing
		  .run();       
	}).catch(function(error) {
	  	console.log(error)
	});
})