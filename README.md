## Hackathon Toy Problem - DM4!

Your task is to write a function `typeSafe` that takes in a function, an array of expected argument types, and an expected return type. `typeSafe` will return a function that checks whether all passed arguments, as well as the return value of the wrapped function are correct.

Examples:
```
function add( a, b ) {
	return a + b;
}

const wrappedAdd = typeSafe( add, [ "number", "number" ], "number );

wrappedAdd( 2, 2 ); // 4
wrappedAdd( 101, 12 ); // 113

wrappedAdd( "a", 2 ); // TypeError - Invalid Type!
wrappedAdd( 1 ); // TypeError - Incorrect number of arguments!
wrappedAdd( 1, 2, 3 ); // TypeError - Incorrect number of arguments!
```

```
function orderFood( food, amount ) {
	return `I would like ${ amount } of the ${ food } please.`
}
const wrappedOrderFood = typeSafe( orderFood, [ "string", "number" ], "string );

wrappedOrderFood( 3, "lasagna" ); // I would like 3 of the lasagna please.
wrappedOrderFood( 0, "salad" ); // I would like 0 of the salad please.

wrappedOrderFood( 2, [ "lasagna", "pizza" ] ); // TypeError - Invalid Type!
```

Your function is expected to handle the following types of values:

* number
* string
* boolean
* object
* array
* null
* undefined

If any of the arguments or the return value does not match the expected type `typeSafe` should throw a `new TypeError`. You are not expected to check nested values ( i.e you don't need to see if an array is full of strings, or an object has certain properties of certain types).

The test suite can be run with `npm test`. Be sure to commit as soon as all tests are passing to save a timestamp. Good luck!