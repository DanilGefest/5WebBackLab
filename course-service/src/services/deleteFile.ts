import fs from 'fs';

export default async function deleteFile(fileDir: string) {
	if (!fs.existsSync(fileDir)) {
		return;
	}

	try {
		fs.unlinkSync(fileDir);
	} catch (unlinkError) {
		console.error('Ошибка при удалении загруженного файла:', unlinkError);
	}
}
