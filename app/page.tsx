import { Asset } from "./components/blocks/asset";
import { Color } from "./components/blocks/color";
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
        <Grid>
          <Heading2>Colors</Heading2>
          <Paragraph>
            Adipisicing elit commodo adipisicing voluptate aliquip dolor ut. Ad
            nulla culpa Lorem adipisicing do velit elit enim laborum occaecat
            do. Cupidatat est consectetur enim deserunt dolore cillum. Et
            consectetur sit aliquip officia dolore aliqua anim fugiat. Et esse
            id irure non aliquip culpa enim ad anim non ut ut. Consectetur
            mollit consectetur et. Sint cillum aute Lorem cillum aliqua qui
            nostrud aute. Minim laboris laboris ad cillum ex in excepteur
            consectetur exercitation.
            <br />
            <br />
            Consequat ullamco cillum enim proident eiusmod cillum eu sint labore
            commodo deserunt non irure et. Nulla Lorem esse velit. Cupidatat
            aliquip nostrud proident cupidatat ut. Irure consequat nisi eu
            occaecat sunt tempor proident quis aliquip irure qui voluptate est.
            Voluptate deserunt commodo veniam occaecat. Amet excepteur dolore
            aliqua nostrud pariatur eiusmod adipisicing duis et cillum excepteur
            labore sunt elit occaecat. Et ut et tempor nisi ad laboris eiusmod
            sint labore dolore in tempor deserunt.
          </Paragraph>
        </Grid>
        <Grid>
          <Color hex="#dd2c00" />
          <Color hex="#f7f4ed" />
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
