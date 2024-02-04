#!/usr/bin/env python3
"""a module that handles pagination"""


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
