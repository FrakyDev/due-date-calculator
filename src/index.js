/**
 *
 * @param {string} value
 * @returns {string}
 */
const dateString = value => {
  const date = new Date(value);
  const toTwoDigits = (value)=> ('0'+value).slice(-2);

  return `${date.getFullYear()}.${toTwoDigits(date.getMonth()+1)}.${toTwoDigits(date.getDate())}. ${toTwoDigits(date.getHours())}:${toTwoDigits(date.getMinutes())}:${toTwoDigits(date.getSeconds())}`
};




const calculateDueDate = (inputDate, turnaroundTime) => {

  const input = new Date(inputDate);
  const due = new Date(inputDate);
  const startWorkHour = 9;
  const endWorkHour = 17;
  const numberOfDay = input.getDay();
  const weekendDays = [6, 0];
  const hour = input.getHours();

  if (weekendDays.includes(numberOfDay)) {
    throw new Error('You can report a problem only working days between 9AM to 5PM');
  }
  if (hour < startWorkHour || hour >= endWorkHour) {
    throw new Error('You can report a problem only working days between 9AM to 5PM');
  }

  if (hour + turnaroundTime < endWorkHour) {
    due.setHours(hour + turnaroundTime);
    return dateString(due);
  }

  const nextDate = new Date(inputDate);
  const nextTurnaroundTime = turnaroundTime - (endWorkHour - hour);

  nextDate.setDate(input.getDate() + 1);
  nextDate.setHours(startWorkHour);
  if (weekendDays.includes(nextDate.getDay())) {
    const skipDays = nextDate.getDay() === 6 ? 2 : 1;

    nextDate.setDate(nextDate.getDate() + skipDays);
  }

  return dateString(calculateDueDate(nextDate, nextTurnaroundTime));
};

export default calculateDueDate;