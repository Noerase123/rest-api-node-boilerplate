const cron = require('node-cron')

console.log('cron job has started')

// cron.schedule('* * * * * *', function() {
//     // 0 to 59
//     console.log('running a task every sec')
// });

// cron.schedule('* * * * *', function() {
//     // 0 to 59
//     console.log('running a task every minute')
// });

cron.schedule('0 * * * *', function() {
    // 0 to 23
    console.log('running a task every hour')
});

// cron.schedule('0 0 * * *', function() {
//     // 1 to 31
//     console.log('running a task every day of the month')
// });

// cron.schedule('0 0 0 * *', function() {
//     // 1 to 12
//     console.log('running a task every month of the year')
// });

// cron.schedule('* * * * 1', function() {
//     // 0 to 7
//     console.log('running a task every day of the week')
// });