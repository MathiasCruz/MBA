export function getAgeFrom(date) {
  if (!date) {
    return '?';
  }
  const [BirthYear, BirthMonth, BirthDay] = date.split('-');
  let actualDate = new Date();
  let today = {
    year: actualDate.getFullYear(),
    month: actualDate.getMonth() + 1,
    day: actualDate.getDay(),
  };
  let age = today.year - parseInt(BirthYear);
  if (parseInt(BirthMonth) > today.month) {
    return (age -= 1);
  }
  if (parseInt(BirthMonth) === today.month && parseInt(BirthDay) > today.day) {
    return (age -= 1);
  }
  return age;
}
