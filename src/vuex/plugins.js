import { STORAGE_KEY } from './store'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
  	console.log(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  })
}

export default [localStoragePlugin]