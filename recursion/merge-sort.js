
const merge = (left, right) => {
	let result = [];

	// Consume min(left[0], right[0]) one at a time and add to end of result.
	while (left.length > 0 || right.length > 0) {
		if (left.length === 0) {
			result.push(right.shift());
		} else if (right.length === 0) {
			result.push(left.shift());
		} else if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}

	return result;
}

const mergeSort = (list) => {
	// Base Case
	if (list.length <= 1) {
		return list;
	}

	// Recursive Case: Divide
	let left = [];
	let right = [];
	list.forEach((item, index) => {
		(index < (list.length) / 2) ? left.push(item) : right.push(item);
	});

	// Sort left and right.
	left = mergeSort([...left]);
	right = mergeSort([...right]);

	// Merge
	return merge([...left], [...right]);
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));