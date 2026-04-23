import fs from 'fs';

async function download() {
  try {
    const res = await fetch('https://drive.google.com/uc?export=download&id=1fURZ3Bu8yMkPA0KyXAd7JN9QT8TzE1iE');
    
    if (!res.ok) {
      console.error('Failed to download:', res.status, res.statusText);
      return;
    }
    
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('./public/logo.png', Buffer.from(buffer));
    console.log('Downloaded successfully to ./public/logo.png');
  } catch (err) {
    console.error('Error:', err);
  }
}

download();
