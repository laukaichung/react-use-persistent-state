declare const usePersistentState: <T>(key: string, defaultValue: T) => [T, (newValue: T) => void, boolean];
export default usePersistentState;
