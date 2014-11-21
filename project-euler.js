
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

var solveProblem1 = function () {
    return sum(getMultiples(5,3,10))
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

var solveProblem2 = function () {
    return sum(fibonacci(4000000).filter(isEven))
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