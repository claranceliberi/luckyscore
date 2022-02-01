import { MatchStatusEnum } from "@/types/global";

export function isMatchLive(matchStatus: MatchStatusEnum) {
  return (
    matchStatus === MatchStatusEnum.FIRST_HALF_ONGOING ||
    matchStatus === MatchStatusEnum.HALF_TIME ||
    matchStatus === MatchStatusEnum.SECOND_HALF_ONGOING
  );
}
