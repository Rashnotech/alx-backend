#!/usr/bin/env python3
"""a module that inherits BaseCaching and caching system LIFO"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    A class
    """
    def __init__(self):
        """class initialization"""
        super().__init__()


    def put(self, key, item):
        """
        a method that put item to the cache
        Args:
            key: dictionary key
            item: value of the dictionary
        """
        if not key or not item:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last_key, _ = self.cache_data.popitem()
            print('DISCARD: {}'.format(last_key))

    def get(self, key):
        """a method that get a key"""
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
