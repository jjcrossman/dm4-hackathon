const test = require( "ava" );
const typeSafe = require( "../index" );

test( "typeSafe returns a function", t => {
	t.is( typeof typeSafe( () => 0, [], "number" ), "function" );
} );

test( "typeSafe throws a TypeError when passed the wrong amount of arguments", t => {
	const noArgs = typeSafe( () => 0, [], "number" );
	const withArgs = typeSafe( ( a, b ) => [ "number", "number" ], "number" );

	t.throws( noArgs.bind( this, 1 ) );
	t.throws( withArgs.bind( this ) );
	t.throws( withArgs.bind( this, 1, 2, 3, 4, 5 ) );
} );

test( "typeSafe returns the proper values", t => {
	function add( a, b ) { return a + b }
	const wrappedAdd = typeSafe( add, [ "number", "number" ], "number" );

	t.is( wrappedAdd( 1, 2 ), 3 );
	t.is( wrappedAdd( 1, 5 ), 6 );
	t.is( wrappedAdd( 3, 5 ), 8 );
} );

test( "typeSafe checks numeric types", t => {
	function add( a, b ) { return a + b }
	const wrappedAdd = typeSafe( add, [ "number", "number" ], "number" );

	t.is( wrappedAdd( 1, 2 ), 3 );
	t.is( wrappedAdd( 1, 5 ), 6 );
	t.is( wrappedAdd( 3, 5 ), 8 );

	t.throws( wrappedAdd.bind( 1, "a" ) );
	t.throws( wrappedAdd.bind( 1, [ 2 ] ) );
	t.throws( wrappedAdd.bind( 1, { number: 2 } ) );
} );

test( "typeSafe checks string types", t => {
	function fullName( first, last ) { return `${ first } ${ last }` }
	const wrappedFullName = typeSafe( fullName, [ "string", "string" ], "string" );

	t.is( wrappedFullName( "John", "Doe" ), "John Doe" );
	t.is( wrappedFullName( "Jimmy", "John" ), "Jimmy John" );
	t.is( wrappedFullName( "Jimmy", "" ), "Jimmy " );

	t.throws( wrappedFullName.bind( this, "String", 3 ) );
	t.throws( wrappedFullName.bind( this, 3 ) );
	t.throws( wrappedFullName.bind( this, "a" ) );
	t.throws( wrappedFullName.bind( this, null ) );
	t.throws( wrappedFullName.bind( this, [ "asd" ] ) );
} );

test( "typeSafe checks boolean types", t => {
	function sameBool( boolOne, boolTwo ) { return boolOne === boolTwo }
	const wrappedSameBool = typeSafe( sameBool, [ "boolean", "boolean" ], "boolean" );

	t.is( wrappedSameBool( false, false ), true );
	t.is( wrappedSameBool( false, true ), false );
	t.is( wrappedSameBool( true, true ), true );

	t.throws( wrappedSameBool.bind( false, undefined ) );
	t.throws( wrappedSameBool.bind( false, null ) );
	t.throws( wrappedSameBool.bind( false, null ) );
} );

test( "typeSafe checks object types", t => {
	function getA( obj ) { return obj.a }
	const wrappedGetA = typeSafe( getA, [ "object" ], "number" );

	function makeObj( a ) { return { a } }
	const wrappedMakeObj = typeSafe( makeObj, [ "number" ], "object" );

	t.is( wrappedGetA( { a: 2 } ), 2 );
	t.is( wrappedGetA( { a: 4 } ), 4 );
	t.is( wrappedGetA( { a: 6 } ), 6 );

	t.is( wrappedMakeObj( 3 ).a, 3 );
	t.is( wrappedMakeObj( 0 ).a, 0 );

	t.throws( wrappedGetA.bind( this, [ 2 ] ) );
	t.throws( wrappedGetA.bind( this, null ) );
	t.throws( wrappedGetA.bind( this, 4 ) );

	t.throws( typeSafe( () => null, [], "object" ) );
	t.throws( typeSafe( () => [], [], "object" ) );
	t.throws( typeSafe( () => [], 1, "object" ) );
} );

test( "typeSafe checks array types", t => {
	function firstElement( arr ) { return arr[ 0 ] }
	const wrappedFirstElement = typeSafe( firstElement, [ "array" ], "number" );

	function makeArr( a, b ) { return [ a, b ] }
	const wrappedMakeArr = typeSafe( makeArr, [ "number", "number" ], "array" );

	t.is( wrappedFirstElement( [ 1 ] ), 1 );
	t.is( wrappedFirstElement( [ 0, 3, 5 ] ), 0 );
	t.is( wrappedFirstElement( [ 9, 12, 14, 18 ] ), 9 );

	t.deepEqual( wrappedMakeArr( 1, 2 ), [ 1, 2 ] );
	t.deepEqual( wrappedMakeArr( 8, 2 ), [ 8, 2 ] );

	t.throws( wrappedFirstElement.bind( this, { "0": 1 } ) );
	t.throws( wrappedFirstElement.bind( this, null ) );
	t.throws( wrappedFirstElement.bind( this, 4 ) );

	t.throws( typeSafe( () => {}, [], "array" ) );
	t.throws( typeSafe( () => null, [], "array" ) );
} );

test( "typeSafe checks null types", t => {
	function wantsNull( val ) { return val }
	const wrappedWantsNull = typeSafe( wantsNull, [ "null" ], "null" );

	t.is( wrappedWantsNull( null ), null );

	t.throws( wrappedWantsNull.bind( this, {} ) );
	t.throws( wrappedWantsNull.bind( this, [] ) );
	t.throws( wrappedWantsNull.bind( this, false ) );
	t.throws( wrappedWantsNull.bind( this, undefined ) );
} );

test( "typeSafe checks undefined types", t => {
	function wantsUndefined( a ) { return 1 }
	const wrappedWantsUndefined = typeSafe( wantsUndefined, [ "undefined" ], "number" );

	t.is( wrappedWantsUndefined( undefined ), 1 );

	t.throws( wrappedWantsUndefined.bind( this, false ) );
	t.throws( wrappedWantsUndefined.bind( this, null ) );
	t.throws( wrappedWantsUndefined.bind( this ) );
} );
