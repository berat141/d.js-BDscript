const check = require("../utils/condition")
const operators = require("../utils/operators")

module.exports = {
    name: "$while",
    brackets: true,
    fields: [{
        name: "condition",
        type: "string",
        description: "the condition to test on every loop lap"
    }, {
        name: "code",
        type: "string",
        description: "the code to execute on every loop lap until the condition is met"
    }],
    description: "executes a code until given condition is met",
    returns: "?string", 
    execute: async d => {
        let [
            condition,
            ...code
        ] = d.value.splits 
        
        const operator = operators.find(op => condition.includes(op))
        
        if (!operator) return d.sendError(`:x: Invalid operator in \`$while\``)
        
        let [value1, value2] = condition.split(operator)
        
        const content = []
        
        while(true) {
            const val1 = await d.resolveCode(value1)
            const val2 = await d.resolveCode(value2) 
            
            if (val1 === undefined || val2 === undefined) return undefined
            
            const pass = check(val1, operator, val2)
            
            if (pass) {
                const data = await d.resolveCode(code.join(";"))
                
                if (data === undefined) return undefined
                else if (content) content.push(data) 
            }
            else break 
        }
        
        return d.deflate(content.join("\n"))
    }
}