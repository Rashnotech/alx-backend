#!/usr/bin/env python3
"""a class that cache systems"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    BasicCache class that inherits from BaseCaching and
    is a caching system.
    """

    def put(self, key, item):
        """Assigns to the dictionary self.cache_data the
        item value for the key
        """
        if not key or not item:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        A method that return the value in self.cache_data linked to key.
        Returns:
            None if the key doesn't exist in self.cache_data otherwise
        """
        if not key or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
