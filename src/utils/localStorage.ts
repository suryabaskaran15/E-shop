export enum StorageKeys {
    CART_ITEMS = "cart_items",
    ORDERS = "orders"
}

export const saveToLocalStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to local storage:", error);
    }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error("Error reading from local storage:", error);
        return defaultValue;
    }
};

export const removeFromLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from local storage:", error);
    }
};
