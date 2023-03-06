import { Constraint } from '../planegcs/bin/constraints';

// object id type
export type oid = number;

interface Id {
	id: oid;
}
interface IArc {
	start_id: oid;
	end_id: oid;
	start_angle: number;
	end_angle: number;
}

export interface SketchPoint extends Id {
	type: 'point';
	x: number;
	y: number;
	fixed: boolean;
}
export interface SketchLine extends Id {
	type: 'line';
	p1_id: oid;
	p2_id: oid;
}
export interface SketchCircle extends Id {
	type: 'circle';
	c_id: oid;
	radius: number;
}
export interface SketchArc extends Id, IArc {
	type: 'arc';
	c_id: oid;
	radius: number;
}

export interface SketchEllipse extends Id {
	type: 'ellipse';
	c_id: oid;
	focus1_id: oid;
	radmin: number;
}

export interface SketchArcOfEllipse extends Id, IArc {
	type: 'arc_of_ellipse';
	c_id: oid;
	focus1_id: oid;
	radmin: number;
}

export type SketchGeometry = SketchPoint | SketchLine | SketchCircle | SketchArc | SketchEllipse | SketchArcOfEllipse;
export type SketchObject = SketchGeometry | Constraint | SketchParam;

export interface SketchParam {
	type: 'param';
	name: string;
	// min_value: number|null;
	// max_value: number|null;
	value: number;
}

export function is_sketch_geometry(o: SketchObject): o is SketchGeometry {
	return ['point', 'line', 'circle', 'arc', 'ellipse', 'arc_of_ellipse'].includes(o.type);
}

// todo: add SketchHyperbola and SketchArcOfHyperbola
// export function get_radmaj(obj: SketchEllipse|SketchArcOfEllipse) {
// 	// compute the radmaj of ellipse
// 	const c = Math.sqrt((obj.center.x - obj.focus1.x) ** 2 + (center.y - focus1.y) ** 2);
// 	const a = Math.sqrt(c ** 2 + obj.radmin ** 2);
// }

// export function fix_angle(angle: number): number {
//     angle %= 2 * Math.PI;
//     if (angle < -1e-10) { // some comptation nuances for angles near 0
//         angle += 2 * Math.PI;
//     }
//     return angle;
// }