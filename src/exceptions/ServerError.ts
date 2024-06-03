import CustomHttpError from "./CustomHttpError";

class ServerError extends CustomHttpError {
    constructor(message: string = "Internal Server Error") {
        super(message, 500);
    }
}

export default ServerError;