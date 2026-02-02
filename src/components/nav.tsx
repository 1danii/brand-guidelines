import { Accordion } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "../lib/cn";
import { getAllPages } from "../lib/content";

export async function Nav() {
  const pages = await getAllPages();
  const rootIdx = pages.findIndex((page) => page.slug.length === 0);
  pages.unshift(pages.splice(rootIdx, 1)[0]);

  return (
    <Accordion.Root className="flex flex-col gap-y-4">
      {pages.map((page) => {
        const href = page.slug.length === 0 ? "/" : `/${page.slug[0]}`;
        const key = page.slug.length === 0 ? "index" : page.slug[0];
        return (
          <NavItem href={href} key={key}>
            {page.title}
          </NavItem>
        );
      })}
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
      <Accordion.Panel className="flex h-(--accordion-panel-height) flex-col overflow-hidden opacity-100 transition-[height,opacity] duration-300 ease-in-out data-ending-style:h-0 data-starting-style:h-0 data-ending-style:opacity-0 data-starting-style:opacity-0">
        <div className="flex flex-col gap-y-1 pt-3">{children}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
