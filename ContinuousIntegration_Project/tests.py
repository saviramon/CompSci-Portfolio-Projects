import unittest
import task


class TestCase(unittest.TestCase):

    def testDate_isLeapYear(self):
        input = 2024
        self.assertTrue(task.isLeapYear(input))

    def testDate_isLeapYear2(self):
        input = 3000
        self.assertFalse(task.isLeapYear(input))

    def testDate_isLeapYear3(self):
        test_result = False
        self.assertEqual(task.isLeapYear(2035), test_result)

    def testDate_Year(self):
        numSec = 123456789
        expectedYear = 1973
        month, day, year = task.seconds_to_date_conversion(numSec)
        self.assertEqual(year, expectedYear)

    def testDate_Month(self):
        numSec = 123456789
        expected = 11
        month, day, year = task.seconds_to_date_conversion(numSec)
        self.assertEqual(month, expected)

    def testDate_Day(self):
        numSec = 123456789
        expected = 29
        month, day, year = task.seconds_to_date_conversion(numSec)
        self.assertEqual(day, expected)

    def testDate_String(self):
        numSec = 123456789
        expectedDate = "11-29-1973"
        self.assertEqual(task.my_datetime(numSec), expectedDate)

    def testDate_String2(self):
        numSec = 0
        expectedDate = "01-01-1970"
        self.assertEqual(task.my_datetime(numSec), expectedDate)

    def testDate_String3(self):
        numSec = 9876543210
        expectedDate = "12-22-2282"
        self.assertEqual(task.my_datetime(numSec), expectedDate)

    def testDate_String4(self):
        numSec = 201653971200
        expectedDate = "02-29-8360"
        self.assertEqual(task.my_datetime(numSec), expectedDate)

    def testDate_String5(self):
        test_seconds = 864000
        test_result = "01-11-1970"
        self.assertEqual(task.my_datetime(test_seconds), test_result)

    def testDate_String6(self):
        test_seconds = 2592000
        test_result = "01-31-1970"
        self.assertEqual(task.my_datetime(test_seconds), test_result)

    def testConvNum_toString(self):
        string = '12345'
        expected = 12345
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_negative(self):
        string = "-12345"
        expected = -12345
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_decimal(self):
        string = ".45"
        expected = 0.45
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_typeFloat(self):
        string = "123."
        expected = 123.0
        self.assertIsInstance(task.conv_str_to_num(string), type(expected))

    def testConvNum_toString_typeInt(self):
        string = "123"
        expected = 123
        self.assertIsInstance(task.conv_str_to_num(string), type(expected))

    def testConvNum_toString_multi_decimals_invalid(self):
        string = "12.3.45"
        expected = None
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_letters_invalid(self):
        string = "12345A"
        expected = None
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_hex_to_num(self):
        string = "0xAD4"
        expected = 2772
        self.assertEqual(task.conv_hex_to_num(string), expected)

    def testConvNum_hex_to_num2(self):
        string = "0Xad4"
        expected = 2772
        self.assertEqual(task.conv_hex_to_num(string), expected)

    def testConvNum_hex_to_num_negative(self):
        string = "-0xAD4"
        expected = -2772
        self.assertEqual(task.conv_hex_to_num(string), expected)

    def testConvNum_hex_to_num_invalid(self):
        string = "-0xAZ4"
        expected = None
        self.assertEqual(task.conv_hex_to_num(string), expected)

    def testConvNum_toString_main(self):
        string = '12345'
        expected = 12345
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_negative_main(self):
        string = "-12345"
        expected = -12345
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_decimal_main(self):
        string = ".45"
        expected = 0.45
        self.assertEqual(task.conv_str_to_num(string), expected)

    def testConvNum_toString_typeFloat_main(self):
        string = "123."
        expected = 123.0
        self.assertIsInstance(task.conv_num(string), type(expected))

    def testConvNum_toString_typeInt_main(self):
        string = "123"
        expected = 123
        self.assertIsInstance(task.conv_num(string), type(expected))

    def testConvNum_toString_multi_decimals_invalid_main(self):
        string = "12.3.45"
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_toString_letters_invalid_main(self):
        string = "12345A"
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_hex_to_num_main(self):
        string = "0xAD4"
        expected = 2772
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_hex_to_num_main2(self):
        string = "0Xad4"
        expected = 2772
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_hex_to_num_negative_main(self):
        string = "-0xAD4"
        expected = -2772
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_hex_to_num_invalidHex_main(self):
        string = "-0xAZ4"
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_Empty(self):
        string = ""
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_int(self):
        string = 12
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    def testConvNum_float(self):
        string = 12.2
        expected = None
        self.assertEqual(task.conv_num(string), expected)

    # Beginning of tests for function 3.
    def testBin_Conv1(self):
        test_result = "10000"
        self.assertEqual(task.convert_to_binary(16), test_result)

    def testBin_Conv2(self):
        test_result = "1"
        self.assertEqual(task.convert_to_binary(1), test_result)

    def testBin_Conv3(self):
        test_result = "11000011"
        self.assertEqual(task.convert_to_binary(195), test_result)

    def testBin_Conv4(self):
        test_result = "1001"
        self.assertEqual(task.convert_to_binary(9), test_result)

    def testBin_Conv5(self):
        test_result = "100000000"
        self.assertEqual(task.convert_to_binary(256), test_result)

    def testHex_Conv1(self):
        test_result = "01"
        self.assertEqual(task.convert_to_hex('00000001'), test_result)

    def testHex_Conv2(self):
        test_result = "A0 B0"
        self.assertEqual(task.convert_to_hex('1010000010110000'),
                         test_result)

    def testHex_Conv3(self):
        test_result = "00 00"
        self.assertEqual(task.convert_to_hex('0000000000000000'),
                         test_result)

    def testHex_Conv4(self):
        test_result = "0E"
        self.assertEqual(task.convert_to_hex('1110'), test_result)

    def testHex_Conv5(self):
        test_result = "9C"
        self.assertEqual(task.convert_to_hex("10011100"), test_result)

    def testHex_Conv6(self):
        test_result = "FF FF"
        self.assertEqual(task.convert_to_hex("1111111111111111"),
                         test_result)

    def testHex_Conv7(self):
        test_result = "FF C0 89 17"
        self.assertEqual(task.convert_to_hex
                         ("11111111110000001000100100010111"),
                         test_result)

    def testLittle_Conv1(self):
        test_result = "F0 55"
        self.assertEqual(task.convert_to_little_endian("55 F0"),
                         test_result)

    def testLittle_Conv2(self):
        test_result = "FF FF 89 AB"
        self.assertEqual(task.convert_to_little_endian("AB 89 FF FF"),
                         test_result)

    # This test was not meant to be similar to the example in the
    # materials provided in the assignment on big/little endian. I
    # wrote the test before looking at the article and will include
    # a citation.
    def testLittle_Conv3(self):
        test_result = "12 34 56 78 9A"
        self.assertEqual(task.convert_to_little_endian
                         ("9A 78 56 34 12"), test_result)

    def testPadding_Conv1(self):
        test_result = "00000011"
        self.assertEqual(task.add_padding("11"), test_result)

    def testPadding_Conv2(self):
        test_result = "00110011"
        self.assertEqual(task.add_padding("110011"), test_result)

    def testEnd_Conv1(self):
        test_result = "0C"
        self.assertEqual(task.conv_endian(12), test_result)

    def testEnd_Conv2(self):
        test_result = "1E"
        self.assertEqual(task.conv_endian(30), test_result)

    def testEnd_Conv3(self):
        test_result = "FF"
        self.assertEqual(task.conv_endian(255), test_result)

    def testEnd_Conv4(self):
        test_result = "-FE"
        self.assertEqual(task.conv_endian(-254), test_result)

    def testEnd_Conv5(self):
        test_result = "-22 02"
        self.assertEqual(task.conv_endian(-546, "little"),
                         test_result)

    def testEnd_Conv6(self):
        test_result = "00"
        self.assertEqual(task.conv_endian(0), test_result)

    def testEnd_Conv7(self):
        test_result = "-99 77 12"
        self.assertEqual(task.conv_endian(-10057490), test_result)

    def testEnd_Conv8(self):
        test_result = None
        self.assertEqual(task.conv_endian(66, "reverse"), test_result)

    def testEnd_Conv9(self):
        test_result = "36"
        self.assertEqual(task.conv_endian(54), test_result)

    def testEnd_Conv10(self):
        test_result = "-F0"
        self.assertEqual(task.conv_endian(-240), test_result)

    # testEndConv11-17 were adapted from the assignment specification.
    # Please see source #3 in the README.md the cited source.

    def testEnd_Conv11(self):
        test_result = "0E 91 A2"
        self.assertEqual(task.conv_endian(954786, "big"), test_result)

    def testEnd_Conv12(self):
        test_result = "0E 91 A2"
        self.assertEqual(task.conv_endian(954786), test_result)

    def testEnd_Conv13(self):
        test_result = "-0E 91 A2"
        self.assertEqual(task.conv_endian(-954786), test_result)

    def testEnd_Conv14(self):
        test_result = "A2 91 0E"
        self.assertEqual(task.conv_endian
                         (954786, "little"), test_result)

    def testEnd_Conv15(self):
        test_result = "-A2 91 0E"
        self.assertEqual(task.conv_endian
                         (-954786, "little"), test_result)

    def testEnd_Conv16(self):
        test_result = "-A2 91 0E"
        self.assertEqual(task.conv_endian
                         (num=-954786, endian="little"), test_result)

    def testEnd_Conv17(self):
        test_result = None
        self.assertEqual(task.conv_endian
                         (num=-954768, endian="small"), test_result)


if __name__ == '__main__':
    unittest.main()
