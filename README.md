A react hook that stores your states to `LocalStorage`. It uses the `localforage` module to get and set the value.

Example:
````
const TestComponent = () => {
  const defaultValue = 1;
  const [value, setValue, hydrated] = usePersistentState(
    "storageKey",
    defaultValue
  );
  return <div onClick={() => setValue(value + 1)}>{value}</div>;
};
````

The `hydrated` variable is to check whether the hook has retrieved the stored value from `LocalStorage` on initial mount. 
