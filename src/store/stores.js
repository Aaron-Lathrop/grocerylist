import { writable } from 'svelte/store'
import localStore from './localStore';

export const alert = writable('');

export const groceryStore = localStore('groceryStore', {});

const createGroceryItems = (initial) => {
	const { subscribe, set, update } = localStore('groceryItems', initial);
	return {
		subscribe,
		set,
		update,
		add: item => {
			typeof item == 'string' && update(items => [...items, { name: item, gotIt: false }])
		},
		clear: () => set([]),
		remove: item => {
			update(items => items.filter(i => i.name.toLowerCase() != item.name.toLowerCase()))
		}
	}
}
export const groceryItems = createGroceryItems([]);
