export interface wsMessage {
  messageType: "exchangeData" | "joinRoom";
  data: Object;
}
