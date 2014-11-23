var project = {}

// PROBLEM #1

var sortNum = function (a,b) { return a - b }
var sortNumDesc = function (a,b) { return b - a }
var add = function (last, next) { return last + next }
var sum = function(array) { return array.reduce(add) }

var getMultiples = function(/* ...integers, max */) {
    var args = [].slice.call(arguments)
    var last = args.length - 1
    var max = args.slice(last)
    var integers = args.slice(0, last)
    integers.sort(sortNumDesc)
    var multiples = []
    lastMax = 0
    var multiplier = 1
    var done = false
    while(lastMax < max && !done) {
        for (var i = 0; i < integers.length; i++) {
            var mult = multiplier * integers[i]
            if (multiples.indexOf(mult) == -1 && mult < max) multiples.push(mult)
            if (mult > max && i == integers.length - 1) done = true
        }
        var lastMax = multiples[multiples.length - 1]
        multiplier++
    }
    return multiples.sort(sortNum)
}

project.solveProblem1 = function () {
    return sum(getMultiples(5,3,1000))
}


// PROBLEM #2

Array.prototype.filter = function (condition) {
    var result = []
    for (var i = 0; i < this.length; i++) {
        if (condition(this[i])) result.push(this[i])
    }
    return result
}

var isEven = function(val) {
    return val % 2 == 0
}

var fibonacci = function (max) {
    var sequence = []
    var fib = function (prev, current) {
        var next = prev + current
        if (next < max) {
            sequence.push(next)
            fib(current, next)
        }
        return sequence
    }
    return fib(1,1)
}

project.solveProblem2 = function () {
    return sum(fibonacci(4000000).filter(isEven))
}


// PROBLEM #3

var factor = function (num, test) {
    return num % test == 0 ? num / test : 0
}

var findFactor = function (num, start) {
    var test = start || 1, result = 0, max = num / 2
    while (++test) {
        result = factor(num, test)
        if (result) break
        if (test > max) return [0, test]
    }
    return [result, test]
}

var findPrimeFactor = function (num, start) {
    var result = [num,0]
	var degrees = -1
    while (result[0]) { // todo - do-while
        var last = result
        result = findFactor(result[0], start)
        degrees++
    }
    return [last[0], last[1], degrees]
}

project.solveProblem3 = function () {
	var result = findPrimeFactor(600851475143)
	return result[0]
}


// PROBLEM #4

var isPalindromic = function (val) {
	var valArray = val.toString().split('')
	var revArray = valArray.slice(0).reverse()
	return revArray.join() == valArray.join()
}

project.solveProblem4 = function () {
	var largestProduct = 0
	var product = 0
	for (var i = 999; i > 0; i--) {
		for (var j = 999; j > 0; j--) {
			product = i * j
			if (isPalindromic(product)
				&& product > largestProduct) {
					console.log(i,j)
					largestProduct = product
				}
		}
	}
	return largestProduct
}

// Linear Congruential Generator for Euler #150
function generate(length) {
    var data = []
    var tLast = 0
    for (var i = 0; i < length; i++) {
        t = (615949 * tLast + 797807) % (Math.pow(2, 20))
        s_k = t - (Math.pow(2, 19))
        data.push(s_k)
        tLast = t
    }
    console.log(data)
}

var solve = function () {
	var solutions = []
	for (var prop in project) {
		console.time(prop)
		solutions.push(project[prop]())
		console.timeEnd(prop)
	}
	return solutions
}