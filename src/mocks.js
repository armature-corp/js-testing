
export class Mocks {

	static mock(cl) {
		return this.stub(cl);
	}

	static stub(cl, overrides) {
		var temp = (overrides && overrides['constructor'])?overrides['constructor']:function() {};
		var fns = Object.getOwnPropertyNames(cl.prototype);
		 fns.forEach((property) => {
		 	if (typeof(cl.prototype[property]) === 'function') {
		 		temp.prototype[property] = function() {};
		 		if (overrides && overrides[property])
		 			spyOn(temp.prototype, property).and.callFake(overrides[property]);
		 		else
		 			spyOn(temp.prototype, property);
		 	}

		 });
		return temp;
	}

}