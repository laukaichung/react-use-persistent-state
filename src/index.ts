import { useEffect, useState } from "react";
import localForage from "localforage";

const usePersistentState = <T>(
    key: string,
    defaultValue: T
): [T, (newValue: T) => void, boolean] => {
    const [state, setState] = useState({
        hydrated: false,
        value: defaultValue,
    });
    const { hydrated, value } = state;

    async function getFromStorage() {
        try {
            const storageValue = await localForage.getItem<T>(key);
            setState({ hydrated: true, value: storageValue || defaultValue });
        } catch (err) {
            console.error("usePersistentState", err);
            setState({ hydrated: true, value: defaultValue });
        }
    }

    async function syncToStorage(newValue: T) {
        setState({ hydrated: true, value: newValue });
        await localForage.setItem(key, newValue);
    }

    useEffect(() => {
        getFromStorage();
    }, []);

    return [value, syncToStorage, hydrated];
};

export default usePersistentState;