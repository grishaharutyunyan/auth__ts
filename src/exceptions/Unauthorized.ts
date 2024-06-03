import CustomHttpError from "./CustomHttpError";

class UnauthorizedError extends CustomHttpError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export default UnauthorizedError;