'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { getIronSessionPassword } from './utils/env.ts';
import { redirect } from 'next/navigation';
import { Pages } from './pages.ts';

export interface Session {
  isLoggedIn: boolean;
}

export async function getSession(): Promise<Session> {
  const session = await getIronSessionData();
  return {
    isLoggedIn: session.isLoggedIn || false,
  };
}

export async function sessionGuard() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect(Pages.LOGIN);
  }
}

export async function extendSession() {
  const session = await getIronSessionData();
  await session.save();
}

export async function saveAuthenticatedSession() {
  const session = await getIronSessionData();
  session.isLoggedIn = true;
  await session.save();
}

export async function destroySession() {
  const session = await getIronSessionData();
  session.destroy();
}

async function getIronSessionData() {
  const cookieStore = await cookies();
  return getIronSession<Session>(cookieStore, {
    password: getIronSessionPassword(),
    cookieName: 'session',
  });
}
