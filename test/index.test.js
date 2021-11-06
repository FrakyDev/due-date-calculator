import calculateDueDate from "../src";

describe('due date calculator', () => {
  test.each`
  inputDate                 | turnaroundTime | expected
  ${'2021.11.02. 12:00:00'} | ${3}           | ${'2021.11.02. 15:00:00'}
  ${'2021.11.02. 15:00:00'} | ${4}           | ${'2021.11.03. 11:00:00'}
  ${'2021.11.05. 15:00:00'} | ${8}           | ${'2021.11.08. 15:00:00'}
  ${'2021.11.05. 15:00:00'} | ${16}          | ${'2021.11.09. 15:00:00'}
  
  `
  ('valid input dates: registered at $inputDate due to $expected', ({ inputDate, turnaroundTime, expected }) => {
    expect(calculateDueDate(inputDate, turnaroundTime)).toBe(expected);
  });

  test.each`
  inputDate                 | turnaroundTime
  ${'2021.11.02. 17:30:00'} | ${3} 
  ${'2021.11.02. 08:30:00'} | ${1} 
  ${'2021.11.06. 14:30:00'} | ${2} 
  ${'2021.11.07. 14:30:00'} | ${3} 
  
  `
  ('invalid input dates: registered at $inputDate', ({ inputDate, turnaroundTime }) => {
    expect(() => {
      calculateDueDate(inputDate, turnaroundTime);
    }).toThrow();
  });
});