import { Asset } from "./components/blocks/asset";
import { Grid } from "./components/blocks/grid";
import { Heading1, Heading2 } from "./components/blocks/heading";
import { Image } from "./components/blocks/image";
import { Paragraph } from "./components/blocks/paragraph";
import { Section } from "./components/blocks/section";

export default function Home() {
  return (
    <>
      <Section>
        <Grid>
          <Heading1>Logo</Heading1>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
            <br />
            <br />
            Id pariatur voluptate sunt cillum quis eu consectetur culpa velit.
            Labore enim duis quis eiusmod veniam irure occaecat duis occaecat
            nostrud ex nisi. Nisi amet aliquip eu nostrud culpa fugiat mollit.
            Dolore labore consequat officia magna id. Aliquip qui ex commodo
            reprehenderit laborum. Reprehenderit enim sint ea duis minim commodo
            tempor ea.
            <br />
            <br />
            Amet sit irure culpa veniam laboris ullamco sit enim mollit
            consequat ipsum magna dolor. Reprehenderit commodo commodo ullamco
            quis. Cupidatat excepteur ipsum consequat dolore ad exercitation.
            Reprehenderit do qui sint nulla sunt pariatur commodo qui nulla
            commodo adipisicing consequat nisi ea. Lorem esse ea nostrud laboris
            qui ullamco occaecat enim eiusmod.
            <br />
          </Paragraph>
        </Grid>
        <Grid>
          <Asset alt="Logo" src="/brand/logo.svg" />
          <Asset alt="Logo" src="/brand/logo.svg" />
        </Grid>
      </Section>
      <Section>
        <Heading2>Hello World</Heading2>
        <Image alt="" src="/brand/avenga-najbrt-logo-1.jpg" />
        <Grid>
          <Image alt="" src="/brand/avenga-najbrt-logo-1.jpg" />
          <Image alt="" src="/brand/avenga-najbrt-logo-1.jpg" />
        </Grid>
      </Section>
    </>
  );
}
