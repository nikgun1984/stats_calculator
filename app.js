const express = require('express');
const ExpressError = require('./expressError');
const { operations,isAllNums, isEmpty } = require("./operations");

const app = express();

app.use(express.json());

app.get('/:operation',function(req,res,next){
    try {
        const nums = req.query.nums.split(',');
        if(!isAllNums(nums)) {
            throw new ExpressError("Some of your values are not numbers...",400);
        }
        if(isEmpty(nums)) {
            throw new ExpressError("Nums are required...",400);
        }
        const statOperation = req.params.operation;
        const oper = operations[statOperation];
        if(!oper) {
            throw new ExpressError("Operation Not Found...", 404);
        }
        // if(oper === "all") {
        //     const {mean, median, mode} = oper(nums);
        //     return res.json({
        //         response: {
        //             operation: statOperation,
        //             mean: mean,
        //             median: median,
        //             mode: parseFloat(mode) ? parseFloat(mode) : mode
        //         }
	    // });
        // }
        return res.json({
			response: {
				operation: statOperation,
				value: parseFloat(oper(nums)) ? parseFloat(oper(nums)) : oper(nums)
			}
	    });
    } catch(err) {
        return next(err);
    }
});

// app.get('/all', function(req,res,next){
//     try {
//         const nums = req.query.nums.split(',');
//         if(!isAllNums(nums)) {
//             throw new ExpressError("Some of your values are not numbers...",400);
//         }
//         if(isEmpty(nums)) {
//             throw new ExpressError("Nums are required...",400);
//         }
//         return res.json({
// 					response: {
// 						operation: "all",
//                         mean: parseFloat(operations.mean(nums)) ? parseFloat(operations.mean(nums)) : operations.mean(nums),
//                         median: parseFloat(operations.median(nums)) ? parseFloat(operations.median(nums)) : operations.median(nums),
//                         mode: parseFloat(operations.mode(nums)) ? parseFloat(operations.mode(nums)) : operations.mode(nums)
// 					},
// 				});
//     } catch(err){
//         next(err)
//     }

// })

app.use(function (err,req, res, next) {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error:{message,status}
    });
});

app.listen(3000, function(){
    console.log('App on port 3000');
});