const PERIODIC_TABLE = new Object();
const BOND_TABLE = new Object();
class Element
{
	constructor(
		name = "Carbon", 
		atomic_number = 6, 
		valence_electrons = 4,
		electronegativity = 2.55,
		radius = 7.5*3,
		density = 2.2,
		color = "green")
	{
		this.name = name;
		this.atomic_number = atomic_number;
		this.valence_electrons = valence_electrons;
		this.electronegativity = electronegativity;
		this.radius = radius;
		this.density = density;
		this.color = color;
	}
}

class Atom
{
	constructor(
		element = "Carbon", 
		position_vector = {x : 0, y : 0, z : 0},
		velocity_vector = {x : 0, y : 0, z : 0},
		charge = 0,
		Temperature = 60)
	{
		this.element = PERIODIC_TABLE[element];
		this.position = position_vector;
		this.velocity = velocity_vector;
		this.acceleration = {x : 0, y: 0, z : 0};
		this.force = {x : 0, y : 0, z : 0};
		this.temperature = Temperature;
		this.charge = charge;
	}

	Draw()
	{
		push();
		fill(this.element.color);
		translate(this.position.x, this.position.y);
		stroke(this.element.color);
		sphere(this.element.radius);
		pop();
	}
}

/*  
Molecules.push(new Molecule({atom : new Atom("Carbon"), bonds:
	[ 
		{angle : 0, atom : new Atom("Hydrogen")},
		{ angle : 90, atom : new Atom("Hydrogen")}, 
		{ angle : 180, atom : new Atom("Hydrogen")}, 
		{ angle : 270, atom : new Atom("Hydrogen")}
] }));
*/
class Molecule
{
	constructor(molecule_json, angle = {x : 0, y : 0, z : 0}, angular_velocity = {x : 0, y : 0, z : 0})
	{
		this.molecule = molecule_json
		this.angle = angle;
		this.angular_velocity = {x : 0, y : 0, z : 0};
		this.angular_acceleration = {x : 0, y : 0, z : 0};
	}
	Update(dt)
	{
		var temperature = 0;
		for(var i = 0; i < this.molecule.bonds.length; i++)
		{
			temperature += this.molecule.bonds[i].atom.temperature;
		}
		this.angle.x += this.angular_velocity.x * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.0003;
		this.angle.y += this.angular_velocity.y * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.0003;
		this.angle.z += this.angular_velocity.z * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.0003;
		this.angular_velocity.x += this.angular_acceleration.x * dt;
		this.angular_velocity.y += this.angular_acceleration.y * dt;
		this.angular_velocity.z += this.angular_acceleration.z * dt;
		
		this.molecule.atom.position.x += this.molecule.atom.velocity.x * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.003;
		this.molecule.atom.position.y += this.molecule.atom.velocity.y * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.003;
		this.molecule.atom.position.z += this.molecule.atom.velocity.z * dt + (Math.random() > 0.5 ? 1 : -1) * Math.random() * temperature * 0.003;
		this.molecule.atom.velocity.x += this.molecule.atom.acceleration.x * dt;
		this.molecule.atom.velocity.y += this.molecule.atom.acceleration.y * dt;
		this.molecule.atom.velocity.z += this.molecule.atom.acceleration.z * dt;


	}
	Draw()
	{
		push();

		fill(this.molecule.atom.element.color);
		translate(this.molecule.atom.position.x, this.molecule.atom.position.y, this.molecule.atom.position.z);
		stroke(this.molecule.atom.element.color);
		sphere(this.molecule.atom.element.radius);

		rotateX(this.angle.x);
		rotateY(this.angle.y);
		rotateZ(this.angle.z);
		for(var i = 0; i < this.molecule.bonds.length; i++)
		{
			push();
			var bond_var = this.molecule.bonds[i]
			var atom_position = {
				x: BOND_TABLE[this.molecule.atom.element.name + "-" + bond_var.atom.element.name] * 100 * Math.cos(bond_var.angle * (Math.PI/180)), 
				y: BOND_TABLE[this.molecule.atom.element.name + "-" + bond_var.atom.element.name] * 100 * Math.sin(bond_var.angle * (Math.PI/180)),
				z: this.molecule.atom.position.z
			};
			translate(
				atom_position.x, 
				(atom_position.y), 
				0
			);
			strokeWeight(1)
			fill(bond_var.atom.element.color);
			stroke(bond_var.atom.element.color);
			sphere(bond_var.atom.element.radius);
			strokeWeight(10);
			stroke(255);
			
			line(
				0, 0, 0, 
				-atom_position.x, -atom_position.y, 0);
			
			
			pop();
		}
		pop();
	}
}

PERIODIC_TABLE["Carbon"] = new Element();
PERIODIC_TABLE["Oxygen"] = new Element("Oxygen", 8, 6, 3.44, 6.4*3, 0.001308, "blue");
PERIODIC_TABLE["Hydrogen"] = new Element("Hydrogen", 1, 1, 2.2, 3.2*3, 0.000082, "red");
BOND_TABLE["Carbon-Hydrogen"] = 0.109*3;
BOND_TABLE["Carbon-Oxygen"] = 0.109*3;
