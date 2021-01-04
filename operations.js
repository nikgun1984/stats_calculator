function calcMean(nums) {
    const res = nums.reduce(function(total,num){
        return total+parseInt(num);
    })

    return res/nums.length;
}

function calcMedian(nums) {
    const numsLen = nums.length;
    nums.sort((a,b) => a-b);
    console.log((nums[numsLen/2-1]+nums[(numsLen+2)/2-1])/2);
    return numsLen%2 !== 0 ? nums[(numsLen+1)/2-1]:(parseInt(nums[numsLen/2-1])+parseInt(nums[(numsLen+2)/2-1]))/2;
}

function calcMode(nums) {
    const obj = {};
    for(const num of nums){
        obj[num] = (obj[num] || 0)+1;
    }
    if(new Set(Object.values(obj)).size === 1) {
        return 'No Mode';
    }
    const maxNum = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    let count = 0;
    for(let val of Object.values(obj)){
        if(obj[maxNum] === val) {
            count++;
        }
    }
    return count > 1 ? 'There are more than 1 mode': parseInt(maxNum);
}

function all(nums) {
    const mean = calcMean(nums);
    const median = calcMedian(nums);
    const mode = calcMode(nums);
    
    return {mean,median,mode};
}

function isAllNums(nums) {
    for(let num of nums) {
        console.log(num);
        console.log(typeof parseInt(num));

        if(!parseInt(num)){
            return false;
        }
    }
    return true;
}

function isEmpty(nums) {
    return nums.length === 0;
}

module.exports = {
	operations: {
		mean:calcMean,
		median:calcMedian,
        mode:calcMode,
        all
    },
    isEmpty,
    isAllNums
};

