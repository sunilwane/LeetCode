var TimeLimitedCache = function () {
  this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const keyExists = this.cache.get(key);
  clearTimeout(keyExists?.timeoutId);

  const timeoutId = setTimeout(() => {
    this.cache.delete(key)
  }, duration);
  this.cache.set(key, { value, timeoutId });

  return keyExists ? true : false;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  const limited = this.cache.get(key);
  return limited ? limited.value : -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let count = 0;

  this.cache.forEach((obj) => {
    count++;
  });

  return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */