export default (graduationDate, currentAge) => {
  // Step 1: Convert graduation date to JavaScript Date object
  const gradDate = new Date(graduationDate);

  // Step 2: Get the current date
  const currentDate = new Date();

  // Step 3: Calculate the difference between the current date and graduation date in milliseconds
  const differenceInMs = currentDate - gradDate;

  // Step 4: Convert the difference from milliseconds to years
  const differenceInYears = differenceInMs / (1000 * 60 * 60 * 24 * 365);

  // Step 5: Add the current age of the dog to the difference in years to get the age at graduation
  const ageAtGraduationInYears = differenceInYears + currentAge - currentAge;

  return Math.floor(ageAtGraduationInYears);
};
