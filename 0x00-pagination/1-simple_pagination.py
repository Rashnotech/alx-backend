#!/usr/bin/env python3
"""a module that handles pagination"""
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """
    a function that take two integer argument
    Args:
        page: start point
        page_size: no of page to display
    Return:
        a tuple that contain the start index and end index
    """
    return ((page - 1) * page_size, page * page_size)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        a method that get pages
        """
        assert isinstance(page_size, int), "page_size must be an integer"
        assert isinstance(page, int), "page must be an integer"
        assert page > 0, "page must be greater than 0"
        assert page_size > 0, "page_size should be greater than 0"
        startIndex, endIndex = index_range(page, page_size)
        return self.dataset()[startIndex: endIndex]
