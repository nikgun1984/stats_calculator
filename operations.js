const fs = require("fs");

function calcMean(nums) {
    const res = nums.reduce(function(total,num){
        return parseInt(total)+parseInt(num);
    })

    return res/nums.length;
}

function calcMedian(nums) {
    const numsLen = nums.length;
    nums.sort((a,b) => a-b);
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

function writeToFile(data) {
    try {
        fs.writeFileSync("results.json", JSON.stringify(data));
        console.log('Successfully wrote to file!');
        } catch (error) {
        console.error(`File write failed: ${error}`)
        process.exit(1);
    }
    // fs.writeFile("results.json",JSON.stringify(data),"utf8", function(err){
    //     if (err) {
    //         console.error(err);
    //         process.exit(1);
    //     }
    //     console.log('Successfully wrote to file!');
    // });
}

function getObjAndWrite(obj){
    console.log(obj);
    console.log(fs.readFileSync("results.json", "utf8"));
    let file = fs.readFileSync("results.json", "utf8");
    const data = file ? JSON.parse(file):[];
    console.log(data);
    data.push(obj);
    writeToFile(data);
}

module.exports = {
	operations: {
		mean: calcMean,
		median: calcMedian,
		mode: calcMode,
		all,
	},
	isEmpty,
	isAllNums,
	getObjAndWrite
};

