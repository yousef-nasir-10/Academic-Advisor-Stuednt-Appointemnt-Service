export const daysOfWeek = [
    {title: "Sunday", key: 1, shortcut: 'sun' },
    {title: "Monday", key: 2, shortcut: 'mon' },
    {title: "Tuesday", key: 3, shortcut: 'tue' },
    {title: "Wednesday", key: 4, shortcut: 'wed' },
    {title: "Thursday", key: 5, shortcut: 'thu' },
    {title: "Friday", key: 6, shortcut: 'fri' },
    {title: "Saturday", key: 7, shortcut: 'stur' },
]
let hours = []
let minutes = []

for (let index = 0; index < 24; index++) {
    if(index < 10){
        hours.push({time: `0${index}`})
    }else{
        hours.push({time: index})
    }
    
}

for (let index = 0; index < 60; index = index + 5) {
    if(index < 10){
        minutes.push({time: `0${index}`})
    }else{
        minutes.push({time: index})
    }
}

export const hoursPick = hours 
export const minPick = minutes



