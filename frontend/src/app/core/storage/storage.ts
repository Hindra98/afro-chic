/**
 * Add that key to the given Storage object, or update that key's value if it already exists
 * @param key string containing the name of the key you want to create/update.
 * @param value string containing the value you want to give the key you are creating/updating.
 */
export function setStorage(key: string, value:string) {
    localStorage.setItem(key, value);
}

/**
 * Return that key's value, or null if the key does not exist, in the given Storage object.
 * !!! The keyName is removed after get
 * @param key  Key name of the key you want to retrieve the value of
 * @param clearable Boolean to indicate whether to remove item after get, default: false
 * @return string containing the value of the key. If the key does not exist, null is returned
 */
export function getStorage<TItem>(key: string, clearable = false) : TItem {
    const dataStorage = localStorage.getItem(key);

    if (dataStorage !== null && clearable) {
        localStorage.removeItem(key)
    }

    return dataStorage as TItem;
}
