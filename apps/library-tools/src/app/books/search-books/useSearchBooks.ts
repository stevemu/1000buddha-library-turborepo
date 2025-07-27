import { useState } from 'react';
import { searchBooksAction } from './searchBooksAction.ts';
import { BookResponse } from '@repo/book/BookResponse';
import { logError } from '@repo/client-logger/log';
import { SearchBooksResponse } from '@repo/book/SearchBooks';
import { BookSearchInitialOption } from './InitialOption.ts';

export function useSearchBooks({
  onError,
  initialValues,
  onSearchSuccess,
  onSearchClickSuccess,
}: {
  onError: (error: string) => void;
  initialValues: {
    totalBookCount: number;
    currentPageBooks: BookResponse[];
  };
  onSearchSuccess: () => void;
  onSearchClickSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageBooks, setCurrentPageBooks] = useState<BookResponse[]>(
    initialValues.currentPageBooks,
  );
  const [page, setPage] = useState(BookSearchInitialOption.PAGE);
  const [pageSize, setPageSize] = useState(BookSearchInitialOption.PAGE_SIZE);
  const [totalBookCount, setTotalBookCount] = useState(initialValues.totalBookCount);

  const handleSearchClick = async () => {
    try {
      setIsLoading(true);
      setPage(BookSearchInitialOption.PAGE);
      const response = await searchBooksAction({
        searchTerm,
        page: BookSearchInitialOption.PAGE,
        pageSize,
      });
      handleSearchClickSuccess(response);
    } catch (e) {
      logError({ message: 'handleSearchClick failed', error: e as Error });
      handleSearchClickError();
    }
  };

  const handleSearchClickSuccess = (response: SearchBooksResponse) => {
    setCurrentPageBooks(response.currentPageBooks);
    setTotalBookCount(response.totalBookCount);
    setIsLoading(false);
    onSearchClickSuccess();
  };

  const handleSearchClickError = () => {
    onError('Search failed.');
    setIsLoading(false);
  };

  const search = async ({
    searchTerm,
    page,
    pageSize,
  }: {
    searchTerm: string;
    page: number;
    pageSize: number;
  }) => {
    try {
      setIsLoading(true);
      const response = await searchBooksAction({ searchTerm, page, pageSize });
      handleSearchSuccess(response);
    } catch (e) {
      logError({ message: 'search failed', error: e as Error });
      handleSearchError();
    }
  };

  const handleSearchSuccess = (response: SearchBooksResponse) => {
    setCurrentPageBooks(response.currentPageBooks);
    setTotalBookCount(response.totalBookCount);
    setIsLoading(false);
    onSearchSuccess();
  };

  const handleSearchError = () => {
    onError('Getting updated search results failed.');
    setIsLoading(false);
  };

  const handleClearClick = async () => {
    setSearchTerm(BookSearchInitialOption.SEARCH_TERM);
    setPage(BookSearchInitialOption.PAGE);
    await search({
      searchTerm: BookSearchInitialOption.SEARCH_TERM,
      page: BookSearchInitialOption.PAGE,
      pageSize,
    });
  };

  const reSearch = async () => {
    await search({ searchTerm, page, pageSize });
  };

  const handleChangePageClick = async (newPage: number) => {
    setPage(newPage);
    await search({ searchTerm, page: newPage, pageSize });
  };

  const handleChangeRowsPerPageClick = async (newPageSize: number) => {
    setPageSize(newPageSize);
    await search({ searchTerm, page, pageSize: newPageSize });
  };

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return {
    handleClearClick,
    currentPageBooks,
    isLoading,
    searchTerm,
    handleSearchTermChange,
    reSearch,
    handleChangePageClick,
    handleChangeRowsPerPageClick,
    handleSearchClick,
    page,
    pageSize,
    totalBookCount,
  };
}
