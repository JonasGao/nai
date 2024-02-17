import { useEffect } from "react";
import { FeedingRecord } from "../components/Item";

export function alertError(message: string) {
  document.dispatchEvent(alertErrorEvent({ message }));
}

export function alertErrorEvent(detail: AlertErrorDetail) {
  return new CustomEvent<AlertErrorDetail>("alert-error", {
    detail: detail,
  });
}

export function useAlertErrorEvent(
  listener: (event: CustomEvent<AlertErrorDetail>) => void,
) {
  useEffect(() => {
    document.addEventListener("alert-error", listener);
    return () => {
      document.removeEventListener("alert-error", listener);
    };
  }, [listener]);
}

export function newFeedingRecordEvent(detail: NewFeedingRecordDetail) {
  return new CustomEvent<NewFeedingRecordDetail>("new-feeding-record", {
    detail: detail,
  });
}

export function newFeedingRecord(data: FeedingRecord) {
  document.dispatchEvent(newFeedingRecordEvent({ data }));
}

export function useNewFeedingRecordEvent(
  listener: (event: CustomEvent<NewFeedingRecordDetail>) => void,
) {
  useEffect(() => {
    document.addEventListener("new-feeding-record", listener);
    return () => {
      document.removeEventListener("new-feeding-record", listener);
    };
  }, [listener]);
}
