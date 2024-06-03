import CustomHttpError from "./CustomHttpError";

class ConflictError extends CustomHttpError {
    constructor(message: string) {
        super(message, 409);
    }
}

export default ConflictError;
