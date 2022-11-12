import { participantsSchema } from "../schemas/participants.js";

export function validateParticipant (participant, response) {

    const validation = participantsSchema.validate(participant, {abortEarly: false})

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        response.status(422).send(errors)
        return false
    }
    return true
}