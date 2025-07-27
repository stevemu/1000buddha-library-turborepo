import { AppBar } from '../../components/AppBar/AppBar.tsx';
import { Stack } from '@repo/mui/Stack';

export const NotesPage = () => {
  return (
    <>
      <AppBar title={'Notes'} />
      <Stack sx={{ p: 2 }} direction={'column'} spacing={1}>
        <h2>智开 notes</h2>
        <p>
          当创建一本书的副本的时候，“只要是作者和書名相同，就可以了，不必計較那一出版社和年份，但如果是同一作者和書名但是新訂本或增訂本那就算是新書。”
        </p>
        <p>
          開始的字母除了’B’ 我們用得最多外，還有’A’ 代表英文書，’P’
          代表館內藏書不外借的，另外還有’R’ 代表慈氏圖書館內的藏書.
        </p>
        <h2>Book entry steps</h2>
        <ol>
          <li>
            Adds books to the UI, generates spine labels and barcodes, and then creates a CSV file.
            This CSV file is sent to Patrick in Hong Kong for upload to the online library at{' '}
            <a href={'https://elibrary.manhinworkshop.com.hk/MBSSI/'}>
              千佛寺图书馆 Manhin Library
            </a>
          </li>
          <li>
            When 智开 enters a book, he references the{' '}
            <a href={'http://www.gaya.org.tw/library/book/query.asp'}>
              香光尼眾佛學院圖書館書目檢索
            </a>{' '}
            and reuses the 項目類別 (Category) and 分類號 (Classification Number).
          </li>
          <li>
            CSV Generation: Before sending the CSV, 智开 transfers the data into an Excel file to
            ensure it meets the specific format required by Hong Kong.
          </li>
        </ol>
        <h2>Translations</h2>
        <ol>
          <li>類別 category</li>
          <li>條碼 barcode</li>
          <li>著者 author</li>
          <li>書題 title</li>
          <li>分類號 classification number</li>
          <li>著者號 author number</li>
          <li>出版地 place of publication</li>
          <li>出版社 publisher</li>
          <li>出版年 year published</li>
          <li>冊次複本 copy number</li>
        </ol>
        <h2>Tips</h2>
        <ul>
          <li>
            On the books table, press Shift key and click the next row to select multiple rows.
          </li>
          <li>On the search field, press Enter to search.</li>
        </ul>
      </Stack>
    </>
  );
};
