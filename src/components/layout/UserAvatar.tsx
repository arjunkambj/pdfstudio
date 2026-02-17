"use client";

import { Icon } from "@iconify/react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useStackApp, useUser } from "@stackframe/stack";

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return "?";
}

export default function UserAvatar() {
  const user = useUser();
  const app = useStackApp();

  const initials = getInitials(user?.displayName, user?.primaryEmail);

  return (
    <Dropdown placement="right-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          size="sm"
          name={initials}
          src={user?.profileImageUrl ?? undefined}
          className="cursor-pointer"
          color="primary"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu">
        <DropdownItem
          key="signout"
          startContent={
            <Icon icon="solar:logout-2-bold-duotone" className="text-lg" />
          }
          color="danger"
          onPress={() => app.signOut()}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
