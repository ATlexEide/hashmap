import { LinkedList } from "./linkedList.js";
import { Node } from "./linkedList.js";
class HashMap {
  constructor(size = 16, loadFactor = 0.75) {
    this.size = size;
    this.loadFactor = loadFactor;
    this.currentSize = 0;
    this.buckets = {};
    this.init = () => {
      for (let i = 0; i < this.size; i++) {
        this.buckets[i] = new LinkedList();
      }
    };
    this.init();
    this.noKeyError = "Error: No Key (Key does not exist)";
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.size;
    }
    // BUG RETURN HASHCODE WHEN DONE TESTING
    return hashCode;
  }
  set(key, value) {
    if (key === "") throw this.noKeyError;
    const hash = this.hash(key);
    this.buckets[hash].append(new Node(key, value));
    this.currentSize++;
  }
  get(key) {
    key = this.hash(key);
    if (key in this.buckets) return this.buckets[key].value;
    else throw this.noKeyError;
  }
  has(key) {
    key = this.hash(key);
    if (key in this.buckets) return true;
    else return false;
  }
  remove(key) {
    key = this.hash(key);
    if (key in this.buckets) {
      delete this.buckets[key];
      this.currentSize--;
    } else throw this.noKeyError;
  }
  get length() {
    return this.currentSize;
  }
  clear() {
    this.buckets = {};
    this.currentSize = 0;
  }
  get keys() {
    let keyArray = [];
    // TODO: make compatible with linked list if head got a tail
    for (const bucket in this.buckets) {
      const currBucket = this.buckets[bucket];
      if (currBucket.head && !currBucket.next.next) {
        keyArray.push(currBucket.head.key);
      } else {
        while (currBucket.next !== null) {
          keyArray.push(currBucket.next.key);
          currBucket.next = currBucket.next.next;
        }
      }
    }
    return keyArray;
  }
  // TODO: make compatible with linked list if head got a tail
  get values() {
    let valueArray = [];
    for (const bucket in this.buckets) {
      const currBucket = this.buckets[bucket];
      if (currBucket.head && currBucket.tail !== null) {
        valueArray.push(currBucket.head.value);
      }
    }
    return valueArray;
  }
  // TODO: make compatible with linked list if head got a tail
  get entries() {
    let entryArray = [];
    for (const bucket in this.buckets) {
      const currBucket = this.buckets[bucket];
      if (currBucket.head && currBucket.tail !== null) {
        entryArray.push([currBucket.head.key, currBucket.head.value]);
      }
    }
    return entryArray;
  }
}
const testMap = new HashMap();

testMap.set("Alex", "yippeeeee");
testMap.set("Hector", "yipp");
testMap.set("Carla", "yipp");
testMap.set("Carlos", "yipp");

console.table(testMap.buckets);
console.log("control:");
console.log(testMap.keys);
