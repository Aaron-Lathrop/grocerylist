import { writable } from 'svelte/store'
import localStore from './localStore';
import { addGroceryItem, setGroceryItems } from '../services/db';

export const checkedForLogin = writable(false);
export const user = writable({});

export const alert = writable('');

const createGroceryStore = () => {
	const { subscribe, set, update } = localStore([]);
	return {
		subscribe,
		set,
		update
	};
};
export const groceryStore = createGroceryStore();

const createGroceryItems = (initial) => {
	const gItems = localStore('groceryItems', initial);
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
		updateDb: () => {
			update(val => {
				const localStorageValue = value() || [];
				if (JSON.stringify(localStorageValue) != JSON.stringify(val)) {
					setGroceryItems(userValue, localStorageValue);
				}
				return val;
			})
		}
	}
}
export const groceryItems = createGroceryItems([]);
