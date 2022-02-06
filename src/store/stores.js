import { writable } from 'svelte/store'
import localStore from './localStore';

export const alert = writable('');

export const groceryStore = localStore('groceryStore', {
	name: 'King Soopers',
	sections: [
		{ name: 'Aisle 3', items: ['bread', 'butter', 'jam', 'coffee']},
		{ name: 'Aisle 4', items: ['pizza', 'pie', 'ice cream']}
	]
});

const createGroceryItems = (initial) => {
	const { subscribe, set, update } = localStore('groceryItems', initial);
	return {
		subscribe,
		set,
		update,
		add: item => typeof item == 'string' && update(items => [...items, { name: item, gotIt: false }])
	}
}
export const groceryItems = createGroceryItems(
	['bread', 'pie', 'coffee', 'pizza'].map(i => ({ name: i, gotIt: false }))
);
