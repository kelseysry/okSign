const LOAD_MESSAGES = "message/LOAD_MESSAGES";

// action creator load all messages
const loadAllMessages = (messages, conversation_id) => ({
  type: LOAD_MESSAGES,
  messages,
  conversation_id,
});
