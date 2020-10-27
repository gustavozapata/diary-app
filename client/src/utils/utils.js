//this function is used throughout the application
//it converts a JS date object into a more readable version e.g. 30 Oct, 2020 in iOS and 30/10/2020 in Android
exports.toDateString = (date) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (date) return new Date(date).toLocaleDateString("en-GB", dateOptions);
  return new Date().toLocaleDateString("en-GB", dateOptions);
};
