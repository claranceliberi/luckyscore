import { MatchStatusEnum } from "@/types/global";
import moment from "moment";
import { ref } from "vue";
import {
  calculateTimeDifferenceInMinutes,
  getCurrentTime,
  getTime,
} from "./useTime";

const currentMatchMinute = ref();

export function useMatchProgress(
  match_status: MatchStatusEnum,
  first_half_started_at: string,
  second_half_started_at: string,
) {
  async function calculateTime() {
    if (match_status === MatchStatusEnum.FIRST_HALF_ONGOING) {
      const date = new Date(await getCurrentTime());
      const minutes = calculateTimeDifferenceInMinutes(
        first_half_started_at,
        getTime(date),
      );
      currentMatchMinute.value =
        minutes <= 45 ? minutes : 45 + "+" + (minutes - 45);
    }
    if (match_status === MatchStatusEnum.SECOND_HALF_ONGOING) {
      const date = new Date(await getCurrentTime());
      const minutes = calculateTimeDifferenceInMinutes(
        second_half_started_at,
        getTime(date),
      );
      currentMatchMinute.value =
        minutes <= 45 ? 45 + minutes : 90 + "+" + (minutes - 45);
    }

    localStorage.setItem("currentTime", currentMatchMinute.value);
  }

  calculateTime();
  setInterval(calculateTime, 50000);
  return { currentMatchMinute };
}

//make function to return difference between two date in minutes without using moment
const calculateTimeDiff = (data1: Date, data2: Date) => {
  const date1 = new Date(data1);
  const date2 = new Date(data2);
  console.log(date1.getTime());
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
  return diffMinutes;
};
