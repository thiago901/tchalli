import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

import configUploads from '@config/multerConfig';
import IStorageProvider from '../models/IStorageProvider';

class GoogleCloudStorage implements IStorageProvider {
  private client: Storage;

  constructor() {
    this.client = new Storage({
      keyFilename: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'keyGoogleStorage.json',
      ),
      projectId: 'topgain',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(configUploads.folderTemp, file);

    await this.client.bucket('lms-topgain').upload(originalPath, {
      public: true,
      predefinedAcl: 'publicRead',
    });

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    try {
      await this.client.bucket('lms-topgain').file(file).delete();
    } catch {
      console.log(`Arquivo "${file}", não encontrado`);
    }
  }
}
export default GoogleCloudStorage;
