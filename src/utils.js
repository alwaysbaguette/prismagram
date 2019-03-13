const generateRandomNo = (list,range) =>{
    console.log(list.length);
    let randomNo = 0;
    let rangeValue = range || 10;
    if(list) {
        const length = list.length;
        randomNo = Math.floor(Math.random()*length);
    }
    else{
        randomNo = Math.floor(Math.random()*rangeValue);
    }
    return randomNo;
}

export default {
    generateRandomNo
}