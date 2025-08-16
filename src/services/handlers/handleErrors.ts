import AppError from "@/utils/appError";

// /* eslint-disable */

export class BadRequestException extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenException extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class NotFoundException extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
export class MethodNotAllowedException extends AppError {
    constructor(message = "Method Not Allowed") {
        super(message, 405);
    }
}
export class NotAcceptableException extends AppError {
    constructor(message = "Not Acceptable") {
        super(message, 406);
    }
}
export class RequestTimeoutException extends AppError {
    constructor(message = "Request Timeout") {
        super(message, 408);
    }
}
export class ConflictException extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}
export class GoneException extends AppError {
    constructor(message = "Gone") {
        super(message, 410);
    }
}
export class PayloadTooLargeException extends AppError {
    constructor(message = "Payload Too Large") {
        super(message, 413);
    }
}
export class UnsupportedMediaTypeException extends AppError {
    constructor(message = "Unsupported Media Type") {
        super(message, 415);
    }
}

export class UnprocessableEntityException extends AppError {
    constructor(message = "Unprocessable Entity") {
        super(message, 422);
    }
}

export class InternalServerErrorException extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}
export class NotImplementedException extends AppError {
    constructor(message = "Not Implemented") {
        super(message, 501);
    }
}
export class BadGatewayException extends AppError {
    constructor(message = "Bad Gateway") {
        super(message, 502);
    }
}
export class ServiceUnavailableException extends AppError {
    constructor(message = "Service Unavailable") {
        super(message, 503);
    }
}
export class GatewayTimeoutException extends AppError {
    constructor(message = "Gateway Timeout") {
        super(message, 504);
    }
}
