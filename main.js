class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(key,value) {
    let node = new Node(key, value);
    let currentNode;

    if(!this.head) {
      this.head = node;
      this.length++;
    } else {
      currentNode = this.head;
      
      while(currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }

      currentNode.nextNode = node;
      this.length++;
    }
  }

  changeValue(key,value) {
    let currentNode = this.head;
    
    while(currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
      }
      currentNode = currentNode.nextNode;
    }

  }

  findValue(key) {
    let currentNode = this.head;
    
    while(currentNode.key !== key) {
      currentNode = currentNode.nextNode;
    }
    
    return currentNode.value;
  }

  hasKey(key) {
    let currentNode = this.head;
    let containsKey = false;
    
    while(currentNode) {
      if (currentNode.key === key) {
        containsKey = true;
      }
      currentNode = currentNode.nextNode;
    }

    return containsKey;
  }

  removeNode(key) {
    if (this.head.key === key) {
      this.head = this.head.nextNode;
      return;
    }

    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      if (currentNode.key === key) {
        previousNode.nextNode = currentNode.nextNode;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
  }

  getKeys() {
    let currentNode = this.head;
    let keys = [];
    
    while(currentNode) {
      keys.push(currentNode.key);
      currentNode = currentNode.nextNode;
    }
    
    return keys;
  }

  getValues() {
    let currentNode = this.head;
    let values = [];
    
    while(currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
    
    return values;
  }

  getKeyValue() {
    let currentNode = this.head;
    let keyValue = [];
    
    while(currentNode) {
      keyValue.push(currentNode.key);
      keyValue.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
    
    return keyValue;
  }
}

class HashMap {
  constructor(initialSize = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialSize);
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  _hash(key, tableSize) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode + key.charCodeAt(i) * primeNumber) % tableSize;
    }
  
    return hashCode;
  }

  set(key, value) {
    let bucket = this._hash(key, this.buckets.length);

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[bucket]) {
      this.buckets[bucket] = new LinkedList();
    }

    if (this.buckets[bucket].hasKey(key)) {
      this.buckets[bucket].changeValue(key, value);
      return;
    }

    this.buckets[bucket].add(key, value);
    this.size++;

    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let bucket = this._hash(key, this.buckets.length);
    return this.buckets[bucket].findValue(key);
  }

  has(key) {
    let bucket = this._hash(key, this.buckets.length);
    return this.buckets[bucket].hasKey(key);
  }

  remove(key) {
    let bucket = this._hash(key, this.buckets.length);

    if (this.buckets[bucket].hasKey(key)) {
      this.buckets[bucket].removeNode(key);
    } else {
      return false;
    } 
  }

  length() {
    let allKeys = 0;
    this.buckets.forEach((bucket) => {
      allKeys += bucket.size();
    });
    return allKeys;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  keys() {
    let keysArray = [];
    this.buckets.forEach((bucket) => {
      keysArray.push(bucket.getKeys());
    });
    
    return keysArray.flat();
  }

  values() {
    let valuesArray = [];
    this.buckets.forEach((bucket) => {
      valuesArray.push(bucket.getValues());
    });
    
    return valuesArray.flat();
  }

  entries() {
    let entriesArray = [];
    this.buckets.forEach((bucket) => {
      let entry = bucket.getKeyValue();
      if (entry.length) {
        entriesArray.push(entry);
      }
      
    });
    
    return entriesArray;
  }

  resize() {
    const newBuckets = new Array(this.buckets.length * 2);
    const mapKeys = this.keys();
    const mapValues = this.values();
    
    for (let i = 0; i < mapKeys.length; i++) {
      let bucket = this._hash(mapKeys[i], newBuckets.length);
      if (!newBuckets[bucket]) {
        newBuckets[bucket] = new LinkedList();
      }
  
      if (newBuckets[bucket].hasKey(mapKeys[i])) {
        newBuckets[bucket].changeValue(mapKeys[i], mapValues[i]);
        return;
      }
  
      newBuckets[bucket].add(mapKeys[i], mapValues[i]);
    }

    this.buckets = newBuckets;
  }
}

let test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('moon', 'silver');