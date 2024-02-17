type AlertErrorDetail = {
  title?: string;
  message: string;
};

type NewFeedingRecordDetail = {
  data: FeedingRecord;
};

interface GlobalEventHandlersEventMap {
  "alert-error": CustomEvent<AlertErrorDetail>;
  "new-feeding-record": CustomEvent<NewFeedingRecordDetail>;
}
