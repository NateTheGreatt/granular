export const scopeTo = makeAction('SCOPE_TO')
export const add = makeAction('ADD')
export const remove = makeAction('REMOVE')
export const move = makeAction('MOVE')
export const embed = makeAction('EMBED')

function makeAction(type) {
	return ({dispatch}, ...args) => dispatch(type, ...args)
}