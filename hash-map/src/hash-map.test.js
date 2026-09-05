import { HashMap } from "./hash-map";

const entries = [
  {
    key: "apple",
    value: "red",
  },
  {
    key: "banana",
    value: "yellow",
  },
  {
    key: "carrot",
    value: "orange",
  },
  {
    key: "dog",
    value: "brown",
  },
  {
    key: "elephant",
    value: "gray",
  },
  {
    key: "frog",
    value: "green",
  },
  {
    key: "grape",
    value: "purple",
  },
  {
    key: "hat",
    value: "black",
  },
  {
    key: "ice cream",
    value: "white",
  },
  {
    key: "jacket",
    value: "blue",
  },
  {
    key: "kite",
    value: "pink",
  },
  {
    key: "lion",
    value: "golden",
  },
];

describe("HashMap", () => {
  // Test Hash Map initialization
  it("should create a hash map with set capacity and load factor", () => {
    let map = HashMap();
    expect(map.capacity()).toBe(16);
    expect(map.loadFactor()).toBe(0.75);
    expect(map.length()).toBe(0);

    map = HashMap(24, 0.8);
    expect(map.capacity()).toBe(24);
    expect(map.loadFactor()).toBe(0.8);
    expect(map.length()).toBe(0);
  });

  // Test hash function
  it("should return the hash code for a given key", () => {
    const map = HashMap();
    expect(map.hash("apple")).toBe(10);
    expect(map.hash("The quick brown fox jumps over the lazy dog")).toBe(3);
    let longString = "";
    for (let i = 0; i < 1_000_000; i++) {
      longString.concat("orange_" + i, i);
    }
    expect(map.hash(longString)).toBe(0);
  });

  // Test set function
  it(".set(key, value), should add key, value pair to hash map or update value for key if already present", () => {
    const map = HashMap();
    entries.forEach(({ key, value }) => map.set(key, value));
    expect(map.length()).toBe(12);
    expect(map.capacity()).toBe(16);
    map.set("hat", "beige");
    expect(map.length()).toBe(12);
    expect(map.capacity()).toBe(16);

    // Test hash map expansion
    map.set("moon", "silver");
    expect(map.length()).toBe(13);
    expect(map.capacity()).toBe(32);
  });

  // Test get function
  it(".get(key), should return value of key, return null if key not found", () => {
    const map = HashMap();
    expect(map.get("orange")).toBe(null);
    entries.forEach(({ key, value }) => map.set(key, value));
    entries.forEach(({ key, value }) => {
      expect(map.get(key)).toBe(value);
    });
    expect(map.get("orange")).toBe(null);
  });

  // Test has function
  it(".has(key), should return true if hash map contains value, false otherwise ", () => {
    const map = HashMap();
    entries.forEach(({ key, value }) => map.set(key, value));
    entries.forEach(({ key }) => expect(map.has(key)).toBe(true));
    expect(map.has("orange")).toBe(false);
    map.set("hat", "beige");
    expect(map.has("hat")).toBe(true);
  });

  // Test remove function
  it(".remove(key), should delete key from hash map and return true if key is hash map", () => {
    const map = HashMap();
    entries.forEach(({ key, value }) => map.set(key, value));
    entries.forEach(({ key }) => {
      expect(map.remove(key)).toBe(true);
      expect(map.get(key)).toBe(null);
      expect(map.has(key)).toBe(false);
    });
    entries.forEach(({ key }) => {
      expect(map.remove(key)).toBe(false);
    });
  });

  // Test length function
  it(".length(), should return the number of keys in the hash map", () => {
    const map = HashMap();
    expect(map.length()).toBe(0);
    entries.forEach(({ key, value }) => map.set(key, value));
    let length = 12;
    entries.forEach(({ key }) => {
      expect(map.remove(key)).toBe(true);
      expect(map.length()).toBe(--length);
    });
  });

  // Test clear function
  it(".clear(), should remove all keys in hash map", () => {
    const map = HashMap();
    expect(map.length()).toBe(0);
    entries.forEach(({ key, value }) => map.set(key, value));
    expect(map.length()).toBe(12);
    map.clear();
    expect(map.has("apple")).toBe(false);
    expect(map.length()).toBe(0);
  });

  // Test keys function
  it(".keys(), should return an array of all keys in hash map", () => {
    const map = HashMap();
    const expected = entries.map(({ key }) => key);
    entries.forEach(({ key, value }) => map.set(key, value));
    const keys = map.keys();
    expect(expected.every((key) => keys.includes(key))).toBe(true);
    expect(keys.length).toBe(12);
  });

  // Test values function
  it(".values(), should return an array of all values in hash map", () => {
    const map = HashMap();
    const expected = entries.map(({ value }) => value);
    entries.forEach(({ key, value }) => map.set(key, value));
    const values = map.values();
    expect(expected.every((value) => values.includes(value))).toBe(true);
    expect(values.length).toBe(12);
  });

  // Test entries function
  it(".entries(), should return an array of all key, values pairs in hash map", () => {
    const map = HashMap();
    entries.forEach(({ key, value }) => map.set(key, value));
    const dict = map.entries();
    expect(
      entries.every((entry) => {
        if (
          dict.find(
            ({ key, value }) => key === entry.key && entry.value === value,
          )
        ) {
          return true;
        } else {
          return false;
        }
      }),
    ).toBe(true);
    expect(dict.length).toBe(12);
  });
});
