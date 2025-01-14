class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}


class LRUCache {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity should be +Ve");
        }
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if(this.cache.has(key)) {
            const node = this.cache.get(key);
            this._remove(node);
            this._addToFront(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        if(this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this._remove(node);
            this._addToFront(node);
        } else {
            if(this.cache.size >= this.capacity) {
                const lru = this.tail.prev;
                this._remove(lru);
                this.cache.delete(lru.key);
            }
            const newNode = new Node(key, value);
            this.cache.set(key, newNode);
            this._addToFront(newNode);
        }
    }

}
