export const getPayload = (status, payload) => {
    switch(status) {
        case "error":
            return {data: null, status, errors: payload}
        // case "pending":
        //     return {data: payload, status, errors: null}
        // case "success":
        //     return {data: payload, status, errors: null}
        default:
            return {data: payload, status, errors: null}
    }
}