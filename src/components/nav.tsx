import { Accordion } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "../lib/cn";

export function Nav() {
  return (
    <Accordion.Root className="flex flex-col gap-y-4">
      <NavItem href="/">Introduction</NavItem>
      <NavFolder name="Home">
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
      </NavFolder>
      <NavFolder name="Home">
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
      </NavFolder>
      <NavFolder name="Home">
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
        <NavFolderItem href="/">Home</NavFolderItem>
      </NavFolder>
    </Accordion.Root>
  );
}

const navItemStyles = "font-medium text-sm text-brand";

function NavItem({
  children,
  href,
}: Pick<ComponentProps<"a">, "href" | "children">) {
  return (
    <a className={navItemStyles} href={href}>
      {children}
    </a>
  );
}
function NavFolderItem({
  children,
  href,
}: Pick<ComponentProps<"a">, "href" | "children">) {
  return (
    <a className="text-brand text-sm" href={href}>
      {children}
    </a>
  );
}
export function NavFolder({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <Accordion.Item className="group">
      <Accordion.Header>
        <Accordion.Trigger className={cn(navItemStyles, "flex items-center")}>
          {name}
          <ChevronDownIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-data-closed:-rotate-90" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="flex h-[var(--accordion-panel-height)] flex-col overflow-hidden opacity-100 transition-[height,opacity] duration-300 ease-in-out data-[ending-style]:h-0 data-[starting-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
        <div className="flex flex-col gap-y-1 pt-3">{children}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
