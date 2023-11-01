export default function useStore() {
  const set = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const get = (key: string) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const remove = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove
  }
}