import { app } from "./app";
import { fastifyCors } from "@fastify/cors"
import { 
    validatorCompiler, 
    serializerCompiler,
    jsonSchemaTransform
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import  { fastifySwaggerUi } from "@fastify/swagger-ui"
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true, // Production example: 'http://localhost:3000'

})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Referral Program',
            version: '0.0.1',
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(subscribeToEventRoute)

app.listen({ port: env.PORT }).then(() => {
    console.log('👽 HTTP Server Running!')
})