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

  //numbers.forEach(x => { if (x % 2 != 0) { result.push(x) }});              //  short variant

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 != 0) { 
      result.push(numbers[i]);
    };
  };
  return result;
};


/**
  * Exercise 2
  *
  * Write a function that returns the smallest value of an array
  * [4,2,10,27] => 2
  */
const getSmallestValue = numbers => {

  let result = numbers[0];
  
  //numbers.forEach(x => { if (x < result) { result = x }});                  //  short variant
  
  for (let i = 0; i < numbers.length; i++) {

    if (numbers[i] < result) {

      result = numbers[i];
    };
  };

  return result;
};


/**
  * Exercise 3
  *
  * Write a function that returns the biggest value of an array
  * [5,22,9,43] => 43
  */
const getBiggestValue = numbers => {

  let result = numbers[0];

  //numbers.forEach(x => { if (x > result) { result = x }});                  //  short variant
  
  for (let i = 0; i < numbers.length; i++) {

    if (numbers[i] > result) {

      result = numbers[i];
    };
  };

  return result;
};


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
  
  const result = strings.filter(str => str.length < characters);

  return result;
};


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

  const result = fish.map(x => {
    return x.name + ' likes ' + x.likes
  });

  return result
};


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

  //objects.forEach(x => result =  {...result,...x})                          //  short variant

  for (let i of objects) {
    result =  {...result,...i};
  };

  return result;
};


/**
  * Exercise 7
  *
  * Write a function that returns the smallest value of an array
  * [5,200,-5,41] => -5
  *
  * Use: operator ... and Math.min
  */
const getSmallestValue2 = numbers => {

  const result = Math.min(...numbers);

  return result;
};


/**
  * Exercise 8
  *
  * Write a function that returns odd array values.
  * [77,2,30,51] => [77,51]
  *
  * Use: reduce
  */
const getOddValues2 = numbers => {

  const result = numbers.reduce(
    (acc, value) => {
    if (value % 2 != 0) { 

      acc.push(value) 
    };

    return acc;
  }, []);

  return result;
};


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

  const result = products.reduce(
    (acc, value) => 
    acc += value.price * value.count, 0);

  return result;
};


/**
  * Exercise 10
  *
  * Implement a function that has an array of numbers as input and an array of unique values as output
  * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
  *
  * Use: reduce and indexOf
  */
const getUniqueValues = numbers => {

  const result = numbers.reduce((acc, value) => {
    if (acc.indexOf(value) == -1) { 
      acc.push(value);
    };

    return acc;
  },[]);

  return result;
};


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

  /*const errors = {
    500:'Server Error', 
    401:'Authorization failed', 
    402:'Server Error', 
    403:'Access denied', 
    404:'Not found'
  };

  if (errors[code]) {
    return errors[code];
  } else {
    return 'unknown error';
  };*/                                                                        //  1 variant

  switch (code) {
  case 500: return 'Server Error';
  case 401: return 'Authorization failed';
  case 402: return 'Server Error';
  case 403: return 'Access denied';
  case 404: return 'Not found';
  default : return 'Unknown Error';
  };
};


/**
  * Exercise 12
  *
  * Write a function that returns the 2 smallest values of an array
  * [4,3,2,1] => [1,2]
  *
  * Use: .sort()
  */
const get2SmallestValues = numbers => {
  //return [numbers.sort()[0], numbers.sort()[1]];                            //  short variant

  numbers.sort();
  const result = [
    numbers[0], 
    numbers[1]
    ];

  return result;
};


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

  const firstName = user.firstName ? user.firstName : 'NoName';
  const secondName = user.secondName ? user.secondName : '';
  const patronymic = user.patronymic ? user.patronymic : '';
  const result = ['Name:', firstName, patronymic, secondName].join(' '); 

  return result;
};


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

  const result = numbers.map(x => x * multiplier);

  return result;
};


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

  const charFiltered= characters.filter(x => x.franchise == franchise);
  const charList = charFiltered.map(x => x.name);
  const result = charList.join(', ');

  return result;
};


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

  for (i of numbers) {
    result.push(Math.min(...i))
  }

  //numbers.forEach(x => result.push(Math.min(...x)));

  return result;
};


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
  const transposed = [];

  for (let i = 0; i < numbers.length; i++) {

    for (let j = 0; j < numbers[i].length; j++) {

      if (!transposed[j]) {

        transposed.push([]);
      };

      transposed[j].push(numbers[i][j]);
    };
  };

  for (i of transposed) {

    result.push(Math.min(...i));
  };

  return result;
};


/**
  * Exercise 18
  *
  * Write a function that returns the 2 biggest value of an array
  * [4,3,2,1] => [4,3]
  */
const get2BiggestValues = numbers => {

  numbers.sort();
  const result = [
    numbers[numbers.length-1], 
    numbers[numbers.length-2]
    ];

  return  result;
};


/**
  * Exercise 19
  *
  * Write a function that returns the number of vowels in a string in English
  * ( a, e, i, o, u ).
  *
  * 'Return the number (count) of vowels in the given string.' => 15
  */
const getNumberOfVowels = string => {
  //return string.match(/['aeiou']/gi).length;                                // to ignore case of letters 
  
  const result = string.match(/['aeiou']/g).length;

  return result;
};


/**
  * Exercise 20
  *
  * Write a function that returns an array of two strings where the first element
  * is the original string with uppercase even letters, and the second
  * with capital odd.
  * 'abcdef' => ['AbCdEf', 'aBcDeF']
  */
const getCapitalizedStrings = string => {

  const result = ['', ''];
  const splitString = string.split('');

  for (i in splitString) {

    if (i % 2 == 0) {

      result[0] += splitString[i].toUpperCase();
      result[1] += splitString[i].toLowerCase();
    } else {

      result[1] += splitString[i].toUpperCase();
      result[0] += splitString[i].toLowerCase();
    };
  };

  return result;
};


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

  const result = string.replace(/([a-z])\1{2,}/g, 
    x => {
    return x[0] + x[0];
  });

  return result;
};


/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = numbers => {

  const result = [];

  const recursive = num => {

    if (typeof num == 'object') {

      for (i of num) {

        recursive(i)
      };
    } else {

      result.push(num);
    };
  };

  recursive(numbers);

  return result;
};


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

  for (i of numbers) {

    if (notresult.includes(i) & !result.includes(i)) {

      result.push(i)
    } else {

      notresult.push(i);
    };
  };

  return result;
};


/* Debugging results*/
/*
console.log('Exercise 1 (getOddValues) :', getOddValues([
  -1,0,1,2,3,4,5
  ]));

console.log('Exercise 2 (getSmallestValue) :', getSmallestValue([
  4,2,10,27
  ]));

console.log('Exercise 3 (getBiggestValue) :', getBiggestValue([
  5,22,9,43
  ]));

console.log('Exercise 4 (getShorterStrings) :', getShorterStrings([
   'I am a short string',
   'I seem to be short too',
   'And I am a long string'
  ]));

console.log('Exercise 5 (getComputedStrings) :', getComputedStrings(
  [
   { name: 'shark', likes: 'ocean' },
   { name: 'turtle', likes: 'pond' },
   { name: 'otter', likes: 'fish biscuits' }
  ]));

console.log('Exercise 6 (mergeObjects) :', mergeObjects(
  [
    { name: 'Alice' }, 
    { age: 11 }, 
    {lastName: 'Rick'}
  ]));

console.log('Exercise 7 (getSmallestValue2) :', getSmallestValue2(
  [5,200,-5,41]
  ));

console.log('Exercise 8 (getOddValues2) :', getOddValues2([
  5,200,-5,41,7,20
  ]));

console.log('Exercise 9 (calculateTotal) :', calculateTotal(
  [
   {price: 10, count: 2},
   {price: 100, count: 1},
   {price: 2, count: 5},
   {price: 15, count: 6},
  ]
  ));

console.log('Exercise 10 (getUniqueValues) :', getUniqueValues(
  [1, 2, 2, 4, 5, 5, 5, 6, 6, 6]
  ));

console.log('Exercise 11 (getErrorMessage) :', getErrorMessage(
  401
  ));

console.log('Exercise 12 (get2SmallestValues) :', get2SmallestValues(
  [4,3,2,1]
  ));

console.log('Exercise 13 (getFullName) :', getFullName(
  {
   firstName: 'Peter',
   secondName: 'Vasiliev',
   patronymic: 'Ivanovich'
  }
  ));

console.log('Exercise 14 (multiplyTo) :', multiplyTo(
  [1,2,3,4], 15
  ));

console.log('Exercise 15 (getCharacterNames) :', getCharacterNames(
  [
   {name: "Batman", franchise: "DC"},
   {name: "Ironman", franchise: "Marvel"},
   {name: "Thor", franchise: "Marvel"},
   {name: "Superman", franchise: "DC"}
  ],
   'DC'
  ));

console.log('Exercise 16 (getSmallestRow) :', getSmallestRow(
  [
   [10,1,300,4],
   [20,2,300,400],
   [30,3,300,4],
   [40,5,300,4],
   [10,12,6]
  ]
  ));

console.log('Exercise 17 (getSmallestColumn) :', getSmallestColumn(
  [
  [8, 2, 8, 8, 9],
  [8, 8, 8, 4],
  [8, 8, 3, 8, 1, 4],
  [1, 8, 8],
  ]
  ));

console.log('Exercise 18 (get2BiggestValues) :', get2BiggestValues(
  [4,3,2,1]
  ));

console.log('Exercise 19 (getNumberOfVowels) :', getNumberOfVowels(
  'Return the number (count) of vowels in the given string.'
  ));

console.log('Exercise 20 (getCapitalizedStrings) :', getCapitalizedStrings(
  'Return the Odd end Even numbers Capitalized Strings of the given string.'
  ));

console.log('Exercise 21 (getCorrectString) :', getCorrectString(
  'uuuuuuxaaaaaaxuuuttttttyyyyyyyyasas'
  ));

console.log('Exercise 22 (getFlattenedArray) :', getFlattenedArray(
  [1, 2, [3, 4], 5, [[6, [7, 6, [5, [4, 3], 2, 1]]], 8], 9]
  ));

console.log('Exercise 23 (getNotUniqueValues) :', getNotUniqueValues(
  [1, 2, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7]
  ));
  */