
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
definition: {
    openapi: "3.0.0",
    info: {
    title: "Content Moderation Service API",
    version: "1.0.0",
    description: "API for content moderation and user management",
    },
    servers: [{ url: "http://localhost:3000/api/v1", description: "Local" }],
    components: {
    securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
        Error: {
        type: "object",
        required: ["error","message"],
        properties: {
            error: { type: "string", example: "NOT_FOUND" },
            message: { type: "string", example: "Endpoint not found" }
        }
        },
        Post: {
        type: "object",
        properties: {
            id: { type: "string", example: "123" },
            content: { type: "string", example: "Sample post content here..." },
            author: { type: "string", example: "author_1" },
            isFlagged: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
        }
        },
        UserProfile: {
        type: "object",
        properties: {
            id: { type: "string", example: "user_1" },
            username: { type: "string", example: "sampleUser123" },
            bio: { type: "string" },
            isFlagged: { type: "boolean" },
            joinedAt: { type: "string", format: "date-time" },
            postsCount: { type: "integer", example: 45 }
        }
        }
    },
    },
    security: [{ bearerAuth: [] }],
},
apis: ["./src/api/v1/routes/*.ts"],
};

export const generateSwaggerSpec = () => swaggerJsdoc(swaggerOptions);
export default swaggerOptions;
