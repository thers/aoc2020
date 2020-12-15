// Day 8

(() => {
    const parse = (input) => input.trim().split('\n')
            .map(line => line.split(' '))
            .map(([op, operand]) => ({ op, operand: operand|0 }));

    const interpret = (program) => {
        let acc = 0;
        let eip = 0;

        const eipCounter = {};
        const trace = [];

        const ops = {
            nop() { eip++ },
            acc(operand) { acc += operand; eip++ },
            jmp(operand) { eip += operand }
        };

        while (program.length > eip) {
            const instruction = program[eip];
            const counter = eipCounter[eip]|0;

            if (counter > 0) {
                return { error: 'Infinite loop', trace, program, instruction, eip, counter, acc };
            }

            trace.push({ eip, acc, ...instruction });

            eipCounter[eip] = counter + 1;

            ops[instruction.op](instruction.operand);
        }

        return { success: true, acc };
    }

    const input = document.body.innerText;
    
    const program = parse(input);
    const result = interpret(program);

    console.log('Part 1:', result.acc);

    
    const faultCondidates = result.trace.filter(({ op, operand }) => {
        const isJmp = op === 'jmp';
        const isNop = op === 'nop';

        if (!isJmp && !isNop) {
            return false;
        }

        // jmp +0 would be signle-instruction-loop
        if (isNop && operand === 0) {
            return false;
        }

        return true;
    });

    while (faultCondidates.length) {
        const faultyInstruction = faultCondidates.pop();
        const modifiedProgram = program.slice();

        const newOp = faultyInstruction.op === 'nop'
            ? 'jmp'
            : 'nop';

        modifiedProgram[faultyInstruction.eip] = { op: newOp, operand: faultyInstruction.operand };

        const newResult = interpret(modifiedProgram);

        if (newResult.success) {
            return console.log('Success! Part 2:', newResult.acc);
        }
    }

    console.log('No success :( Fault candidates:', faultCondidates, 'trace:', result.trace);
})();
