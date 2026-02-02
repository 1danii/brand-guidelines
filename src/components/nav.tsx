"use client";

import { Accordion } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import type { PageData } from "@/lib/content";
import { cn } from "../lib/cn";

export function Nav({ pages }: { pages: PageData[] }) {
  // Move root page (index) to first position
  const sortedPages = [...pages];
  const rootIdx = sortedPages.findIndex((page) => page.slug.length === 0);
  if (rootIdx > 0) {
    sortedPages.unshift(sortedPages.splice(rootIdx, 1)[0]);
  }

  return (
    <Accordion.Root className="flex flex-col gap-y-4">
      {sortedPages.map((page) => {
        const href = page.slug.length === 0 ? "/" : `/${page.slug[0]}`;
        const key = page.slug.length === 0 ? "index" : page.slug[0];
        const hasHeadings = page.headings.length > 0;

        if (hasHeadings) {
          return (
            <NavFolder href={href} key={key} name={page.title}>
              {page.headings.map((heading) => (
                <NavFolderItem href={`${href}#${heading.id}`} key={heading.id}>
                  {heading.value}
                </NavFolderItem>
              ))}
            </NavFolder>
          );
        }

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
}: Pick<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link className={navItemStyles} href={href}>
      {children}
    </Link>
  );
}

function NavFolderItem({
  children,
  href,
}: Pick<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link className="text-brand text-sm" href={href}>
      {children}
    </Link>
  );
}

export function NavFolder({
  name,
  href,
  children,
}: PropsWithChildren<{ name: string; href: string }>) {
  const router = useRouter();
  return (
    <Accordion.Item className="group">
      <Accordion.Header>
        <Accordion.Trigger
          className={cn(navItemStyles, "flex items-center")}
          onClick={() => router.push(href)}
        >
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
