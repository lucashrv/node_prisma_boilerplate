export const getUsersDoc = {
    tags: ["Users"],
    summary: "List all users",
    responses: {
        200: {
            description: "List of users",
            content: {
                "application/json": {
                    example: [
                        {
                            id: 1,
                            name: "Lucas",
                            email: "email@example.com",
                            createdAt: "2023-01-01T00:00:00.000Z",
                            updatedAt: "2023-01-01T00:00:00.000Z",
                        },
                    ],
                },
            },
        },
    },
};
