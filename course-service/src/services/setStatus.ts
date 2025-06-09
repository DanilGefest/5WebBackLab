import axios from 'axios';
import config from '../config';

export async function setStatus(requestId: string, data: unknown, status: string, message: string) {
    try {
        const statusServiceUrl = config.statusServiceUrl;

        await axios.post(`${statusServiceUrl}/${requestId}`, {
            status,
      data,
            message,
        });
        return true;
    } catch (error) {
        console.error('Ошибка при обновлении статуса:', error);
        return false;
    }
}