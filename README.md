# Calculate Due Date

The program reads the reported problems from the issue and calculates the completion date/time.

The calculateDueDate method, which takes a date/time and a turnaround time as an input and the output is the date/time when the issue is resolved.

Rules:

•	Working hours are 9AM to 5PM every working day (Monday through Friday)

•	Holidays should be ignored, which means that a holiday on a Thursday is still considered as a working day by the program. A working Saturday will count as a non-working day.

•	The turnaround time is defined in working hours, which means f.e. that 2 days equal 16 hours. Example: if a problem was reported at 2:12PM on Tuesday then it is due by 2:12PM on Thursday.

•	A problem can only be reported during working hours, which means that all submit date values are set between 9AM and 5PM.

•	You can use the standard date time type or library that is part of the given language.