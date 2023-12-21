//  get the month and yaer numbers from data 
export function getMonthAndYear() {
    const date = new Date()
    return {
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
}

export function getMonthName(month_num: number) {
    const date = new Date();
    date.setMonth(month_num - 1);
    return date.toLocaleString('en-US', { month: 'long' });
}

export function getPrevMonthandYear(month_num?:number) {
    const date = new Date();
    const curr_month = date.getMonth() - 1
    date.setMonth(month_num?month_num - 2:curr_month);
    return {
        month: date.getMonth()+1,
        year: date.getFullYear()
    }
}


