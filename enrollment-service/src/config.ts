import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3007,
    enrollemntServiceUrl: "http://enrollment-service",
    userServiceUrl: 'http://user-service:3002/api',
    courseServiceUrl: 'http://course-service:3003/api',
    lessonServiceUrl: 'http://lesson-service:3005/api',
    mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
    queue: 'enrollment_queue',
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    statusServiceUrl: 'http://status-service:3001/api/status',
};

export default config;