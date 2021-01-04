const { operations, isAllNums, isEmpty } = require("./operations");

describe("operations", function(){
    let numsArray1;
    let numsArray2;
    let numsArray3;
    beforeEach(function(){
        numsArray1 = [1,2,3,4,5];
        numsArray2 = [1,2,3,4];
        numsArray3 = [1,2,1,3,4,5];
        numsArray4 = [1,2,1,3,4,5,5];
    })

    test("calculate mean", function(){
        const mean1 = operations.mean(numsArray1);
        const mean2 = operations.mean(numsArray2);
        expect(mean1).toBe(3);
        expect(mean2).toBe(2.5);
    });

    test("calculate median", function(){
        const median1 = operations.median(numsArray1);
        const median2 = operations.median(numsArray2);
        expect(median1).toBe(3);
		expect(median2).toBe(2.5);
    });

    test("calculate mode", function(){
        const mode1 = operations.mode(numsArray1);
        const mode2 = operations.mode(numsArray3);
        const mode3 = operations.mode(numsArray4);
        expect(mode1).toBe('No Mode');
        expect(mode2).toEqual(1);
        expect(mode3).toBe('There are more than 1 mode');
    })
})