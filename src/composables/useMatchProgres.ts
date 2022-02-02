import { MatchStatusEnum } from "@/types/global";
import moment from "moment";
import { ref } from "vue";

const currentMatchMinute = ref();

export function useMatchProgress(
  match_status: MatchStatusEnum,
  first_half_started_at: string,
  second_half_started_at: string,
) {
  function calculateTime() {
    if (match_status === MatchStatusEnum.FIRST_HALF_ONGOING) {
      const currentDate = moment(new Date()).format("DD/MM/YYYY, H:mm:ss");
      const _started = moment(new Date()).format(
        `DD/MM/YYYY, ${first_half_started_at}`,
      );
      const started = moment(_started).format("DD/MM/YYYY, H:mm:ss");

      currentMatchMinute.value = moment(currentDate).diff(started, "seconds");
    }

    if (match_status === MatchStatusEnum.SECOND_HALF_ONGOING) {
      const currentDate = moment(new Date()).format("DD/MM/YYYY, H:mm:ss");
      const _started = moment(new Date()).format(
        `DD/MM/YYYY, ${second_half_started_at}`,
      );
      const started = moment(_started).format("DD/MM/YYYY, H:mm:ss");

      currentMatchMinute.value =
        moment(currentDate).diff(started, "minutes") + 45;
    }
  }

  calculateTime();
  setInterval(calculateTime, 40000);

  return { currentMatchMinute };
}
