#!/usr/bin/env python3
"""a module that implement LRUCache"""
from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """
    a class that inherits BaseCaching and is a caching system
    """

    def __init__(self):
        """class initialization"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        a method that put add in cache
        """
        if not key or not item:
            return
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=False)
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last_key, _ = self.cache_data.popitem()
            print('DISCARD: {}'.format(last_key))

    def get(self, key):
        """ a method that get item by key"""
        if key is None or key not in self.cache_data.keys():
            return None
        self.cache_data.move_to_end(key, last=False)
        return self.cache_data[key]
