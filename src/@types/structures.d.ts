export interface Participant {
	name: string;
	surname: string;
	email: string;
	phone: string;
	payed: boolean;
	workshops: Array<number>; //array of workshops' id
}

export interface Room {
	name: string;
}

export interface Speaker {
	name: string;
	surname: string;
	email: string;
	phone: string;
}

export interface Workshop {
	name: string;
	start: number; // hh:mm
	end: number; // hh:mm
	room: number; //room's id
	speaker: number; //speaker's id
}
