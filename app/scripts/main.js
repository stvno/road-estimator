let vega = require('vega');
let graphs = [
	
	{spec:'./data/cia-pop-road.json'},
  {spec:'./data/osm-pop-road.json'},
	{spec:'./data/cia-mroad-pop.json'},
  {spec:'./data/osm-mroad-pop.json'},
  {spec:'./data/cia-mroad-pop-vs-popdens.json'},
  {spec:'./data/osm-mroad-pop-vs-popdens.json'},
  {spec:'./data/cia-mroad-size.json'},
  {spec:'./data/osm-mroad-size.json'},  
  {spec:'./data/cia-mroad-popdens.json'},
  {spec:'./data/osm-mroad-popdens.json'},
  {spec:'./data/cia-osm-mroad-pop.json'},
  {spec:'./data/size-roads.json'},  
  {spec:'./data/world.json'},
{spec:'./data/mbox_vs_cia.json'}

];

let loader = vega.loader();
let el = document.getElementById('maingraphs');
graphs.forEach((graph,i) => {
  let div = document.createElement('div');
  let id = 'graph'+i;  
  div.className = 'graph';
  div.id = id;
  el.appendChild(div);
	loader.load(graph.spec).then(function(response) {
		new vega.View(vega.parse(JSON.parse(response)))
		  .renderer('canvas')  // set renderer (canvas or svg)
		  .initialize('#'+id) // initialize view within parent DOM container
		  .hover()             // enable hover encode set processing
		  .run();       
	}).catch(function(error) {
	  	console.log(error)
	});
})