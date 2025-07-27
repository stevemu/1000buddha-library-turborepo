import { redirect } from 'next/navigation';
import { getSession } from '../../session.ts';
import { Pages } from '../../pages.ts';

export async function HomeRedirectPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect(Pages.BOOKS);
  } else {
    redirect(Pages.LOGIN);
  }

  return null;
}
