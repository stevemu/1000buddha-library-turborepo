export class ChineseFontFileReader {
  async readChineseFont() {
    const res = await fetch(
      'https://1000buddha-library-tools.s3.amazonaws.com/NotoSansTC-Regular.ttf',
    );
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  }
}
