export default function filterMessages(msg, user, limit) {
    msg = msg.filter(
        ({ from, to, type }) =>
            type === "message" ||
            type === "status" ||
            (type === "private_message" &&
                (from === user ||
                    to === user ||
                    to === "Todos" ||
                    to === "todos"))
    );

    msg = msg.slice(-limit);
    return msg;
}
