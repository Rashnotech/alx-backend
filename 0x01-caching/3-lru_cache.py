#!/usr/bin/env python3
"""a module that implement LRUCache"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    a class that inherits BaseCaching and is a caching system
    """

    def __init__(self):
        """class initialization"""
        super().__init__()


    def put(self, key, item):
        """
        a method that put add in cache
        """
        if not key or not item:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            print('DISCARD: {}'.format())

    def get(self, key):
        """ a method that get item by key"""
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
