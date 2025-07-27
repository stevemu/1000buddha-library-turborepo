import { BooksPage } from './BooksPage.tsx';
import { searchBooksAction } from './search-books/searchBooksAction.ts';
import { BookSearchInitialOption } from './search-books/InitialOption.ts';

// force getting new data on page refresh
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { currentPageBooks, totalBookCount } = await searchBooksAction({
    searchTerm: BookSearchInitialOption.SEARCH_TERM,
    page: BookSearchInitialOption.PAGE,
    pageSize: BookSearchInitialOption.PAGE_SIZE,
  });
  return <BooksPage initialBooks={currentPageBooks} initialTotalCount={totalBookCount} />;
}
