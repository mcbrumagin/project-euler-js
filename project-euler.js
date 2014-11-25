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
    if (num <= 3) return [0,0]
    var test = start || 1, result = 0, max = num / 2
    while (test++) {
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


// PROBLEM #5
var n = '..'

function Set(start, iteration, end) {
	var count = 0
	this.set = {}
	this.set[start] = start
	while (++count < end) {
		this.set[start + iteration*count] = start + iteration*count
	}
}
Set.prototype.add = function(val) {
    this.set[val] = val
}
Set.prototype.get = function(val) {
    return this.set[val]
}
Set.prototype.remove = function(val) {
    delete this.set[val]
}
Set.prototype.valueOf = function() {
    var array = []
    for (var prop in this.set) {
        if (this.set[prop] != undefined)
            array.push(this.set[prop])
    }
    return array
}

var factor = function (num, test) {
    return num % test == 0 ? num / test : 0
}

var factorial = function (num) {
	var product = 1
	num++
	while (--num > 0) {
		product *= num
	}
	return product
}

/*Array.prototype.remove = function (val) {
    var ind = this.indexOf(val)
    return this.slice(0, ind).concat(this.slice(ind+1)) 
}*/

var each = function (objs, fn) {
    if (objs.length) {
        var results = []
        for (var i = 0; i < objs.length; i++) {
            results.push(fn(objs[i]))
        }
        return results
    } else return fn(objs)
}

var primeFactorization = function (num) {
    var done = false
    var factors = {}
    while (!done) {
        var factor = findFactor(num)
        if (factor[0]) {
            if (!factors[factor[1]]) factors[factor[1]] = 1
            else factors[factor[1]]++
            num = num / factor[1]
        } else {
            done = true
            if (!factors[num]) factors[num] = 1
            else factors[num]++
        }
    }
    return factors
}

var mult = function (last, next) { return last * next }
var product = function(array) { return array.reduce(mult) }

var leastCommonMultiple = function (array) {
	var maxFactors = {}
	for (var i = 0; i < array.length; i++) {
		var factors = primeFactorization(array[i])
        console.log(factors)
		for (var prop in factors) {
			if (!maxFactors[prop]
				|| maxFactors[prop] < factors[prop])
					maxFactors[prop] = factors[prop]
		}
	}
    console.log(maxFactors)
	var maxFactorArray = []
	for (var prop in maxFactors) {
		for (var i = 0; i < maxFactors[prop]; i++) {
			maxFactorArray.push(prop)
		}
	}
	return product(maxFactorArray)
}

var range = function (start, increment, end) {
	var array = []
	for (var i = start; i < end; i = i + increment) {
		array.push(i)
	}
	return array
}

project.solveProblem5 = function () {
	return leastCommonMultiple(range(1,1,20))
}


// PROBLEM #6

project.solveProblem6 = function () {
	var numbers = range(1, 1, 101)
	var sumOfSquares = sum(each(numbers, function (val) {
		return Math.pow(val, 2)
	}))
	var squareOfSums = Math.pow(sum(numbers), 2)
	return squareOfSums - sumOfSquares
}


// PROBLEM #7

var getGreaterMultiples = function(val, max) {
    var multiples = []
    var mult = 2
    var next = mult * val
    do {
        multiples.push(next)
        mult++
        next = mult * val
    } while(next < max)
    return multiples
}

var estimateNthPrime = function (n) {
    if (n >= 7022) return n * Math.log(n) + n * Math.log(Math.log(n - 0.9385))
    else return n * Math.log(n) + Math.log(Math.log(n))
}

var sieveOfEratosthenes = function(max) {
    var primes = new Set(3,2,max/2-1)
    primes.set[2] = 2
    for (var prop in primes.set) {
        if (prop > max/2) break
        var multiples = getGreaterMultiples(primes.set[prop], max)
        each(multiples, function(val) { primes.remove(val) })
    }
    return primes.valueOf()
}

var getNthPrime = function(n) {
    var upperBound = estimateNthPrime(n)
    var primes = sieveOfEratosthenes(upperBound)
    return primes[n-1]
}

var generatePrimes = function (amount) {
    var count = 1
    var primes = [2]
    var test = 3
    while (count < amount) {
        for (var i = 2; i < test; i++) {
            var prime = true
            if (factor(test, i)) {
                prime = false
                break
            }
        }
        if (prime) {
            primes.push(test)
            count++
        }
        test++
    }
    return primes
}

var last = function (array) {
	return array[array.length - 1]
}

var solveProblem7_old = function () {
	return last(generatePrimes(10001))
}

project.solveProblem7 = function () {
	return getNthPrime(10001)
}


// PROBLEM #8

project.solveProblem8 = function () {
	var data = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"
	var sliceSize = 13
	var test = data.slice(0, sliceSize).split('')
	var largestProduct = 0
	for (var i = sliceSize; i < data.length; i++) {
		var currentProduct = product(test)
		if (currentProduct > largestProduct) largestProduct = currentProduct
		test.shift()
	    test.push(data[i])
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