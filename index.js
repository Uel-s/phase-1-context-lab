/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// Helper function to parse a date string and extract the hour

// Helper function to parse a date string and extract the hour
function getHour(dateString) {
    return parseInt(dateString.slice(-4, -2));
  }
  
  // Helper function to parse a date string and extract the date
  function getDate(dateString) {
    return dateString.slice(0, 10);
  }
  
  function createEmployeeRecord(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const timeInEvent = {
      type: "TimeIn",
      hour: getHour(dateStamp),
      date: getDate(dateStamp)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const timeOutEvent = {
      type: "TimeOut",
      hour: getHour(dateStamp),
      date: getDate(dateStamp)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }
  
  const allWagesFor = function() {
    const eligibleDates = this.timeInEvents.map(function(e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function(memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);
  
    return payable;
  };
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0) }