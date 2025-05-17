import https from 'https';
import fs from 'fs/promises';
import path from 'path';

const iconUrl = 'https://i.imgur.com/AM0BZyD_d.webp?maxwidth=512&fidelity=high';
const outputPath = 'src/assets/icon.png';

async function downloadIcon() {
  try {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    return new Promise((resolve, reject) => {
      https.get(iconUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download icon: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(outputPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Icon downloaded successfully');
          resolve();
        });

        fileStream.on('error', (err) => {
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error downloading icon:', error);
    throw error;
  }
}

downloadIcon()
  .then(() => console.log('Icon download completed'))
  .catch(console.error);