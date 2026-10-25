function gcd (a, b){
    while (b){
        [a, b] = [b, a % b];
    }
    return a;
}

function solution(signals) {
    let base = 1;
    let cands = [0];
    
    for (const [G, Y, R] of signals){
        const c = G + Y + R;
        const newBase = (base / gcd(base, c)) * c;
        const times = newBase / base;
        
        const newCands = [];
        for (let k=0; k < times; k++) {
            for (const r of cands){
                const s = r + k * base;
                const m = s % c;
                if (m >= G && m < G + Y) 
                    newCands.push(s);
            }
        }
        cands = newCands;
        base = newBase;
        if (cands.length === 0) 
            return -1;
    }
    return Math.min(...cands) + 1;
}