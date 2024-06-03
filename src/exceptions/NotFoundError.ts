import CustomHttpError from "./CustomHttpError";

class NotFoundError extends CustomHttpError {
    constructor(message: string = "Not Found") {
        super(message, 400);
    }
}

export default NotFoundError;