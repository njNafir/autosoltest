
export function getLastMonths(props) {
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
    var months = [];
    var d = new Date();
    d.setDate(1);
    for (let i=0; i<=6; i++) {
        // months.push(monthName[d.getMonth()]);
        months.push([d.getFullYear(), d.getMonth()]);
        d.setMonth(d.getMonth() - 1);
    }
    months = months.reverse();
    return months
}
