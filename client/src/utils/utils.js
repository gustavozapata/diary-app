exports.toDateString = (date) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (date) return new Date(date).toLocaleDateString("en-GB", dateOptions);
  return new Date().toLocaleDateString("en-GB", dateOptions);
};
