function solution(n, s, a, b, fares) {
    const d = Array.from( {length: n+1 }, () => Array(n+1).fill(Infinity));
    for (let i = 1; i <= n; i++) {
        d[i][i]=0;
    }
    
    for(const [x,y,f] of fares){
        d[x][y] = Math.min(d[x][y], f);
        d[y][x] = Math.min(d[y][x], f);
    }
        
    for(let k=1; k<=n; k++) {
        for(let i=1; i<=n; i++) {
            for (let j=1; j<=n; j++){
                if (d[i][k]+d[k][j] < d[i][j]){
                    d[i][j] = d[i][k]+d[k][j];
                }
            }
        }
    }
    
    let answer = Infinity;
    for (let k=1; k<=n; k++){
        const total = d[s][k] + d[k][a] + d[k][b];
        if (total < answer){
            answer = total;
        }
    }

    return answer;
}