import { auth } from '@/auth';
import {
  Avatar,
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function Header() {
  const session = await auth();
  let authContent: ReactNode;

  if (session?.user)
    authContent = (
      <Avatar
        src={session.user.image || ''}
        alt="User"
      />
    );
  else
    authContent = (
      <>
        <NavbarItem>
          <Button
            type="submit"
            color="secondary"
            variant="bordered"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            type="submit"
            color="primary"
            variant="flat"
          >
            Sign Up
          </Button>
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
