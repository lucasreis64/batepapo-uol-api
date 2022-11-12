export function validation (participant, response, schema) {

    const validation = schema.validate(participant, {abortEarly: false})

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        response.status(422).send(errors)
        return false
    }
    return true
}
