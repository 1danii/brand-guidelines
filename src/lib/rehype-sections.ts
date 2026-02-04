import type { Element, Root, RootContent } from "hast";
import type { Plugin } from "unified";

interface SectionOptions {
  frontmatter: {
    title: string;
    description: string;
  };
}

// Top-level regex for performance
const HEADING_REGEX = /^h[1-6]$/;

/**
 * Check if a node is a heading element (h1-h6)
 */
function isHeading(node: Element): boolean {
  return HEADING_REGEX.test(node.tagName);
}

/**
 * Check if an element contains any headings in its children
 */
function containsHeading(node: Element): boolean {
  if (isHeading(node)) {
    return true;
  }

  for (const child of node.children ?? []) {
    if (
      (child.type === "element" || child.type === "mdxJsxFlowElement") &&
      containsHeading(child as Element)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Split children at the first heading
 */
function splitAtFirstHeading(
  children: Element["children"]
): [Element["children"], Element["children"]] {
  const before: Element["children"] = [];
  const after: Element["children"] = [];
  let foundHeading = false;

  for (const child of children) {
    if (foundHeading) {
      after.push(child);
    } else if (
      (child.type === "element" || child.type === "mdxJsxFlowElement") &&
      isHeading(child as Element)
    ) {
      foundHeading = true;
      after.push(child);
    } else {
      before.push(child);
    }
  }

  return [before, after];
}

/**
 * Create a Section element wrapper
 */
function createSection(children: RootContent[]): Element {
  return {
    type: "element",
    tagName: "Section",
    properties: {},
    children: children as Element["children"],
  };
}

/**
 * Create a Columns element wrapper
 */
function createColumns(children: Element["children"]): Element {
  return {
    type: "element",
    tagName: "Columns",
    properties: {},
    children,
  };
}

/**
 * Create an h1 element
 */
function createHeading1(text: string): Element {
  return {
    type: "element",
    tagName: "h1",
    properties: {},
    children: [{ type: "text", value: text }],
  };
}

/**
 * Create a paragraph element
 */
function createParagraph(text: string): Element {
  return {
    type: "element",
    tagName: "p",
    properties: {},
    children: [{ type: "text", value: text }],
  };
}

/**
 * Handle a container element (like Columns) that contains a heading
 */
function handleContainerWithHeading(
  child: Element,
  sections: Element[],
  currentSectionChildren: RootContent[]
): void {
  const [before, after] = splitAtFirstHeading(child.children);

  // If there's content before the heading, add it to the previous section
  if (before.length > 0) {
    const beforeContainer = { ...child, children: before };
    if (sections.length > 0) {
      const lastSection = sections.at(-1);
      if (lastSection) {
        lastSection.children.push(beforeContainer);
      }
    } else {
      currentSectionChildren.push(beforeContainer);
    }
  }

  // Create a new section with the heading and everything after
  if (after.length > 0) {
    const afterContainer = { ...child, children: after };
    currentSectionChildren.push(afterContainer);
  }
}

/**
 * Process a single child element and update sections
 */
function processChild(
  child: RootContent,
  sections: Element[],
  currentSectionChildren: RootContent[]
): void {
  if (child.type !== "element" && child.type !== "mdxJsxFlowElement") {
    currentSectionChildren.push(child);
    return;
  }

  const element = child as Element;

  if (!containsHeading(element)) {
    currentSectionChildren.push(child);
    return;
  }

  // Found a heading - close current section first
  if (currentSectionChildren.length > 0) {
    sections.push(createSection([...currentSectionChildren]));
    currentSectionChildren.length = 0;
  }

  if (isHeading(element)) {
    currentSectionChildren.push(child);
  } else {
    handleContainerWithHeading(element, sections, currentSectionChildren);
  }
}

/**
 * Rehype plugin to wrap content in sections based on headings
 * - First section: title/description from frontmatter + content until first heading
 * - Subsequent sections: each heading starts a new section until next heading
 * - Headings inside grid components (Columns, etc.) trigger section breaks before the grid
 */
export const rehypeSections: Plugin<[SectionOptions], Root> =
  (options) => (tree) => {
    const { frontmatter } = options;
    const sections: Element[] = [];
    const currentSectionChildren: RootContent[] = [];

    // Create the header section with frontmatter
    const headerColumns = createColumns([
      createHeading1(frontmatter.title),
      createParagraph(frontmatter.description),
    ]);
    currentSectionChildren.push(headerColumns);

    // Process all children
    for (const child of tree.children) {
      processChild(child, sections, currentSectionChildren);
    }

    // Close the last section if there are remaining children
    if (currentSectionChildren.length > 0) {
      sections.push(createSection([...currentSectionChildren]));
    }

    // Replace tree children with the wrapped sections
    tree.children = sections;
  };
