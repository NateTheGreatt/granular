import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins'

Vue.use(Vuex);

export const APP_STORAGE_KEY = 'nest-app';
export const HISTORY_STORAGE_KEY = APP_STORAGE_KEY+'-history';

function rndId() {
	var chars = "abcdefghijklmnopqrstuvwxyz";
	chars += chars.toUpperCase() + "0123456789";
	var id = '';
	for(var i=0;i<9;i++) id+=chars[Math.round(Math.random()*(chars.length-1))];
	return id;
}


var nests = [
	{
		id: rndId(),
		name: 'nest 0',
		text: 'i am the root-level nest',
		parent: null,
		children: [],
		scoped: true
	}
];


var history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));

if(!history) {
	history = [{
		scope: nests[0].id,
		nests: nests
	}];
	localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

const state = history[history.length-1];

// initialize history if it doesn't exist
// if(!history) localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));

// initialize history with current state
// localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([state]));

const mutations = {
	ADD (state, parentId) {
		var newNest = {
			id: rndId(),
			name: 'new nest',
			text: 'desc',
			parent: parentId,
			children: [],
			scoped: false
		};

		var parentNest = state.nests.find(n=>n.id==parentId);
		parentNest.children.push(newNest.id);

		state.nests.push(newNest);
	},
	REMOVE (state, nestId) {
		// remove from parent's children array
		var nest = state.nests.find(n=>n.id==nestId);
		var parent = state.nests.find(n=>n.id==nest.parent);
		parent.children = parent.children.filter(id=>id!=nest.id);
		
		state.nests = state.nests.filter(n=> n.id!=nestId);
	},
	MOVE (state, nestId, newParentId) {
		// remove id from old parent's children array
		var nest = state.nests.find(n=>n.id==nestId);
		var oldParent = state.nests.find(n=>n.id==nest.parent);
		oldParent.children = oldParent.children.filter(id=>id!=nest.id);

		// add to new parent's children array
		var newParent = state.nests.find(n=>n.id==newParentId);
		newParent.children.push(nest.id);

		// set the new parent on the child
		nest.parent = newParent.id;
	},
	EDIT_NAME (state, nestId, name) {
		state.nests.find(n=>n.id==nestId).name = name;
	},
	EDIT_TEXT (state, nest, text) {
		state.nests.find(n=>n.id==nestId).text = text;
	},
	EMBED (state, nestId) {
		var nest = state.nests.find(n=>n.id==nestId);

		var newParentNest = {
			id: rndId(),
			name: 'new nest',
			text: 'desc',
			parent: nest.parent,
			children: [nest.id],
			scoped: nest.scoped
		};

		nest.parent = newParentNest.id;

		if(nest.scoped) nest.scoped = false;

		state.nests.push(newParentNest);
	},
	SCOPE_TO (state, nestId) {
		state.scope = nestId;
	}
}

export default new Vuex.Store({
	state,
	mutations,
	plugins
})