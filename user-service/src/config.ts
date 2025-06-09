import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	port: process.env.PORT || 3002,
	userServiceUrl: 'http://user-service',
	mongoURL: process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000',
	rabbitMQUrl: 'amqp://rabbitmq:5672',
	queue: 'user_queue',
	statusServiceUrl: 'http://status-service:3001/api/status',
};

export default config;