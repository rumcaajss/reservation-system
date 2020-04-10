
export const generateDocId = function() {
  let currentDate = new Date();
  let key = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join('_');
  return key;
}

export const getCurrentDateHuman = function() {
  const monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  const currentMonth = new Date().getUTCMonth();
  const currentDay = new Date().getUTCDate();  
  let modTen = currentDay % 10;
  let modHundred = currentDay % 100;
  let suffix;
  if (modTen == 1 && modHundred != 11) {
      suffix = "st";
  }
  else if (modTen == 2 && modHundred != 12) {
      suffix = "nd";
  }
  else if (modTen == 3 && modHundred != 13) {
      suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${currentDay}${suffix} of ${monthNames[currentMonth]}`;
}
