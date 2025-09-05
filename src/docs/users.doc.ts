export const getUsersDoc = {
    tags: ["Users"],
    summary: "Lista de todos usuários",
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: "Lista de usuários",
            content: {
                "application/json": {
                    example: [
                        {
                            id: 1,
                            name: "User Name",
                            email: "email@email.com",
                            role: "USER",
                            photoUrl: "default_photo_url",
                            isActive: true,
                            lastLogin: "2025-08-26T02:55:08.829Z",
                            passwordChangedAt: null,
                            refreshToken: null,
                            createdAt: "2025-08-26T02:49:19.000Z",
                            updatedAt: "2025-08-26T03:14:10.619Z",
                        },
                    ],
                },
            },
        },
    },
};

export const signUpUserDoc = {
    tags: ["Users"],
    summary: "Cadastro de usuário",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Lucas" },
                        email: { type: "string", example: "email@example.com" },
                        password: { type: "string", example: "123456" },
                        confirmPassword: { type: "string", example: "123456" },
                    },
                    required: ["name", "email", "password", "confirmPassword"],
                },
            },
        },
    },
    responses: {
        201: {
            description: "Cadastro de usuário",
            content: {
                "application/json": {
                    example: [
                        {
                            message: "Usuário criado com sucesso",
                            data: {
                                id: 5,
                                name: "User Name",
                                email: "email@example.com",
                                createdAt: "2025-09-05T11:25:28.915Z",
                                updatedAt: "2025-09-05T11:25:28.915Z",
                            },
                        },
                    ],
                },
            },
        },
        400: {
            description: "ERROR: E-mail já cadastrado.",
            content: {
                "application/json": {
                    example: {
                        statusCode: 400,
                        message: "E-mail já cadastrado.",
                    },
                },
            },
        },
    },
};

export const loginUserDoc = {
    tags: ["Users"],
    summary: "Login de usuário",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: { type: "string", example: "email@example.com" },
                        password: { type: "string", example: "123456" },
                    },
                    required: ["email", "password"],
                },
            },
        },
    },
    responses: {
        200: {
            description: "Login de usuário",
            content: {
                "application/json": {
                    example: [
                        {
                            message: "Autenticado do sucesso",
                            accessToken: "TOKEN DE ACESSO QUE FOI GERADO",
                            refreshToken: "REFRESH TOKEN QUE FOI GERADO",
                        },
                    ],
                },
            },
        },
        400: {
            description: "ERROR: Senha inválida",
            content: {
                "application/json": {
                    example: {
                        statusCode: 400,
                        message: "Senha inválida",
                    },
                },
            },
        },
        401: {
            description: "ERROR: Usuário desativado",
            content: {
                "application/json": {
                    example: {
                        statusCode: 401,
                        message: "Usuário desativado",
                    },
                },
            },
        },
        404: {
            description: "ERROR: E-mail inválido",
            content: {
                "application/json": {
                    example: {
                        statusCode: 404,
                        message: "E-mail inválido",
                    },
                },
            },
        },
    },
};
export const refreshTokenUserDoc = {
    tags: ["Users"],
    summary: "Refresh Token de usuário",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        refreshToken: {
                            type: "string",
                            example: "REFRESH TOKEN",
                        },
                    },
                    required: ["refreshToken"],
                },
            },
        },
    },
    responses: {
        200: {
            description: "Refresh Token gerado",
            content: {
                "application/json": {
                    example: [
                        {
                            message: "Autenticado do sucesso",
                            accessToken: "ACCESS TOKEN",
                            refreshToken: "REFRESH TOKEN",
                        },
                    ],
                },
            },
        },
        400: {
            description: "ERROR: Senha inválida",
            content: {
                "application/json": {
                    example: {
                        statusCode: 400,
                        message: "Senha inválida",
                    },
                },
            },
        },
        401: {
            description:
                "ERROR: Refresh token ausente ou Tipo de token inválido",
            content: {
                "application/json": {
                    examples: {
                        refreshTokenNull: {
                            summary: "Refresh token ausente",
                            value: {
                                statusCode: 401,
                                message: "Refresh token ausente",
                            },
                        },
                        refreshTokenInvalid: {
                            summary: "Tipo de token inválido",
                            value: {
                                statusCode: 401,
                                message: "Tipo de token inválido",
                            },
                        },
                        TokenInvalid: {
                            summary: "Token inválido",
                            value: {
                                statusCode: 401,
                                message: "Token inválido",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const usersDocs = {
    "/api/user/signup": {
        post: signUpUserDoc,
    },
    "/api/user/login": {
        post: loginUserDoc,
    },
    "/api/user/refresh": {
        post: refreshTokenUserDoc,
    },
    "/api/users": {
        get: getUsersDoc,
    },
};
