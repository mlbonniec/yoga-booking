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

	/**
	 * @private
	 * @description Applies a search filter, and returns the data corresponding to the filters.
	 */
	private applyFilter<T extends Record<string, any>>(value: T | any, filter: Partial<T> | any): boolean {
		const ok = Object.keys, tv = typeof value, tf = typeof filter;
		return value && filter && tv === 'object' && tv === tf ? (
			ok(filter).every(key => this.applyFilter<T>(value[key], filter[key]))
		) : ((tv === 'string' ? value.toLowerCase() : value) === (tf === 'string' ? filter.toLowerCase() : filter));
	}	

	/**
	 * @description Get items from a storage, with an optional object containing the search filters.
	 * @example <caption>Example without filter.</caption>
	 * const store = new Store('participants');
	 * await store.getItems(); // [{...}, {...}, {...}]
	 * @example <caption>Example using filters. Only participants who payed will be retrieved.</caption>
	 * const store = new Store('participants');
	 * await store.getItems({ payed: true }); // [{...}, {...}]
	 */
	public async getItems<T extends object>(filter?: Partial<T>): Promise<Value<T>[]> {		
		const items: Value<T>[] = [];
		await this.store.iterate((value: T, key: string) => {
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

	/**
	 * @description Get item from a storage with a given key.
	 * @example <caption>Get participant with id 2</caption>
	 * const store = new Store('participants');
	 * await store.getItem(2); // {...}
	 */
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

	/**
	 * @description Set an item to a storage.
	 * @example
	 * const store = new Store('participants');
	 * const data = { name: 'DOE', surname: 'John', ... }
	 * await store.setItem(data); // { name: 'DOE', surname: 'John', ... }
	 */
	public async setItem<T extends object>(value: T): Promise<T> {
		if (value.hasOwnProperty('id'))
			throw new Error('\'id\' is a reserved keyword inside data.');
		
		const id = await this.autoIncrement();

		return await this.store.setItem<T>(id.toString(), value);
	}

	/**
	 * @description Update an item in a storage.
	 * @example <caption>Update the data with id 2</caption>
	 * const store = new Store('participants');
	 * const data = { name: 'DOE', surname: 'John', ... }
	 * await store.updateItem(2, data); // { name: 'DOE', surname: 'John', ... }
	 */
	public async updateItem<T extends object>(id: number, value: T): Promise<T> {
		if (value.hasOwnProperty('id'))
			throw new Error('\'id\' is a reserved keyword inside data.');

		const item = await this.getItem(id);
		if (!item)
			throw new Error(`Item with id ${id} doesn't exists.`);

		const isValid = Object.keys(value).every(e => Object.keys(item).includes(e));
		if (!isValid)
			throw new Error('The values to be updated don\'t match the existing values.');

		return await this.store.setItem<T>(id.toString(), value);
	}

	/**
	 * @description Update an item in a storage.
	 * @example <caption>Remove the data with id 2</caption>
	 * const store = new Store('participants');
	 * await store.removeItem(2);
	 */
	public async removeItem(key: number | string): Promise<void> {
		if (typeof key === 'number')
			key = key.toString();

		return await this.store.removeItem(key);
	}

	/**
	 * @description Clear a storage.
	 * @example
	 * const store = new Store('participants');
	 * await store.clear();
	 */
	public async clear(): Promise<void> {
		return await this.store.clear();
	}

	/**
	 * @description Get the storage length
	 * @example
	 * const store = new Store('participants');
	 * await store.length(); // an integer
	 */
	public async length(): Promise<number> {
		// -1 to remove the AUTO_INCREMENT field
		return await this.store.length() - 1;
	}

	/**
	 * @description Get all keys in a storage
	 * @example
	 * const store = new Store('participants');
	 * await store.keys(); // ['...', '...']
	 */
	public async keys(): Promise<string[]> {
		return await this.store.keys();
	}
}
