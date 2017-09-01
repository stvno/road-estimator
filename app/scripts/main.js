let vega = require('vega');
let graphs = [
	{spec:'../data/spec.json',dom:"#view"},
	{spec:'../data/poproad.json',dom:"#poproad"},
	{spec:'../data/mweg_pop.json',dom:"#mWegPpop"},
	{spec:'../data/mweg_popdens.json',dom:"#mWegPpopDens"}


];

require('google-client-api')().then( function( gapi ) {
      gapi.load('client:auth2', initClient);
});
let loader = vega.loader();
let authorizeButton = document.getElementById('authorize-button');


function parseData(d) {
	let values = d.map(r => {return {"country":r[0],"continent":r[1],"development": +(r[2]),"population":+(r[3]),"roads":+(r[4]),"size":+(r[5])}});
	graphs.map(g=>{createGraph(values,g)});
}

var CLIENT_ID = '1063090516387-155ajo36shn7guc2v565ejlcc1u8m9i3.apps.googleusercontent.com',
  DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());    
     authorizeButton.onclick = handleAuthClick;
  });
}

function updateSigninStatus(isSignedIn) {  
  if (isSignedIn) {
    getData();
  }
  else {
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function getData() {
  gapi.client.sheets.spreadsheets.values.batchGet({
    spreadsheetId: '1gcMAc-ewe2e_GpI8usPpmebMyAVYZRZIRaVuChy1Tr0',
    ranges: ['Data!A2:F']
  }).then(function(response) {
    parseData(response.result.valueRanges[0].values)    
  })
}   


function createGraph(values,graph) {
	let spec = graph.spec;
	let dom = graph.dom;
	loader.load(spec).then(function(response) {
		let config = JSON.parse(response);
		config.data[0].values = values;	
  		new vega.View(vega.parse(config))
		  .renderer('canvas')  // set renderer (canvas or svg)
		  .initialize(dom) // initialize view within parent DOM container
		  .hover()             // enable hover encode set processing
		  .run();       
	}).catch(function(error) {
	  	console.log(error)
	});
}