var Atoms = new Array();
var Molecules = new Array();

Molecules.push(new Molecule({atom : new Atom("Carbon"), bonds:

	[ 
		{angle : 0, atom : new Atom("Hydrogen")},
		{ angle : 90, atom : new Atom("Hydrogen")}, 
		{ angle : 180, atom : new Atom("Hydrogen")}, 
		{ angle : 270, atom : new Atom("Hydrogen")}
] }));

Molecules.push(new Molecule({atom : new Atom("Carbon", {x: 90, y: -50, z: 6}), bonds:

	[ 
		{angle : 0, atom : new Atom("Hydrogen")},
		{ angle : 90, atom : new Atom("Hydrogen")}, 
		{ angle : 180, atom : new Atom("Hydrogen")}, 
		{ angle : 270, atom : new Atom("Hydrogen")}
] }));

var rotation = 0.00001;
function setup()
{
	createCanvas(700, 700, WEBGL);
}
function draw()
{
	background(0);
	for(var i = 0; i < Atoms.length; i++){
		Atoms[i].Draw();
	}
	for(var i = 0; i < Molecules.length; i++){
		Molecules[i].Draw();
	}
}

function clock()
{
	rotation+= 0.1;
	for(var i = 0; i < Molecules.length; i++){
		Molecules[i].Update(0.01);
	}
}
setInterval(clock, 10);