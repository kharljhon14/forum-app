import { auth } from '@/auth';
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

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
      <NavbarContent justify="end">
        <NavbarItem>{session?.user ? <div>Signed In</div> : <div>Signed Out</div>}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
