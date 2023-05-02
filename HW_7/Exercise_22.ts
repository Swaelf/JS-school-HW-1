//declaring type of recursive array, that can contain either array or any other type
//type RecursiveArray<T> = T | RecursiveArray<T>[]; 

//declaring new type, that can be any type of list
type complexType = string|number|boolean|object|null|undefined|symbol|void;


/**
* main function
* @param numbers (array to be flattened)
* @returns Array
*/
const getFlattenedArray = (numbers: complexType|Iterable<complexType>) => {

  const result: Array<complexType> = []; 

  /**
  * recursive function
  * @param num (array to be flattened)
  * @returns undefined
  */
  const recursive = (num: complexType|Iterable<complexType>) => {

    if (Array.isArray(num)) { 
      
      for (const i of num) { 

        recursive(i); 
      };
    } else {

      result.push(num); 
    };
  };

  recursive(numbers);  

  return result;
};
  
const testArray: number[] = [28, 29, 30];
const initialArray = [
  '1', Symbol(2), 
  [[4], 5, 0o6, '\x07'.charCodeAt(0), [8, 9]], 
  [
    [0b1010, 11, [0xC, [13, '14']], {'15': 16, 17: 20-2}], 
    19, Math.floor(Math.sin(Math.PI/3)/Math.cos(Math.PI/2.056)),
    [() => 21, function() {return 22}, '23 24 25 26'.split(' ')], 
    [[[[[[27]]]]]], 
    testArray
  ],
  undefined,
  [false, null, void[3]]
]

//output: clearing console log and printing number of exercise
console.clear();
console.log('Exercise 22 :');

console.log('test' + testArray);

//output: printing initial array
console.log('initial array :', initialArray);

//declaring result array
const resultArray = getFlattenedArray(initialArray);

//output: printing result
console.log('flattened array :', resultArray);