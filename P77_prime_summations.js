function sieve_of_erat(N){
    /*
    Function implements sieve of Eratosthenes (for all numbers uptil N).
    Returns array erat_sieve
    If erat_sieve[i] is True, then 2*i + 3 is a prime.
    */
    var lim = Math.floor(N/2);
    if (N%2 == 0){
        lim -= 1;
    }
    erat_sieve = []
    for (var i = 0; i<lim; ++i){
        erat_sieve[i] = true;
    }
    prime_list = [2]
    for (var i = 0; i < Math.floor((Math.sqrt(N)-3)/2 +1); ++i){
        if (erat_sieve[i] == true){
            for(var j= i + (2*i+3); j<lim; j+=(2*i+3)){
                erat_sieve[j] = false;
            }
        }
    }

    for(i=0; i<lim; ++i){
        if(erat_sieve[i] == true){
            prime_list.push(2*i+3);    
        }
    }
    return [erat_sieve, prime_list];
}

function main(){
    const N = 1000;
    const no_of_ways = 5000;
    const [esieve, plist] = sieve_of_erat(N-1);
    const plist_len = plist.length;
    var arr = new Array(N);
    for (var i = 0; i<N; ++i){
        arr[i] = new Array(plist_len);
    }
    for (var i=0; i<N; ++i){
        if (i%2==0){
            arr[i][0] = 1;
        }
        else{
            arr[i][0] = 0;
        }
    }

    for(var j=0; j<plist_len; ++j){
        arr[0][j] = 1;
    }

    for(var i=1; i<N; ++i){
        for(var j=1; j<plist_len; ++j){
            arr[i][j] = arr[i][j-1];
            p = plist[j]
            if (i>=p){
                arr[i][j]+= arr[i-p][j];
            }
        }
        if(arr[i][plist_len - 1]> no_of_ways){
            console.log(i)
            return true;
        }
    }
}

console.time('main')
main()   // The function you're measuring time for 
console.timeEnd('main')