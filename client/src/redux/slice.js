

// ACTIONS

const RECENT_MESSAGES_RECEIVED = "/messages/recent-received";
const SINGLE_MESSAGE_RECEIVED = "/messages/single-received";

export default function messagesReducer(messages = [], action) {
    switch (action.type) {
        case RECENT_MESSAGES_RECEIVED:
            return action.payload.messages;
        case SINGLE_MESSAGE_RECEIVED:
            return [...messages, action.payload.message];
        default:
            return messages;
    }
}

export function recentMessagesReceived(messages) {
    return {
        type: RECENT_MESSAGES_RECEIVED,
        payload: { messages },
    };
}

export function singleMessageReceived(message) {
    return {
        type: SINGLE_MESSAGE_RECEIVED,
        payload: { message },
    };
}

