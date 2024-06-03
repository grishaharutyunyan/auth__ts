import CustomHttpError from "./CustomHttpError";

class ValidationError extends CustomHttpError {
    constructor(message: string = "Validation Error") {
        super(message, 400);
    }
}

export default ValidationError;
