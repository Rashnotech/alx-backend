#!/usr/bin/env python3
"""a module that implement fifo"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    A class the inherits from BaseCaching
    """

    def __init__(self):
        """an initialization method"""
        super().__init__()

    def put(self, key, item):
        """ a method that put key and item to cache"""
        if not key or not item:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key = next(iter(self.cache_data))
            del self.cache_data[first_key]
            print('DISCARD: {}'.format(first_key))

    def get(self, key):
        """
        A method that get the element in cache
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
