# js-testing
Provides utility classes for front end testing

## Mocks.js

### Usage
In *package.json*
``` javascript
	"devDependencies": {
		...
		"js-testing": "git://github.com/armature-corp/js-testing.git",
		...
	}
```

In *karma.config.js*
``` javascript
	jspm: {
	    ...
            serveFiles: [..., 'node_modules/js-testing/dist/**/*.js'],
            paths: {
	        ...
                'js-testing/*': 'node_modules/js-testing/dist/*',
		...
            }
        }
```

In your test files:
``` javascript
import {Mocks} from 'js-testing/mocks';
```

### Mocks
Create a mock of a specified class.  Jasmine spies are automatically attached to each class method. No logic is executed. No values are returned.
Create the mock:
``` javascript
let MyMockClass = Mocks.mock(MyRealClass);
```

Your test:
``` javascript
let myMockInstance = new MyMockClass();
let instanceOfClassForTesting = new ClassForTesting(myMockInstance);

instanceOfClassForTesting.doSomeThings();

expect(myMockInstance.myMockMethod).toHaveBeenCalled();
```


### Stubs
Create a mock of a specific class that stubs out the specified methods.  Also attaches a jasmine spy to each method.
Note, stub functions must be written as function expressions instead of arrow functions if they need to reference "this".

Create the stub:
``` javascript
let MyStubClass = Mocks.stub(MyRealClass, {
			getSomething: function() {
				return [1,2,3];
			},

			doAFunctionThatSetsAProperty: function(someData) {
				this.propertyTheConsumingCodeUses = someData;
			}
});
```

Your test:
``` javascript
let myStubInstance = new MyStubClass();
let instanceOfClassForTesting = new ClassForTesting(myStubInstance);

let result = instanceOfClassForTesting.doSomeThings();

expect(myStubInstance.getSomething).toHaveBeenCalled();
expect(result).toEqual('something that is a result of the test class using the stubbed methods');
```
