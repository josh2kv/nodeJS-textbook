// 버퍼:  어떤 데이터를 (작은 크기 단위로 나눠서) 처리하기 위해 (그 작은 크기로) 메모리에 미리 할당된 공간
// chunk: 스트림 속 버퍼
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

// 'data': 파일읽기가 시작될 때
readStream.on('data', chunk => {
  data.push(chunk);
  console.log('data: ', chunk, chunk.length);
});

// 'end': 파일읽기가 끝났을 때
readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
});

// 'error': 파일을 읽는 도중 에러가 발생했을 때
readStream.on('error', err => {
  console.log('error', err);
});
