# Name: X'avier Tejada
# OSU Email: tejadax@oregonstate.edu
# Course: CS261 - Data Structures
# Assignment: 6
# Due Date: 12/05/24
# Description: To implement an optimized HashMap class, using open addressing for collision resolution. By defining these methods within the HashMap class:
#  put(), resize_table(), table_load(), empty_buckets(), get(), contains_key(), remove(), get_keys_and_values(),
#  clear(), and __iter__(), __next__()

from a6_include import (DynamicArray, DynamicArrayException, HashEntry,
                        hash_function_1, hash_function_2)


class HashMap:
    def __init__(self, capacity: int, function) -> None:
        """
        Initialize new HashMap that uses
        quadratic probing for collision resolution
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        self._buckets = DynamicArray()

        # capacity must be a prime number
        self._capacity = self._next_prime(capacity)
        for _ in range(self._capacity):
            self._buckets.append(None)

        self._hash_function = function
        self._size = 0

    def __str__(self) -> str:
        """
        Override string method to provide more readable output
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        out = ''
        for i in range(self._buckets.length()):
            out += str(i) + ': ' + str(self._buckets[i]) + '\n'
        return out

    def _next_prime(self, capacity: int) -> int:
        """
        Increment from given number to find the closest prime number
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        if capacity % 2 == 0:
            capacity += 1

        while not self._is_prime(capacity):
            capacity += 2

        return capacity

    @staticmethod
    def _is_prime(capacity: int) -> bool:
        """
        Determine if given integer is a prime number and return boolean
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        if capacity == 2 or capacity == 3:
            return True

        if capacity == 1 or capacity % 2 == 0:
            return False

        factor = 3
        while factor ** 2 <= capacity:
            if capacity % factor == 0:
                return False
            factor += 2

        return True

    def get_size(self) -> int:
        """
        Return size of map
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        return self._size

    def get_capacity(self) -> int:
        """
        Return capacity of map
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        return self._capacity

    # ------------------------------------------------------------------ #

    def put(self, key: str, value: object) -> None:
        """
            Updates the key/value pair in the hash map.
            If the given key already exists in the hash map, its associated value must be replaced with the new value.
            If the given key is not in the hash map,a new key/value pair must be added.

            If the current load factor of the table is greater than or equal to 0.5,the table must be resized to double
            its current capacity.

            Parameters:
                key (str): The key paired with the value that is going to be added/updated.
                value (object): The value that is paired with the key.

            Returns:
                None
        """
        # Doubles the capacity if load factor is >= 0.5
        if self.table_load() >= 0.5:
            self.resize_table(self.get_capacity() * 2)

        # Calculates the hash value for the key
        hashVal = self._hash_function(key)
        index = hashVal % self.get_capacity()
        initialIndex = index

        i = 1
        # Quadratic probing to handle collisions
        while self._buckets[index] is not None and not self._buckets[index].is_tombstone:
            # replaces/updates key if it already exists
            if self._buckets[index].key == key:
                self._buckets[index].value = value
                return
            # increases index to try again if collision occurs
            index = (initialIndex + i ** 2) % self._capacity
            i += 1

        # creates a new key/value pair at the calculated index
        self._buckets[index] = HashEntry(key, value)
        self._size += 1

    def resize_table(self, new_capacity: int) -> None:
        """
            Changes the capacity of the underlying table

            If new_capacity is not less than the current number of elements in the hash map; the method does nothing

            If new_capacity is valid, make sure it is a prime number; if not, change it to the next
            highest prime number

            Parameters:
                new_capacity (int): new capacity of the hash map.

            Returns:
                None
        """

        # checks if the new capacity is greater than current size before resizing
        if new_capacity <= self._size:
            return

        # makes sure the new capacity is a prime number
        if self._is_prime(new_capacity) is False:
            new_capacity = self._next_prime(new_capacity)

        newBucket = DynamicArray()

        # create the new buckets with None as their value
        for j in range(new_capacity):
            newBucket.append(None)

        prevBucket = self._buckets
        self._buckets = newBucket
        self._capacity = new_capacity
        self._size = 0

        # rehashes and adds the previous table values to the new table
        for i in range(prevBucket.length()):
            if prevBucket[i] is not None and not prevBucket[i].is_tombstone:
                key = prevBucket[i].key
                value = prevBucket[i].value
                self.put(key, value)

    def table_load(self) -> float:
        """
        Calculates the current hash table load factor.

        Parameters: None

        Returns:
            float: current load factor
        """
        return float(self.get_size() / self.get_capacity())

    def empty_buckets(self) -> int:
        """
            Count the number of empty buckets in the hash table

            Parameters:
                None

            Returns:
                int: number of empty buckets in the hashmap.
        """
        empty = 0

        # counts every empty bucket, increments empty
        for i in range(self._buckets.length()):
            if self._buckets[i] is None:
                empty += 1
        return empty

    def get(self, key: str) -> object:
        """
             Gets the value associated with the given key

            Parameters:
                key (str): The key that is paired with value we are looking for

            Returns:
                object: The value paired with the key, or None if the key isn't found
        """

        hashVal = self._hash_function(key)

        index = hashVal % self.get_capacity()
        initialIndex = index

        i = 0
        # uses Quadratic probing to find the key and returns the value if it exists
        while self._buckets[index] is not None:
            if self._buckets[index].key == key and self._buckets[index] is not None and not self._buckets[
                index].is_tombstone:
                return self._buckets[index].value

            i += 1
            index = (initialIndex + i ** 2) % self.get_capacity()
        return None

    def contains_key(self, key: str) -> bool:
        """
            checks if the given key is in the hash map

            Parameters:
                key (str): The key that we are searching for.

            Returns:
                bool: True if the key exists in the hash map, False otherwise.
            """
        hashVal = self._hash_function(key)

        index = hashVal % self.get_capacity()
        initialIndex = index

        i = 0

        # uses Quadratic probing to find the key
        while self._buckets[index] is not None:
            if self._buckets[index].key == key and self._buckets[index] is not None and not self._buckets[
                index].is_tombstone:
                return True

            i += 1
            index = (initialIndex + i ** 2) % self.get_capacity()

        return False

    def remove(self, key: str) -> None:
        """
            removes the given key and its associated value from the hash map. If the key
            is not in the hash map, the method does nothing

            adds a tombstone to indicate a deletion occurred
            Parameters:
                key (str): The key that we want to remove from the hash map.

            Returns:
                None
        """
        hashFunction = self._hash_function(key)

        index = hashFunction % self.get_capacity()
        initialIndex = index

        i = 0

        # Use quadratic probing to find and remove the key
        while self._buckets[index] is not None:
            if self._buckets[index] is not None and self._buckets[index].key == key and not self._buckets[
                index].is_tombstone:
                # adds a tombstone to show an item was deleted
                self._buckets[index].is_tombstone = True
                self._size -= 1
                return

            i += 1
            index = (initialIndex + i ** 2) % self.get_capacity()

    def get_keys_and_values(self) -> DynamicArray:
        """
            creates a dynamic array where each index contains a tuple of a key/value pair
            stored in the hash map

            Parameters:
                None

            Returns:
                DynamicArray: An array of (key, value) tuples representing all entries in the hash map.
        """
        keyValues = DynamicArray()

        for i in range(self._capacity):
            if self._buckets[i] is not None and not self._buckets[i].is_tombstone:
                keyValues.append((self._buckets[i].key, self._buckets[i].value))

        return keyValues

    def clear(self) -> None:
        """
            Clears the contents of the hash map. It does not change the underlying hash
            table capacity.

            Parameters:
                None

            Returns:
                None
        """

        # empties all of the buckets in the hash map
        for i in range(self.get_capacity()):
            self._buckets[i] = None
        self._size = 0  # resets the size to 0

    def __iter__(self):
        """
             Enables the hash map to iterate across itself

             Parameters:
                 None

            Returns:
                (self): The current instance of the hash map.
        """
        self._index = 0
        return self

    def __next__(self):
        """
            Obtains the next item in the hash map, based on the current location of the
            iterator

            If there are no more active items, it raises StopIteration.

            Parameters:
                None

            Returns:
                (self): The next key-value item in the hash map.
        """
        # iterate only over active items
        while self._index < self.get_capacity():
            value = self._buckets[self._index]
            # if the value is not none or a tombstone, go to the next item and return the value
            if value is not None and not value.is_tombstone:
                self._index += 1
                return value

            # go to the next item if it is not active
            self._index += 1

        # ends the loop, when there are no more active items
        raise StopIteration


# ------------------- BASIC TESTING ---------------------------------------- #

if __name__ == "__main__":

    print("\nPDF - put example 1")
    print("-------------------")
    m = HashMap(53, hash_function_1)
    for i in range(150):
        m.put('str' + str(i), i * 100)
        if i % 25 == 24:
            print(m.empty_buckets(), round(m.table_load(), 2), m.get_size(), m.get_capacity())

    print("\nPDF - put example 2")
    print("-------------------")
    m = HashMap(41, hash_function_2)
    for i in range(50):
        m.put('str' + str(i // 3), i * 100)
        if i % 10 == 9:
            print(m.empty_buckets(), round(m.table_load(), 2), m.get_size(), m.get_capacity())

    print("\nPDF - resize example 1")
    print("----------------------")
    m = HashMap(20, hash_function_1)
    m.put('key1', 10)
    print(m.get_size(), m.get_capacity(), m.get('key1'), m.contains_key('key1'))
    m.resize_table(30)
    print(m.get_size(), m.get_capacity(), m.get('key1'), m.contains_key('key1'))

    print("\nPDF - resize example 2")
    print("----------------------")
    m = HashMap(75, hash_function_2)
    keys = [i for i in range(25, 1000, 13)]
    for key in keys:
        m.put(str(key), key * 42)
    print(m.get_size(), m.get_capacity())

    for capacity in range(111, 1000, 117):
        m.resize_table(capacity)

        if m.table_load() > 0.5:
            print(f"Check that the load factor is acceptable after the call to resize_table().\n"
                  f"Your load factor is {round(m.table_load(), 2)} and should be less than or equal to 0.5")

        m.put('some key', 'some value')
        result = m.contains_key('some key')
        m.remove('some key')

        for key in keys:
            # all inserted keys must be present
            result &= m.contains_key(str(key))
            # NOT inserted keys must be absent
            result &= not m.contains_key(str(key + 1))
        print(capacity, result, m.get_size(), m.get_capacity(), round(m.table_load(), 2))

    print("\nPDF - table_load example 1")
    print("--------------------------")
    m = HashMap(101, hash_function_1)
    print(round(m.table_load(), 2))
    m.put('key1', 10)
    print(round(m.table_load(), 2))
    m.put('key2', 20)
    print(round(m.table_load(), 2))
    m.put('key1', 30)
    print(round(m.table_load(), 2))

    print("\nPDF - table_load example 2")
    print("--------------------------")
    m = HashMap(53, hash_function_1)
    for i in range(50):
        m.put('key' + str(i), i * 100)
        if i % 10 == 0:
            print(round(m.table_load(), 2), m.get_size(), m.get_capacity())

    print("\nPDF - empty_buckets example 1")
    print("-----------------------------")
    m = HashMap(101, hash_function_1)
    print(m.empty_buckets(), m.get_size(), m.get_capacity())
    m.put('key1', 10)
    print(m.empty_buckets(), m.get_size(), m.get_capacity())
    m.put('key2', 20)
    print(m.empty_buckets(), m.get_size(), m.get_capacity())
    m.put('key1', 30)
    print(m.empty_buckets(), m.get_size(), m.get_capacity())
    m.put('key4', 40)
    print(m.empty_buckets(), m.get_size(), m.get_capacity())

    print("\nPDF - empty_buckets example 2")
    print("-----------------------------")
    m = HashMap(53, hash_function_1)
    for i in range(150):
        m.put('key' + str(i), i * 100)
        if i % 30 == 0:
            print(m.empty_buckets(), m.get_size(), m.get_capacity())

    print("\nPDF - get example 1")
    print("-------------------")
    m = HashMap(31, hash_function_1)
    print(m.get('key'))
    m.put('key1', 10)
    print(m.get('key1'))

    print("\nPDF - get example 2")
    print("-------------------")
    m = HashMap(151, hash_function_2)
    for i in range(200, 300, 7):
        m.put(str(i), i * 10)
    print(m.get_size(), m.get_capacity())
    for i in range(200, 300, 21):
        print(i, m.get(str(i)), m.get(str(i)) == i * 10)
        print(i + 1, m.get(str(i + 1)), m.get(str(i + 1)) == (i + 1) * 10)

    print("\nPDF - contains_key example 1")
    print("----------------------------")
    m = HashMap(11, hash_function_1)
    print(m.contains_key('key1'))
    m.put('key1', 10)
    m.put('key2', 20)
    m.put('key3', 30)
    print(m.contains_key('key1'))
    print(m.contains_key('key4'))
    print(m.contains_key('key2'))
    print(m.contains_key('key3'))
    m.remove('key3')
    print(m.contains_key('key3'))

    print("\nPDF - contains_key example 2")
    print("----------------------------")
    m = HashMap(79, hash_function_2)
    keys = [i for i in range(1, 1000, 20)]
    for key in keys:
        m.put(str(key), key * 42)
    print(m.get_size(), m.get_capacity())
    result = True
    for key in keys:
        # all inserted keys must be present
        result &= m.contains_key(str(key))
        # NOT inserted keys must be absent
        result &= not m.contains_key(str(key + 1))
    print(result)

    print("\nPDF - remove example 1")
    print("----------------------")
    m = HashMap(53, hash_function_1)
    print(m.get('key1'))
    m.put('key1', 10)
    print(m.get('key1'))
    m.remove('key1')
    print(m.get('key1'))
    m.remove('key4')

    print("\nPDF - get_keys_and_values example 1")
    print("------------------------")
    m = HashMap(11, hash_function_2)
    for i in range(1, 6):
        m.put(str(i), str(i * 10))
    print(m.get_keys_and_values())

    m.resize_table(2)
    print(m.get_keys_and_values())

    m.put('20', '200')
    m.remove('1')
    m.resize_table(12)
    print(m.get_keys_and_values())

    print("\nPDF - clear example 1")
    print("---------------------")
    m = HashMap(101, hash_function_1)
    print(m.get_size(), m.get_capacity())
    m.put('key1', 10)
    m.put('key2', 20)
    m.put('key1', 30)
    print(m.get_size(), m.get_capacity())
    m.clear()
    print(m.get_size(), m.get_capacity())

    print("\nPDF - clear example 2")
    print("---------------------")
    m = HashMap(53, hash_function_1)
    print(m.get_size(), m.get_capacity())
    m.put('key1', 10)
    print(m.get_size(), m.get_capacity())
    m.put('key2', 20)
    print(m.get_size(), m.get_capacity())
    m.resize_table(100)
    print(m.get_size(), m.get_capacity())
    m.clear()
    print(m.get_size(), m.get_capacity())

    print("\nPDF - __iter__(), __next__() example 1")
    print("---------------------")
    m = HashMap(10, hash_function_1)
    for i in range(5):
        m.put(str(i), str(i * 10))
    print(m)
    for item in m:
        print('K:', item.key, 'V:', item.value)

    print("\nPDF - __iter__(), __next__() example 2")
    print("---------------------")
    m = HashMap(10, hash_function_2)
    for i in range(5):
        m.put(str(i), str(i * 24))
    m.remove('0')
    m.remove('4')
    print(m)
    for item in m:
        print('K:', item.key, 'V:', item.value)
