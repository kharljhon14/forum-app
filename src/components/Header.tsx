import { Input, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import HeaderAuth from './HeaderAuth';

export default function Header() {
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
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
