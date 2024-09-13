let dateNow = new Date(Date.now());
let nextDates: Date[] = [];

for (let i = 0; i <= 30; i++) {
  let newDate = new Date(dateNow);
  newDate.setDate(dateNow.getDate() + i);
  nextDates.push(newDate);
}

const result = nextDates.map((i) => {
  return {
    name: i.toLocaleDateString(),
    value: i.getDay(),
  };
});
console.log(result);