#!/usr/bin/env python3
"""a module that implement caching system"""
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """
    A class that inherits from parents and is a caching system
    """

    def __init__(self):
        """class initialization"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """a method that assign to cache"""
        if not key or not item:
            return None
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last_key, _ = self.cache_data.popitem(False)
            print('DISCARD: {}'.format(last_key))
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, False)

    def get(self, key):
        """ a method that get value using key"""
        if not key or key not in self.cache_data.keys():
            return None
        self.cache_data.move_to_end(key, last=False)
        return self.cache_data[key]
