import { stripHtml } from "string-strip-html";

export function sanitization(object, boolean) {
    if (boolean) {
        //participant
        let { name } = object;

        name = stripHtml(name).result.trim();
        return;
    }
    //message
    let { type, from, to, text } = object;

    type = stripHtml(type).result.trim();
    from = stripHtml(from).result.trim();
    to = stripHtml(to).result.trim();
    text = stripHtml(text).result.trim();
}
