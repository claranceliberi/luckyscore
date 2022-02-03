export async function getCurrentTime(): Promise<string> {
  const rawResponse = await fetch(
    "https://world-clock.p.rapidapi.com/json/utc/now",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "world-clock.p.rapidapi.com",
        "x-rapidapi-key": "3c9ea630f3msh9837a71cf695b9ap1e13afjsnfebd187ddce9",
      },
    },
  );
  const content = await rawResponse.json();
  console.log(content);
  return content.currentDateTime;
}

export function calculateTimeDifferenceInMinutes(
  started: string,
  current: string,
) {
  console.log(started, current);
  const startTimes = started.split(":");
  const currentTimes = current.split(":");

  startTimes[0] = exceeds12Checker(startTimes[0]);
  currentTimes[0] = exceeds12Checker(currentTimes[0]);

  //   exceeds12Checker(startTimes[0]);

  const startSecs =
    Number(startTimes[0]) * 60 * 60 +
    Number(startTimes[1]) * 60 +
    Number(startTimes[2]);
  const currentSecs =
    Number(currentTimes[0]) * 60 * 60 +
    Number(currentTimes[1]) * 60 +
    Number(currentTimes[2]);

  return parseInt((currentSecs - startSecs) / 60 + "");
}

//function to return hours, minutes and seconds from given date
export function getTime(date: Date) {
  const currentTime = new Date(date);
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  return `${currentHours}:${currentMinutes}:${currentSeconds}`;
}

export function exceeds12Checker(date: string) {
  const number = Number(date);
  if (number > 12) {
    return (number - 12).toString();
  }
  return date;
}
