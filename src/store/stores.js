import { writable } from 'svelte/store'
import localStore from './localStore';
import { setGroceryItems, setGroceryStores } from '../services/db';

export const checkedForLogin = writable(false);
export const user = writable({});

export const alert = writable('');

const updateDb = (userValue, localStorageValue, dbUpdater) => {
	const lsv = localStorageValue || [];
	dbUpdater(userValue, lsv);
};

const syncWithDb = (dbUpdater, userValue, set, localStoreValue, dbValue) => {
	const localIsMoreRecent = localStoreValue.some((lsv, index) => {
		const dbData = dbValue[index] || { timestamp: 0 };
		return lsv.timestamp > dbData.timestamp;
	});
	const dbIsMoreRecent = dbValue.some((dbv, index) => {
		const lsv = localStoreValue[index] || { timestamp: 0 };
		return dbv.timestamp > lsv.timestamp;
	});
	if (localIsMoreRecent) {
		updateDb(userValue, localStoreValue, dbUpdater);
	} else if (dbIsMoreRecent) {
		set(dbValue);
	}
}

const createGroceryStore = (inital) => {
	const { subscribe, set, update, value } = localStore('grocery-stores', inital);
	let userValue;
	user.subscribe(val => userValue = val);

	return {
		subscribe,
		set,
		update,
		syncWithDb: (dbValue) => {
			syncWithDb(setGroceryStores, userValue, set, value(), dbValue);
		}
	};
};
export const groceryStore = createGroceryStore([]);

const createGroceryItems = (initial) => {
	const gItems = localStore('grocery-items', initial);
	const { subscribe, set, update, value } = gItems;
	let userValue;
	user.subscribe(val => userValue = val);

	return {
		subscribe,
		set,
		update,
		add: item => {
			if (typeof item != 'string') return;
			update(items => {
				const itemToAdd = { name: item, gotIt: false };
				return [...items, itemToAdd];
			});
		},
		clear: () => {
			set([]);
		},
		remove: item => {
			update(items => {
				return items.filter(i => i.name.toLowerCase() != item.name.toLowerCase());
			});
		},
		syncWithDb: (dbValue) => {
			syncWithDb(setGroceryItems, userValue, set, value(), dbValue);
		}
	}
}
export const groceryItems = createGroceryItems([]);
