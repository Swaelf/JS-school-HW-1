import ItemInterface from '../Interfaces/ItemInterface';

export async function MorningGreatings(currentDate: string) {
    if (localStorage.getItem("currentDate")) {
        if (localStorage.getItem("currentDate") != currentDate) {
            localStorage.setItem("currentDate", currentDate);
            localStorage.setItem("modalWindowState", '1');
        }
    } else {
        localStorage.setItem("currentDate", currentDate);
        localStorage.setItem("modalWindowState", '1');
    }
}