const express = require('express');
const ExpressError = require('./expressError');
const { operations,isAllNums, isEmpty, getObjAndWrite } = require("./operations");

const app = express();

app.use(express.json());

app.get('/:operation',function(req,res,next){
    try {
        const nums = req.query.nums.split(',');
        const save = JSON.parse(req.query.save);
        const statOperation = req.params.operation;
        const oper = operations[statOperation];
        if(!isAllNums(nums)) {
            throw new ExpressError("Some of your values are not numbers...",400);
        }
        if(isEmpty(nums)) {
            throw new ExpressError("Nums are required...",400);
        }
        if(!oper) {
            throw new ExpressError("Operation Not Found...", 404);
        }
        if(statOperation === "all") {
            const { mean, median, mode } = oper(nums);
            const obj = {
                response: {
                    operation: statOperation,
                    mean: mean,
                    median: median,
                    mode: parseFloat(mode) ? parseFloat(mode) : mode,
                    timestamp: Date.now()
                }
            };
            if(save){
                getObjAndWrite(obj);
            }
            return res.json({obj});
        }
        const obj = {
            response: {
				operation: statOperation,
                value: parseFloat(oper(nums)) ? parseFloat(oper(nums)) : oper(nums),
                timestamp: Date.now()
            }
        };
        if(save){
            getObjAndWrite(obj);
        }
        return res.json({obj});
    } catch(err) {
        return next(err);
    }
});

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