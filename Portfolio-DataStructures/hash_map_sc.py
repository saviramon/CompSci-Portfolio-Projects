# Name: X'avier Tejada
# OSU Email: tejadax@oregonstate.edu
# Course: CS261 - Data Structures
# Assignment: 6
# Due Date: 12/05/24
# Description: To implement an optimized in the HashMap class, using chaining for collision resolution. By defining these methods within the HashMap class:
#  put(), resize_table(), table_load(), empty_buckets(), get(), contains_key(), remove(), get_keys_and_values(),
#  clear(), and find_mode()


from a6_include import (DynamicArray, LinkedList,
                        hash_function_1, hash_function_2)


class HashMap:
    def __init__(self,
                 capacity: int = 11,
                 function: callable = hash_function_1) -> None:
        """
        Initialize new HashMap that uses
        separate chaining for collision resolution
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        self._buckets = DynamicArray()

        # capacity must be a prime number
        self._capacity = self._next_prime(capacity)
        for _ in range(self._capacity):
            self._buckets.append(LinkedList())

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
        Increment from given number and the find the closest prime number
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
            updates the key/value pair in the hash map

            If the current load factor of the table is greater than or equal to 1.0, the table must be resized
            to double its current capacity

            Parameters:
                key (str): The key to be inserted/updated in the hash map.
                value (object): The value that is paired with the key.

            Returns:
                None
        """

        # resizes the table to 2x the capacity, if the load factor >= 1
        if self.table_load() >= 1.0:
            self.resize_table(self.get_capacity() * 2)

        # calculates the hash value for the key
        hashVal = self._hash_function(key)

        # calculates the initial index
        initialIndex = hashVal % self.get_capacity()

        # gets the bucket at the initial index
        bucket = self._buckets[initialIndex]

        # checks if bucket already has the key
        node = bucket.contains(key)

        if node:
            # updates key if it already exists
            node.value = value
        else:
            # creates a new key and value, and increases the size if it doesn't exist
            bucket.insert(key, value)
            self._size += 1

    def resize_table(self, new_capacity: int) -> None:
        """
            Changes the capacity of the underlying table

            If the new_capacity is not less than 1; the method does nothing

            If new_capacity is 1 or more, make sure it is a prime number. If not, change it to the next
            highest prime number

            Parameters:
                new_capacity (int): new capacity for the hash table.

            Returns:
                None
        """

        if new_capacity < 1:
            return

        if not self._is_prime(new_capacity):
            new_capacity = self._next_prime(new_capacity)

        # saves the old buckets before resizing
        prevBuckets = self._buckets

        # creates a new array of linkedlists with the new capacity
        self._buckets = DynamicArray()
        for i in range(new_capacity):
            self._buckets.append(LinkedList())

        self._capacity = new_capacity  # updates capacity
        self._size = 0

        # rehashes and inserts the keys and values from the previous table to the new updated table
        for i in range(prevBuckets.length()):
            bucket = prevBuckets[i]
            node = bucket._head
            # iterate through all the nodes and add them to the new table
            while node is not None:
                self.put(node.key, node.value)
                node = node.next

    def table_load(self) -> float:
        """
            Calculate the load factor of the hash map.

            Parameters:
                None

            Returns:
                float: current hash table load factor.
        """
        return float(self.get_size() / self.get_capacity())  # calculate load factor

    def empty_buckets(self) -> int:
        """
            gets the number of empty buckets in the hash table

            Parameters:
                None

            Returns:
                int: number of empty buckets.
        """
        # count of empty buckets
        empty = 0

        for i in range(self._buckets.length()):
            bucket = self._buckets[i]
            # If the bucket is empty add one to empty
            if bucket.length() == 0:
                empty += 1

        return empty

    def get(self, key: str):
        """
            gets the value that is paired with the key

            Parameters:
                key (str): The key that we want to get from the hash map.

            Returns:
                object: The value that is paired with the key, or None if the key doesn't exist.
        """

        # calculate the initial index for the key
        hashVal = self._hash_function(key)
        initialIndex = hashVal % self.get_capacity()

        bucket = self._buckets[initialIndex]

        # check if the bucket has the key
        node = bucket.contains(key)

        # if it exists return the nodes value, otherwise return none
        if node:
            return node.value
        else:
            return None

    def contains_key(self, key: str) -> bool:
        """
            Check if the key is contained in the hash map.

            Parameters:
                key (str): The key we want to check that the hash map contains.

            Returns:
                bool: True if the hash map contains the key, otherwise False.
        """

        # calculate the initial index for the key
        hashVal = self._hash_function(key)
        initialIndex = hashVal % self.get_capacity()

        bucket = self._buckets[initialIndex]

        # returns if the bucket has the specified key or not
        if bucket.contains(key):
            return True
        else:
            return False

    def remove(self, key: str) -> None:
        """
             removes the given key and its associated value from the hash map. If the key
             is not in the hash map, the method does nothing

            Parameters:
                key (str): The key we want to remove from the hash map.

            Returns:
                None
        """

        # calculate the initial index for the key
        hash_value = self._hash_function(key)
        index = hash_value % self.get_capacity()

        bucket = self._buckets[index]

        # remove the key from the bucket and decrease size by 1
        if bucket.remove(key):
            self._size -= 1

    def get_keys_and_values(self) -> DynamicArray:
        """
            Gets the key/value pairs stored in the hash map.

            Parameters:
                None

            Returns:
                DynamicArray: An array of key/value pairs at each index.
        """
        keyVals = DynamicArray()

        # iterate through all of the buckets
        for i in range(self.get_capacity()):
            bucket = self._buckets[i]

            # iterate through all of the nodes in the bucket and add the key and value tuples to keyVals
            for node in bucket:
                keyVals.append((node.key, node.value))

        return keyVals

    def clear(self) -> None:
        """
            Clears the contents of the hash map.

            Parameters:
                None

            Returns:
                None
        """

        # reset the size to 0
        self._size = 0

        # iterate to each bucket and replace them with empty linkedlists
        for i in range(self.get_capacity()):
            self._buckets[i] = LinkedList()


def find_mode(da: DynamicArray) -> tuple[DynamicArray, int]:
    """
        Find the mode in the given DynamicArray.

        Parameters:
            da (DynamicArray): A dynamic array with the elements we want the mode from.

        Returns:
            tuple: DynamicArray of the modes, and the frequency of the mode.
    """

    # dictionary that stores the value as the key and the frequency as the value
    freqDict = {}

    # counts the frequency of all of the elements in da
    for i in range(da.length()):
        value = da[i]
        if value in freqDict:
            freqDict[value] += 1  # increment the frequency
        else:
            freqDict[value] = 1  # add one if it is a new value

    # highest frequency
    maxFreq = max(freqDict.values())

    # array that will have the modes
    modesDa = DynamicArray()

    # matches the keys in freqDict that have the same value(frequency) as the max frequency and adds them to modesDa
    for key, freq in freqDict.items():
        if freq == maxFreq:
            modesDa.append(key)

    return modesDa, maxFreq


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
    keys = [i for i in range(1, 1000, 13)]
    for key in keys:
        m.put(str(key), key * 42)
    print(m.get_size(), m.get_capacity())

    for capacity in range(111, 1000, 117):
        m.resize_table(capacity)

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
    m = HashMap(53, hash_function_1)
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

    m.put('20', '200')
    m.remove('1')
    m.resize_table(2)
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

    print("\nPDF - find_mode example 1")
    print("-----------------------------")
    da = DynamicArray(["apple", "apple", "grape", "melon", "peach"])
    mode, frequency = find_mode(da)
    print(f"Input: {da}\nMode : {mode}, Frequency: {frequency}")

    print("\nPDF - find_mode example 2")
    print("-----------------------------")
    test_cases = (
        ["Arch", "Manjaro", "Manjaro", "Mint", "Mint", "Mint", "Ubuntu", "Ubuntu", "Ubuntu"],
        ["one", "two", "three", "four", "five"],
        ["2", "4", "2", "6", "8", "4", "1", "3", "4", "5", "7", "3", "3", "2"]
    )

    for case in test_cases:
        da = DynamicArray(case)
        mode, frequency = find_mode(da)
        print(f"Input: {da}\nMode : {mode}, Frequency: {frequency}\n")
