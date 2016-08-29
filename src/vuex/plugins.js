import { STORAGE_KEY } from './store'

const localStoragePlugin = store => {
  store.subscribe((mutation, { navTree }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(navTree))
  })
}

export default [localStoragePlugin]