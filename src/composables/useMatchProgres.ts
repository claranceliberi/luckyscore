import { MatchStatusEnum } from "@/types/global";
import moment from "moment";
import { ref } from "vue";

const currentMatchMinute = ref();

export function useMatchProgress(
  match_status: MatchStatusEnum,
  first_half_started_at: string,
  second_half_started_at: string,
) {
  if (match_status === MatchStatusEnum.FIRST_HALF_ONGOING) {
    const currentDate = moment(new Date()).format("DD/MM/YYYY, h:mm:ss a");
    const started = moment(new Date()).format(
      `DD/MM/YYYY, ${first_half_started_at}`,
    );

    currentMatchMinute.value = moment(currentDate).diff(started, "minutes");
  }

  if (match_status === MatchStatusEnum.SECOND_HALF_ONGOING) {
    const currentDate = moment(new Date()).format("DD/MM/YYYY, h:mm:ss a");
    const started = moment(new Date()).format(
      `DD/MM/YYYY, ${second_half_started_at}`,
    );

    currentMatchMinute.value =
      moment(currentDate).diff(started, "minutes") + 45;
  }

  return currentMatchMinute;
}
