import fs from 'fs';

async function download() {
  try {
    const res = await fetch('https://drive.google.com/uc?export=download&id=1AStzzcwmVhC_w4q8utTDYQYBMektUUua');
    
    if (!res.ok) {
      console.error('Failed to download:', res.status, res.statusText);
      return;
    }
    
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('./src/assets/logo.png', Buffer.from(buffer));
    console.log('Downloaded successfully to ./src/assets/logo.png');
  } catch (err) {
    console.error('Error:', err);
  }
}

download();
