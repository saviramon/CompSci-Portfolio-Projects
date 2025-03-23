def seconds_to_date_conversion(num_sec):
    """This function takes in an integer value that represents
    the number of seconds since the epoch: January 1st, 1970.
    """
    secondsDay = 60 * 60 * 24
    # Days in a month
    # [Jan, Feb, Mar, Apr, May, Jun, Jul, Sep, Aug, Oct, Nov, Dec]
    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    year = 1970
    month = 1
    day = 1
    # Calculates how many years are in the total amount of seconds
    while num_sec >= secondsDay * 365:
        if isLeapYear(year):
            secondsYear = secondsDay * 366
        else:
            secondsYear = secondsDay * 365
        num_sec -= secondsYear
        year += 1
    # Calculates the month with the remaining seconds
    while num_sec >= secondsDay:
        daysOfMonth = daysInMonth[month - 1]
        if isLeapYear(year) and month == 2:
            daysOfMonth += 1
        if num_sec >= daysOfMonth * secondsDay:
            num_sec -= daysOfMonth * secondsDay
            month += 1
            if month > 12:
                month = 1
        else:
            break
    # Remaining seconds are used to calculate only full days
    day = (num_sec // secondsDay) + 1
    return month, day, year


def isLeapYear(year):
    """This function returns True if a year is a leap year
    and False if it is not, by checking if a given year is
    divisible by 4 and not a 100, or when it is a century
    year that it is divisible by 400.
    """
    return ((year % 4 == 0 and year % 100 != 0) or (year % 400 == 0))


def my_datetime(num_sec):
    """This function returns the month, day, and year
    calculated by seconds_to_date_conversion as a string
    in a mm-dd-yyyy format.
    """
    month, date, year = seconds_to_date_conversion(num_sec)
    return f"{month:02}-{date:02}-{year}"


def conv_num(num_str):
    """This function takes in a string and converts it into
    a base 10 number, and returns it.
    """
    # Checks if num_str is empty or is not a string
    if num_str == "" or not isinstance(num_str, str):
        return None
    elif (valid_hexadecimal(num_str) and valid_prefix(num_str)):
        result = conv_hex_to_num(num_str)
    elif (valid_string_numbers):
        result = conv_str_to_num(num_str)
    return result


def isDecimal(string):
    """This function checks if a string contains a decimal."""
    return "." in string


def decimal_count(string):
    """This function counts how many decimals are in a string."""
    decimal_count = 0
    for num in string:
        if num == ".":
            decimal_count += 1
    return decimal_count


def valid_string_numbers(string):
    """This functions returns True or False if a string
    only contains numbers, while accounting for decimals
    and negatives.
    """
    for num in string:
        if num == "." or num == "-":
            continue
        elif num not in "0123456789":
            return False
        else:
            continue
    return True


def isNegative(string):
    """This function returns true if the string has a negative."""
    return string[0] == "-"


def conv_str_to_num(string):
    """This function converts a string of numbers to an integer."""
    number = 0
    decimalPlaces = 0
    # Makes sure that a str ending with a decimal is a float
    if valid_string_numbers(string):
        if string[-1] == '.':
            string += "0"
        # Checks for invalid decimal (more than 1 decimal is invalid)
        if decimal_count(string) > 1:
            return None
        # Processes the str into a int and ignores decimals and
        # negative signs
        for num in string:
            if num == "." or num == "-":
                continue
            # Subtracts the ASCII character decimal value to calculate
            # the integer value, and then muliplies the current number by
            # base of 10 to add the decimal value at the end.
            number = number * 10 + (ord(num) - ord('0'))

            if isDecimal(string):
                decimalPlaces += 1
        # Divides number by the 10^(decimalPlaces) to make number into
        # into a decimal.
        if decimalPlaces > 0:
            number /= 10 ** decimalPlaces

        if isNegative(string):
            number *= -1

        return number


def valid_prefix(string):
    """This function returns True if prefix is 0x (case-insensitive)."""
    string = string.lower()
    if string[0] == '-':
        string = string[1:]
    return string[:2] == "0x"


def valid_hexadecimal(string):
    """This function returns True if the hexadecimal values are valid."""
    string = string.lower()
    if string[0] == '-':
        string = string[1:]
    for hex in string[2:]:
        if hex not in "0123456789abcdef":
            return False
        else:
            continue
    return True


def conv_hex_to_num(string):
    """This function converts a hexadecimal string into a decimal
    integer.
    """
    hexString = string.lower()
    validHex = "0123456789abcdef"
    # Removes negative from hexString
    if isNegative(hexString):
        hexString = hexString[1:]

    if valid_prefix(hexString) and valid_hexadecimal(hexString):
        power = len(hexString) - 3  # calculates the power accounting for "0x"
        number = 0
        for hex in hexString[2:]:
            # Uses the index of validHex as the chosen Hexidecimal value
            for i in range(len(validHex)):
                if validHex[i] == hex:
                    value = i
                    continue
            # Calculates the integer number from hexadecimal
            number += value * (16 ** power)
            power -= 1  # Decrements the power as we iterate through the string
        if isNegative(string):
            number *= -1
        return number


def conv_endian(num, endian='big'):
    """ This function converts an integer value to a hexidecimal
    value and returns it.
    """
    converted_num = ""

    if endian == "big" or endian == "little":

        if num < 0:
            converted_num = "-"
            num *= -1

        binary_num = convert_to_binary(num)

        hex_num = convert_to_hex(binary_num)

        # There is no conversion to big endian because convert_to_hex
        # returns big endian by default.
        if endian == "little":

            hex_num = convert_to_little_endian(hex_num)

        converted_num = converted_num + hex_num
        # converted_num = converted_num + convert_to_endian(hex_num)

        return converted_num

    # Set so that if there is any value but big or little for endian
    # type, None will be returned.
    else:
        return None


def convert_to_binary(dec_value):
    """A function that recieves a base 10 value and returns its
    form in binary.
    """

    bin_value = ""
    remaining_value = dec_value
    counter_value = 0
    base_two_val = 0
    doubling_value = 0

    # This loop exists to get to the highest base two value while
    # still remaining below the dec_value so the next loop can
    # start by subtracting that value.
    while 2 ** counter_value <= remaining_value:
        counter_value += 1

    # Base_two_val was used to set subtractor_val because in the
    # loop below the while conditional was being altered inside
    # the loop.
    base_two_val = 2 ** (counter_value - 1)
    counter_value = 1
    subtractor_val = base_two_val

    # Doubling value is used as a placeholder to count the binary
    # locations until it reaches the value of base_two_val
    while base_two_val >= doubling_value:

        if remaining_value >= subtractor_val:
            remaining_value -= subtractor_val
            bin_value = bin_value + "1"
        else:
            bin_value = bin_value + "0"

        subtractor_val = subtractor_val/2
        doubling_value = 2 ** counter_value
        counter_value += 1

    return bin_value


def return_single_hex_num(bin_string):
    """A function that recieves a binary string and returns the
    corresponding hexadecimal equivalent.
    """

    hex_values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                  "A", "B", "C", "D", "E", "F"]
    hex_number = 0
    hex_result = 0

    if bin_string[0] == "1":
        hex_number += 8

    if bin_string[1] == "1":
        hex_number += 4

    if bin_string[2] == "1":
        hex_number += 2

    if bin_string[3] == "1":
        hex_number += 1

    hex_result = hex_values[hex_number]

    return hex_result


def convert_to_hex(bin_value):
    """A function that recieves a binary string and converts it
    to a hexidecimal and returns that value as as string.
    """

    hex_value = ""
    loop_counter = 0
    space_counter = 0

    bin_value = add_padding(bin_value)

    while loop_counter < len(bin_value):
        hex_index = 0
        hex_string = ""

        if space_counter < 2:

            # A loop that creates a string of four bits
            while hex_index < 4 and loop_counter < len(bin_value):
                hex_string = hex_string + bin_value[loop_counter]
                loop_counter += 1
                hex_index += 1

            hex_value = hex_value + return_single_hex_num(hex_string)
            space_counter += 1

        else:
            hex_value = hex_value + " "
            space_counter = 0

    return hex_value


def convert_to_little_endian(hex_value):
    """A function that reverses the endian order of a function to
    little endian.
    """

    # I used two seperate variables here because I felt it made
    # the resulting boolean comparisons more readable.
    little_endian_string = ""
    hex_index = 0
    loop_adjustment = 1

    while hex_index < len(hex_value):
        if hex_value[len(hex_value) - loop_adjustment] != " ":

            # This variable is named second hex because when converted
            # the little endian keeps the Byte order. Because this loop
            # works from back to front we need to keep this value in
            # the second slot.
            second_hex = hex_value[len(hex_value) - loop_adjustment]
            loop_adjustment += 1

            # This part of loop adds the first hex character.
            # Because the loop moves from back to front we need
            # this to be added first, but the second_hex value
            # to be read and stored first.
            first_hex = hex_value[len(hex_value) - loop_adjustment]
            little_endian_string = little_endian_string + first_hex

            # On this part, loop_adjustment is increased by 1 because
            # it was increased earlier. Both it and hex_index need
            # increased by 2 to handle the 2 characters.
            little_endian_string = little_endian_string + second_hex
            loop_adjustment += 1
            hex_index += 2

        else:

            # Used to add the space between bytes.
            little_endian_string = little_endian_string + " "
            hex_index += 1
            loop_adjustment += 1

    return little_endian_string


def add_padding(bin_value):
    """A function that will add 0 padding to numbers that
    are passed to it so that it is an evenly divided by 4.
    """

    padded_bin_value = bin_value
    added = 8 - (len(bin_value) % 8)

    while added > 0 and added != 8:
        padded_bin_value = "0" + padded_bin_value
        added -= 1

    return padded_bin_value
