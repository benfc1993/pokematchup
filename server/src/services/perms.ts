export enum Types {
	N,
	F,
	W,
	Gra,
	E,
	I,
	Fi,
	Po,
	Gro,
	Fl,
	Ps,
	B,
	R,
	Gh,
	Dr,
	Da,
	S,
	Fai,
}

type Matchups = {
	[key: number]: {
		name: string;
		defence: Types[];
		weakness: Types[];
		offence: Types[];
		resistances: Types[];
	};
};

export const matchups: Matchups = {
	[Types.N]: {
		name: 'Normal',
		defence: [],
		weakness: [Types.Fi],
		offence: [],
		resistances: [Types.Gh],
	},
	[Types.F]: {
		name: 'Fire',
		defence: [Types.F, Types.Gra, Types.I, Types.B, Types.S, Types.Fai],
		weakness: [Types.W, Types.Gro, Types.R],
		offence: [Types.Gra, Types.I, Types.B, Types.S],
		resistances: [],
	},
	[Types.W]: {
		name: 'Water',
		defence: [Types.F, Types.W, Types.I, Types.S],
		weakness: [Types.Gra, Types.E],
		offence: [Types.F, Types.Gro, Types.R],
		resistances: [],
	},
	[Types.Gra]: {
		name: 'Grass',
		defence: [Types.W, Types.Gra, Types.E, Types.Gro],
		weakness: [Types.F, Types.I, Types.Po, Types.Fl, Types.B],
		offence: [Types.W, Types.Gro, Types.R],
		resistances: [],
	},
	[Types.E]: {
		name: 'Electric',
		defence: [Types.E, Types.S, Types.Fl],
		weakness: [Types.Gro],
		offence: [Types.W, Types.Fl],
		resistances: [],
	},
	[Types.I]: {
		name: 'Ice',
		defence: [Types.I],
		weakness: [Types.F, Types.Fi, Types.R, Types.S],
		offence: [Types.Gra, Types.Gro, Types.Fl, Types.Dr],
		resistances: [],
	},
	[Types.Fi]: {
		name: 'Fighting',
		defence: [Types.B, Types.R, Types.Da],
		weakness: [Types.Fl, Types.Ps, Types.Fai],
		offence: [Types.N, Types.I, Types.R, Types.Da, Types.S],
		resistances: [],
	},
	[Types.Po]: {
		name: 'Poison',
		defence: [Types.Gra, Types.Fi, Types.Po, Types.B, Types.Fai],
		weakness: [Types.Gro, Types.Ps],
		offence: [Types.Gra, Types.Fai],
		resistances: [],
	},
	[Types.Gro]: {
		name: 'Ground',
		defence: [Types.Po, Types.R],
		weakness: [Types.W, Types.Gra, Types.I],
		offence: [Types.F, Types.E, Types.Po, Types.R, Types.S],
		resistances: [Types.E],
	},
	[Types.Fl]: {
		name: 'Flying',
		defence: [Types.Gra, Types.Fi, Types.B],
		weakness: [Types.E, Types.I, Types.R],
		offence: [Types.Gra, Types.Fi, Types.B],
		resistances: [Types.Gro],
	},
	[Types.Ps]: {
		name: 'Psychic',
		defence: [Types.Fi, Types.Ps],
		weakness: [Types.B, Types.Gh, Types.Da],
		offence: [Types.Fi, Types.Po],
		resistances: [],
	},
	[Types.B]: {
		name: 'Bug',
		defence: [Types.Gra, Types.Fi, Types.Gro],
		weakness: [Types.F, Types.Fl, Types.R],
		offence: [Types.Gra, Types.Ps, Types.Da],
		resistances: [],
	},
	[Types.R]: {
		name: 'Rock',
		defence: [Types.N, Types.F, Types.Po, Types.Fl],
		weakness: [Types.W, Types.Gra, Types.Fi, Types.Gro, Types.S],
		offence: [Types.F, Types.I, Types.Fl, Types.B],
		resistances: [],
	},
	[Types.Gh]: {
		name: 'Ghost',
		defence: [Types.Po, Types.B],
		weakness: [Types.Gh, Types.Da],
		offence: [Types.Ps, Types.Gh],
		resistances: [Types.N, Types.Fi],
	},
	[Types.Dr]: {
		name: 'Dragon',
		defence: [Types.F, Types.W, Types.Gra, Types.E],
		weakness: [Types.I, Types.Dr, Types.Fai],
		offence: [Types.Dr],
		resistances: [],
	},
	[Types.Da]: {
		name: 'Dark',
		defence: [Types.Gh, Types.Da],
		weakness: [Types.Fi, Types.B, Types.Fai],
		offence: [Types.Ps, Types.Gh],
		resistances: [Types.Ps],
	},
	[Types.S]: {
		name: 'Steel',
		defence: [
			Types.N,
			Types.Gra,
			Types.I,
			Types.Fl,
			Types.Ps,
			Types.B,
			Types.R,
			Types.Dr,
			Types.S,
			Types.Fai,
		],
		weakness: [Types.F, Types.Fi, Types.Gro],
		offence: [Types.I, Types.R, Types.Fai],
		resistances: [Types.Po],
	},
	[Types.Fai]: {
		name: 'Fairy',
		defence: [Types.Fi, Types.B, Types.Da],
		weakness: [Types.Po, Types.S],
		offence: [Types.Fi, Types.Dr, Types.Da],
		resistances: [Types.Dr],
	},
};

const combinations = (arr: string[], min = 1, max: number) => {
	const combination = (arr: string[], depth: number): string[] => {
		if (depth === 1) {
			return arr;
		} else {
			const result = combination(arr, depth - 1).flatMap((val: string) =>
				arr.map((char: string) => {
					let res = val;
					if (!val.includes(char)) res = val + '-' + char;
					return res;
				})
			);
			return arr.concat(result);
		}
	};

	const valid = combination(arr, max).filter((val: string) => {
		const arr = val.split('-');
		return arr.length >= min && arr.length < max + 1;
	});

	let best: Types[] = [];
	let coverD: Set<string> = new Set();
	let coverO: Set<string> = new Set();

	for (const v of valid) {
		const types: Types[] = v.split('-').map((t) => parseInt(t));

		let currD = new Set<number>();
		let currO = new Set<number>();

		for (const t of types) {
			currD = new Set<number>([...currD, ...matchups[t].defence]);
			currO = new Set<number>([...currO, ...matchups[t].offence]);
		}

		if (currD.size >= coverD.size) {
			if (currO.size > coverO.size) {
				coverD = new Set(Array.from(currD).map((t) => matchups[t].name));
				coverO = new Set(Array.from(currO).map((t) => matchups[t].name));
				best = types;
			}
		}
	}

	const weaknesses: { [key: string]: string[] } = {};
	const defences: { [key: string]: string[] } = {};

	for (const t of best) {
		const name = matchups[t].name;
		weaknesses[name] = matchups[t].weakness.map((ty) => matchups[ty].name);
		defences[name] = matchups[t].defence.map((ty) => matchups[ty].name);
	}

	console.log(best.map((t) => matchups[t].name));
	// console.log(coverD)
	console.log({ weaknesses });
	console.log({ defences });
	// console.log(coverO)
};

//   const result = combinations(['1', '2','3','4','5','6','7','8','9', '10','11', '12', '13', '14', '15', '16', '17'], 6, 6);

const combos: Record<
	string,
	Partial<Record<string, { defence: string[]; weaknesses: string[] }>>
> = {};

const minimiseWeakness = async (type: Types) => {
	let best = 1000;
	let secondary: Partial<
		Record<string, { defence: string[]; weaknesses: string[] }>
	> = {};
	const primary = matchups[type];
	for (const [sType, data] of Object.entries(matchups)) {
		if (parseInt(sType) !== type) {
			const combination = new Set([...primary.weakness, ...data.weakness]);

			for (const def of data.defence) {
				combination.delete(def);
			}

			for (const def of primary.defence) {
				combination.delete(def);
			}

			if (combination.size < best) {
				secondary = {};
				best = combination.size;
			}

			if (combination.size <= best) {
				secondary[data.name] = {
					defence: Array.from(new Set([...primary.defence, ...data.defence])).map(
						(t) => matchups[t].name
					),
					weaknesses: Array.from(combination).map((t) => matchups[t].name),
				};
			}
			combos[primary.name] = secondary;
		}
	}
};
