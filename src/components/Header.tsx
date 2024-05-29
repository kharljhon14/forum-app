import { auth } from '@/auth';
import {
  Avatar,
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';

import * as actions from '@/actions';

export default async function Header() {
  const session = await auth();
  let authContent: ReactNode;

  if (session?.user)
    authContent = (
      <Popover placement="bottom">
        <PopoverTrigger>
          <Avatar
            src={session.user.image || ''}
            alt="User"
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  else
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button
              type="submit"
              color="secondary"
              variant="bordered"
            >
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button
              type="submit"
              color="primary"
              variant="flat"
            >
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link
          href="/"
          className="font-bold"
        >
          Elephant
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Input placeholder="Search" />
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}
