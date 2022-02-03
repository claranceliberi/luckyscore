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
  return content.currentDateTime;
}

export function calculateTimeDifferenceInMinutes(
  started: string,
  current: string,
) {
  const startTimes = started.split(":");
  const currentTimes = current.split(":");

  const startSecs =
    Number(startTimes[0]) * 60 * 60 +
    Number(startTimes[1]) * 60 +
    Number(startTimes[2]);
  const currentSecs =
    Number(currentTimes[0]) * 60 * 60 +
    Number(currentTimes[1]) * 60 +
    Number(currentTimes[2]);

  let number = (currentSecs - startSecs) / 60;
  number = number > 0 ? number : 0;

  return parseInt(number + "");
}

//function to return hours, minutes and seconds from given date
export function getTime(date: Date) {
  const currentTime = new Date(date);
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  return `${currentHours}:${currentMinutes}:${currentSeconds}`;
}
