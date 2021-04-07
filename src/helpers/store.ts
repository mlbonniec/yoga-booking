import localforage from 'localforage';

type Value<T> = { id: number } & T;

export default class Store {
	private store: LocalForage;
	
	constructor(name: string) {
		this.store = localforage.createInstance({ 
			name: 'booking',
			storeName: name
		});
	}
	
	private async autoIncrement(): Promise<number> {
		const old = await this.store.getItem<number>('AUTO_INCREMENT');
		if (!old)
			await this.store.setItem('AUTO_INCREMENT', 1);

		return await this.store.setItem<number>('AUTO_INCREMENT', old ? old + 1 : 1);
	}

	private applyFilter<T extends Record<string, any>>(value: T | any, filter: Partial<T> | any): boolean {
		const ok = Object.keys, tv = typeof value, tf = typeof filter;
		return value && filter && tv === 'object' && tv === tf ? (
			ok(filter).every(key => this.applyFilter<T>(value[key], filter[key]))
		) : ((tv === 'string' ? value.toLowerCase() : value) === (tf === 'string' ? filter.toLowerCase() : filter));
	}	

	public async getItems<T extends object>(filter?: Partial<T>): Promise<Value<T>[]> {		
		const items: Value<T>[] = [];
		await this.store.iterate((value: T, key: string, i: number) => {
			// Remove string keys
			if (!isNaN(parseInt(key, 10)))
				items.push({
					id: parseInt(key, 10),
					...value,
				});	
		});

		if (filter)
			return items.filter(e => this.applyFilter(e, filter));

		// Sort by key
		items.sort((a, b) => a.id - b.id);
			
		return items;
	}

	public async getItem<T extends object>(key: number | string): Promise<Value<T> | null> {
		if (typeof key === 'number')
			key = key.toString();

		const result = await this.store.getItem<T>(key);
		if (!result)
			return null;

		return {
			id: parseInt(key, 10),
			...result
		};
	}

	public async setItem<T extends object>(value: T): Promise<T> {
		if (value.hasOwnProperty('id'))
			throw new Error('\'id\' is a reserved keyword inside data.');
		
		const id = await this.autoIncrement();

		return await this.store.setItem<T>(id.toString(), value);
	}

	public removeItem(key: number | string): Promise<void> {
		if (typeof key === 'number')
			key = key.toString();

		return this.store.removeItem(key);
	}

	public clear(): Promise<void> {
		return this.store.clear();
	}

	public length(): Promise<number> {
		return this.store.length();
	}

	public key(key: number): Promise<string> {
		return this.store.key(key);
	}

	public keys(): Promise<string[]> {
		return this.store.keys();
	}
}
