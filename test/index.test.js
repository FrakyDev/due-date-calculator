import calculateDueDate from "../src";

describe('due date calculator', () => {
  test.each`
  inputDate                 | turnaroundTime | expected                  | description
  ${'2021.11.02. 12:00:00'} | ${3}           | ${'2021.11.02. 15:00:00'} | ${'Tuesday and add 3 hours'}
  ${'2021.11.02. 15:00:00'} | ${4}           | ${'2021.11.03. 11:00:00'} | ${'Tuesday and add 4 hours and turn it to the next day'}
  ${'2021.11.05. 15:00:00'} | ${8}           | ${'2021.11.08. 15:00:00'} | ${'Friday and add 8 hours and skip weekend and go to next Monday'}
  ${'2021.11.05. 15:00:00'} | ${16}          | ${'2021.11.09. 15:00:00'} | ${'Friday and add 16 hours and skip weekend and go to next Tuesday'}
  ${'2021.11.05. 15:00:00'} | ${48}          | ${'2021.11.15. 15:00:00'} | ${'Friday and add 48 hours and skip two weekend and go to next next Monday'}
  ${'2021.11.30. 15:00:00'} | ${32}          | ${'2021.12.06. 15:00:00'} | ${'Tuesday and add 32 hours and skip weekend and go to next month second Monday'}
  ${'2021.12.31. 15:00:00'} | ${8}           | ${'2022.01.03. 15:00:00'} | ${'Friday and add 8 hours and skip weekend and go to next year first Monday'}
  
  `
  ('valid input dates: registered at $inputDate due to $expected. $description', ({ inputDate, turnaroundTime, expected }) => {
    expect(calculateDueDate(inputDate, turnaroundTime)).toBe(expected);
  });

  test.each`
  inputDate                 | turnaroundTime | description
  ${'2021.11.02. 17:30:00'} | ${3}           | ${'Tuesday after end of workday'}
  ${'2021.11.02. 08:30:00'} | ${1}           | ${'Tuesday before start the workday'} 
  ${'2021.11.06. 14:30:00'} | ${2}           | ${'Saturday'}
  ${'2021.11.07. 14:30:00'} | ${3}           | ${'Sunday'}
  
  `
  ('invalid input dates: registered at $inputDate. $description', ({ inputDate, turnaroundTime }) => {
    expect(() => {
      calculateDueDate(inputDate, turnaroundTime);
    }).toThrow();
  });
});