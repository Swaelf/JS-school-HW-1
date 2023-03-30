// ----==== JS School - Lecture 4 HW ====---- 

/**
 * Ð¡riteria for assessment
 * 
 * 5 - All tasks are correctly solved (23 items), the code is clean, the solutions are optimal;
 * 4 - Correctly solved all the tasks of the base block (15 tasks), the code is clean;
 * 3 - At least 10 problems are correctly solved, the code is clean;
 * 2 - Correctly solved at least 10 problems;
 * 1 - At least 5 problems solved correctly.
 */

/**
 * Warning
 * 
 * Do not rename function names or change arguments.
 */

// ----==== Basic exercises (15 items) ====---- 
/**
  * Exercise 1
  *
  * Write a function that returns odd array values.
  * [1,2,3,4] => [1,3]
  */
const getOddValues = numbers => {
  const result = [];
  numbers.forEach(x => { if (x % 2 != 0) { result.push(x) }});
  return result;
};
console.log(getOddValues([-1,0,1,2,3,4]));
/**
  * Exercise 2
  *
  * Write a function that returns the smallest value of an array
  * [4,2,10,27] => 2
  */
const getSmallestValue = numbers => {
  //return Math.min(...numbers);  //not in place)
  let result = numbers[0];
  numbers.forEach(x => { if (x < result) { result = x }});
  return result;
};
console.log(getSmallestValue([4,2,10,27]));
/**
  * Exercise 3
  *
  * Write a function that returns the biggest value of an array
  * [5,22,9,43] => 43
  */
const getBiggestValue = numbers => {
  //return Math.max(...numbers);  //not in place)
  let result = numbers[0];
  numbers.forEach(x => { if (x > result) { result = x }});
  return result;
};
console.log(getBiggestValue([5,22,9,43]));
/**
  * Exercise 4
  *
  * Write a function that takes an array of strings as input
  * and returns only those shorter than 20 characters
  *
  *[
  * 'I am a short string',
  * 'I seem to be short too',
  * 'And I am a long string'
  *] => [
  * 'I am a short string',
  * 'And I am a long string'
  *]
  *
  * Use: filter
  */
const getShorterStrings = (strings, characters = 20) => {
  return strings.filter(str => str.length<characters);
};
console.log(getShorterStrings([
   'I am a short string',
   'I seem to be short too',
   'And I am a long string'
  ]));
/**
  * Exercise 5
  *
  * Write a function that takes the following data as input:
  *
  *[
  * { name: 'shark', likes: 'ocean' },
  * { name: 'turtle', likes: 'pond' },
  * { name: 'otter', likes: 'fish biscuits' }
  *]
  *
  * And returns an array of strings:
  *
  * [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
  *
  * Use: map
  */
const getComputedStrings = fish => {
  //fish.forEach(x => result.push(x.name + ' likes ' + x.likes)); //Old variant
  return fish.map(x => x.name + ' likes ' + x.likes);
};
console.log(getComputedStrings(
  [
   { name: 'shark', likes: 'ocean' },
   { name: 'turtle', likes: 'pond' },
   { name: 'otter', likes: 'fish biscuits' }
  ]
  ));
/**
  * Exercise 6
  *
  * Write a function that takes 2 objects as input and returns 1 with  
  * common properties. If properties have the same keys use the latter.
  *
  * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
  *
  * We use: ...
  */
const mergeObjects = objects => {
  let result = {};
  //objects.forEach(x => Object.keys(x).forEach(y => result[y] = x[y])) //Old variant
  objects.forEach(x => result =  {...result,...x})
  return result;
};
console.log(mergeObjects(
  [{ name: 'Alice' }, { age: 11 }, {lastName: 'Rick'}]
  ));
/**
  * Exercise 7
  *
  * Write a function that returns the smallest value of an array
  * [5,200,-5,41] => -5
  *
  * Use: operator ... and Math.min
  */
const getSmallestValue2 = numbers => {
  return Math.min(...numbers);
};
console.log(getSmallestValue2(
  [5,200,-5,41]
  ));
/**
  * Exercise 8
  *
  * Write a function that returns odd array values.
  * [77,2,30,51] => [77,51]
  *
  * Use: reduce
  */
const getOddValues2 = numbers => {
   return numbers.reduce((acc, value) => {
    if (value % 2 != 0) { acc.push(value) };
    return acc;
  }, []);
};
console.log(getOddValues2(
  [5,200,-5,41]
  ));
/**
  * Exercise 9
  *
  * Write a function that accepts data from the basket as input in the following form:
  *
  *[
  * {price: 10, count: 2},
  * {price: 100, count: 1},
  * {price: 2, count: 5},
  * {price: 15, count: 6},
  *]
  * where price is the price of the item and count is the quantity.
  *
  * The function should return the total price for this order.
  *
  * Use: reduce
  */
const calculateTotal = products => {
  return products.reduce((acc, value) => acc += value.price * value.count ,0);
};
console.log(calculateTotal(
  [
   {price: 10, count: 2},
   {price: 100, count: 1},
   {price: 2, count: 5},
   {price: 15, count: 6},
  ]
  ));
/**
  * Exercise 10
  *
  * Implement a function that has an array of numbers as input and an array of unique values as output
  * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
  *
  * Use: reduce and indexOf
  */
const getUniqueValues = numbers => {
  return numbers.reduce((acc, value) => {
    if (acc.indexOf(value) == -1) { acc.push(value) };
    return acc;
  },[])
};
console.log(getUniqueValues(
  [1, 2, 2, 4, 5, 5]
  ));
/**
  * Exercise 11
  *
  * Implement a function whose input is a numeric code of an error, the output is a string with a message
  * 500 => Server Error
  * 401 => Authorization failed
  * 402 => Server Error
  * 403 => Access denied
  * 404 => Not found
  *
  * Use: switch case or object like a map structure
  */
const getErrorMessage = code => {
  const errors = {500:'Server Error', 401:'Authorization failed', 402:'Server Error', 403:'Access denied', 404:'Not found'};
  if (errors[code]) {
    return errors[code];
  } else {
    return 'unknown error';
  };
};
console.log(getErrorMessage(
  401
  ));
/**
  * Exercise 12
  *
  * Write a function that returns the 2 smallest values of an array
  * [4,3,2,1] => [1,2]
  *
  * Use: .sort()
  */
const get2SmallestValues = numbers => {
  return [numbers.sort()[0], numbers.sort()[1]];
};
console.log(get2SmallestValues(
  [4,3,2,1]
  ));
/**
  * Exercise 13
  *
  * Implement a function, at the input of which an object of the following form:
  * {
  * firstName: 'Peter',
  * secondName: 'Vasiliev',
  * patronymic: 'Ivanovich'
  *}
  * output line with the message 'Name: Petr Ivanovich Vasiliev'
  */
const getFullName = user => {
  return 'Name:' + (user.firstName ? ' ' + user.firstName : 'NoName') +  
    (user.patronymic ? ' ' + user.patronymic : '') + 
    (user.secondName ? ' ' + user.secondName : '');
};
console.log(getFullName(
  {
   firstName: 'Peter',
   secondName: 'Vasiliev',
   patronymic: 'Ivanovich'
  }
  ));
/**
  * Exercise 14
  *
  * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
  * a returns an array of the original array, each element of which has been multiplied by a factor:
  *
  * [1,2,3,4], 5 => [5,10,15,20]
  *
  * Use: map
  */
const multiplyTo = (numbers, multiplier) => {
  return numbers.map(x => x * multiplier);
};
console.log(multiplyTo(
  [1,2,3,4], 15
  ));
/**
  * Exercise 15
  *
  * Implement a function that takes 2 arguments as input: an array and a franchise,
  * and returns a string with the names of the heroes separated by a comma:
  *
  *[
  * {name: "Batman", franchise: "DC"},
  * {name: "Ironman", franchise: "Marvel"},
  * {name: "Thor", franchise: "Marvel"},
  * {name: â€œSupermanâ€, franchise: â€œDCâ€}
  *],
  * Marvel
  * => Ironman, Thor
  *
  * Use: filter, map, join
  */
const getCharacterNames = (characters, franchise) => {
  return characters.filter(x => x.franchise == franchise).map(x => x.name).join(', ');
};
console.log(getCharacterNames(
  [
   {name: "Batman", franchise: "DC"},
   {name: "Ironman", franchise: "Marvel"},
   {name: "Thor", franchise: "Marvel"},
   {name: "Superman", franchise: "DC"}
  ],
   'DC'
  ));

// ----==== Advanced exercises (8 items) ====----
/**
  * Exercise 16
  *
  * Write a function that returns an array of the smallest row values of a two-dimensional array
  *[
  * [10,1,300,4],
  * [20,2,300,400],
  * [30,3,300,4],
  * [40,4,300,4],
  *]
  * => [1,2,3,4]
  */
const getSmallestRow = numbers => {
  const result = [];
  numbers.forEach(x => result.push(Math.min(...x)));
  return result;
};
console.log(getSmallestRow(
  [
   [10,1,300,4],
   [20,2,300,400],
   [30,3,300,4],
   [40,5,300,4],
  ]
  ));
  /**
  * Exercise 17
  *
  * Write a function that returns an array of the smallest column values of a two-dimensional array
  *[
  * [1,2,3,4],
  * [1,2,3,4],
  * [1,2,30,4],
  * [1,2,3,40],
  *]
  * => [1,2,3,4]
  */
const getSmallestColumn = numbers => {
  const result = [];
  numbers[0].map((_, colIndex) => numbers.map(row => row[colIndex])).forEach(x => result.push(Math.min(...x)));
  return result;
};
console.log(getSmallestColumn(
  [
   [1,2,3,4],
   [1,2,3,4],
   [1,2,30,4],
   [1,2,3,40],
  ]
  ));
/**
  * Exercise 18
  *
  * Write a function that returns the 2 biggest value of an array
  * [4,3,2,1] => [4,3]
  */
const get2BiggestValues = numbers => {
  numbers.sort();
  return [numbers[numbers.length-1], numbers[numbers.length-2]]
};
console.log(get2BiggestValues(
  [4,3,2,1]
  ));
/**
  * Exercise 19
  *
  * Write a function that returns the number of vowels in a string in English
  * ( a, e, i, o, u ).
  *
  * 'Return the number (count) of vowels in the given string.' => 15
  */
const getNumberOfVowels = string => {
  //return string.match(/['aeiou']/gi).length; // to ignore case of letters 
  return string.match(/['aeiou']/g).length;
};
console.log(getNumberOfVowels(
  'Return the number (count) of vowels in the given string.'
  ));
/**
  * Exercise 20
  *
  * Write a function that returns an array of two strings where the first element
  * is the original string with uppercase even letters, and the second
  * with capital odd.
  * 'abcdef' => ['AbCdEf', 'aBcDeF']
  */
const getCapitalizedStrings = string => {
  const result = [];
  let temp = [];
  string.split('').forEach((x, i) => (i % 2 == 0) ? temp.push(x.toUpperCase()) : temp.push(x.toLowerCase()));
  result.push(temp.join(''))
  temp = [];
  string.split('').forEach((x, i) => (i % 2 == 0) ? temp.push(x.toLowerCase()) : temp.push(x.toUpperCase()));
  result.push(temp.join(''))
  return result;
};
console.log(getCapitalizedStrings(
  'Return the number (count) of vowels in the given string.'
  ));
/**
  * Exercise 21
  *
  * Write a function that satisfies the following conditions:
  *
  * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
  * the function returns a string that does not contain three identical letters in a row
  * the function removes the minimum number of letters from the string S
  *
  * Examples:
  * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
  * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
  * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
  *
  * Assumptions:
  * N is an integer in the range [1..200,000]
  * S consists only of lowercase letters [a-z]
  */
const getCorrectString = string => {
  return string.replace(/([a-z])\1{2,}/g, x => x[0] + x[0]);
};
console.log(getCorrectString(
  'uuuuuuxaaaaaaxuuuttttttyyyyyyyyasas'
  ));
/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = numbers => {
  const result = [];
  const recursive = num => (typeof num == 'object') ? num.forEach(x => recursive(x)) : result.push(num);
  recursive(numbers);
  return result;
};
console.log(getFlattenedArray(
  [1, 2, [3, 4], 5, [[6, [7, 6, [5, [4, 3], 2, 1]]], 8], 9]
  ));
  /**
  * Exercise 23
  *
  * Implement a function that has an array of numbers as input and an array of not unique values as output.
  * 
  * [1, 2, 2, 4, 5, 5] => [2, 5]
  */
const getNotUniqueValues = numbers => {
  const result = [];
  const notresult = [];
  numbers.forEach(x => notresult.includes(x) & !result.includes(x) ? result.push(x) :  notresult.push(x));
  return result;
};
console.log(getNotUniqueValues(
  [1, 2, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7]
  ));
