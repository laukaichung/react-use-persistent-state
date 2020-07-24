var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import localForage from "localforage";
const usePersistentState = (key, defaultValue) => {
    const [state, setState] = useState({
        hydrated: false,
        value: defaultValue,
    });
    const { hydrated, value } = state;
    function getFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storageValue = yield localForage.getItem(key);
                setState({ hydrated: true, value: storageValue || defaultValue });
            }
            catch (err) {
                console.error("usePersistentState", err);
                setState({ hydrated: true, value: defaultValue });
            }
        });
    }
    function syncToStorage(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            setState({ hydrated: true, value: newValue });
            yield localForage.setItem(key, newValue);
        });
    }
    useEffect(() => {
        getFromStorage();
    }, []);
    return [value, syncToStorage, hydrated];
};
export default usePersistentState;
//# sourceMappingURL=index.js.map