const chartItems = [
    {id: 0, name: 'Jan, 24', key: '0:24'},
    {id: 1, name: 'Feb, 24', key: '1:24'},
    {id: 2, name: 'Mar, 24', key: '2:24'},
    {id: 3, name: "Apr, 24", key: '3:24'},
    {id: 4, name: 'May, 24', key: '4:24'},
    {id: 5, name: 'Jun, 24', key: '5:24'},
    {id: 6, name: 'Jul, 24', key: '6:24'},
    {id: 7, name: 'Aug, 24', key: '7:24'},
    {id: 8, name: 'Sep, 24', key: '8:24'},
    {id: 9, name: 'Oct, 24', key: '9:24'},
    {id: 10, name: 'Nov, 24', key: '10:24'},
    {id: 11, name: 'Dec, 24', key: '11:24'}
];

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * max);
}

function getRandomFloat() {
    return (0.2 + Math.random()).toFixed(1);
}

let chartSource = {};
let day, month, year;

function fillSource(){
    for(let i = 0; i < chartItems.length; i++){
        let days = new Date(2024, 1+i, 0).getDate();
        let chart = getRandomInt(3);
        let chartList = [];
        for(let j = 0; j < chart; j++){
            let points = [];
            let total = 0;
            for(let d = 0; d < days; d++){
                let tb = getRandomFloat();
                total += parseFloat(tb);
                points.push([(1+d) + '&nbsp;' + chartItems[i].name, tb])
            }
            chartList.push({
                name: 'Chart ' + (1 + j),
                points: points,
                line: { width: 4 },
                total: total.toFixed(1)
            });
        }
        chartSource[i + ':24'] = chartList;
    }
}

fillSource();