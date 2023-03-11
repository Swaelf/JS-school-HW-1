function showTime(){
    let date = new Date();
    let tm = [
        date.getHours(), 
        date.getMinutes(), 
        date.getSeconds(),
        date.toLocaleString('default', {weekday: 'long'}), 
        date.getDate(),
        date.toLocaleString('default', {month: 'long' })];

    for (let i = 0; i < 3; i++) {
        if (tm[i] < 10) {
            tm[i] = "0" + tm[i].toString();
        }
        else {
            tm[i] = "" + tm[i].toString();
        }
    }
    
    let time = tm[0] + ":" + tm[1]  + ":" + tm[2];
    let days = tm[3] + ", " + tm[4] + " " + tm[5];

    document.getElementById("DisplayClock").innerText = time;
    document.getElementById("DisplayClock").textContent = time;
        
    document.getElementById("DisplayDate").innerText = days;
    document.getElementById("DisplayDate").textContent = days;

    setTimeout(showTime, 1000);  
}

showTime();