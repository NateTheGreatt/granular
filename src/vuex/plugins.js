import { APP_STORAGE_KEY, HISTORY_STORAGE_KEY } from './store'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
  	
  	// push last state into history
  	// var lastState = JSON.parse(localStorage.getItem(APP_STORAGE_KEY));
  	// if(lastState) {
		var historyArray = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));
		historyArray.push(state);
		localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArray));
	// }

	// persist current state to storage
    // localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state))
  })
}


export default [localStoragePlugin]