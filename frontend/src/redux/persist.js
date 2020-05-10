// https://www.youtube.com/watch?v=o_Ni4Cqh4XA

export function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('TodoTones_state', serializedState)
  } catch(e) {
    console.log('localStorage save error: ', e)
  }
}

export function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('TodoTones_state')
    if (serializedState === null) return false // originally undefined
    return JSON.parse(serializedState)
  } catch(e) {
    console.log('localStorage load error: ', e)
    return undefined
  }
}