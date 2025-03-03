class TimeLimitedCache {
    constructor() {
        this.store = new Map();
    }

    /** 
     * @param {number} key
     * @param {number} value
     * @param {number} duration time until expiration in ms
     * @return {boolean} if un-expired key already existed
     */
    set(key, value, duration) {
        const currentTime = Date.now();
        const isKeyExist = this.store.has(key);

        // Clear the previous timeout if the key exists
        if (isKeyExist) {
            clearTimeout(this.store.get(key).timeout);
        }

        // Set a timeout to remove the key after the duration
        const timeout = setTimeout(() => {
            this.store.delete(key);
        }, duration);

        // Store the key with value, timeout reference, and expiration timestamp
        this.store.set(key, { value, expiresAt: currentTime + duration, timeout });

        return isKeyExist;
    }

    /** 
     * @param {number} key
     * @return {number} value associated with key
     */
    get(key) {
        const currentTime = Date.now();

        if (this.store.has(key)) {
            const entry = this.store.get(key);

            // Check if the key is still valid
            if (currentTime < entry.expiresAt) {
                return entry.value;
            } else {
                // Key has expired; remove it
                clearTimeout(entry.timeout);
                this.store.delete(key);
            }
        }

        return -1;
    }

    /** 
     * @return {number} count of non-expired keys
     */
    count() {
        const currentTime = Date.now();
        let validKeys = 0;

        for (const [key, entry] of this.store.entries()) {
            if (currentTime < entry.expiresAt) {
                validKeys++;
            } else {
                // Remove expired key
                clearTimeout(entry.timeout);
                this.store.delete(key);
            }
        }

        return validKeys;
    }
}
