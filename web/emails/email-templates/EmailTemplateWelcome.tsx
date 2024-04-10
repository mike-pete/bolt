import {
  Body,
  Column,
  Container,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import TailwindConfig from "./TailwindConfig";

const EmailTemplateWelcome: React.FC<{ NEXT_PUBLIC_URL: string }> = ({
  NEXT_PUBLIC_URL = "http://localhost:3000",
}) => {
  return (
    <Html>
      <Preview>Welcome to Bolt!</Preview>
      <Tailwind config={TailwindConfig}>
        <Body className="mx-auto my-auto font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-lg border-2 border-solid border-zinc-300 bg-zinc-50 p-6">
            <Row className="pb-8">
              <Column align="left">
                <Img src={`${NEXT_PUBLIC_URL}/email-bolt.png`} height="40" />
              </Column>
            </Row>

            <Row className="pb-6">
              <Column>
                <Text className="m-0 leading-snug">Hi, I&apos;m Mike 👋</Text>

                <Text className="m-0 py-2 leading-snug">
                  I&apos;m building Bolt to make your job search easier. So if
                  you run into issues, or have suggestions on how we can
                  improve, please reach out!
                </Text>
              </Column>
            </Row>

            <Row>
              <Column width={66} valign="middle">
                <Img
                  src={`${NEXT_PUBLIC_URL}/small_Mike.png`}
                  height={66}
                  width={66}
                  className="rounded-lg"
                />
              </Column>
              <Column className="pl-3" valign="middle">
                <Text className="m-0 font-semibold text-zinc-700">
                  Mike Peterson
                </Text>
                <Link
                  href="mailto:mike@boltapply.com"
                  className="inline py-1 text-blue-600 no-underline"
                >
                  mike@boltapply.com
                </Link>
                <Link
                  href="https://twitter.com/mik_pete"
                  className="block text-blue-600 no-underline"
                  target="_blank"
                >
                  https://twitter.com/mik_pete
                </Link>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailTemplateWelcomeText = `
Hi, I'm Mike 👋

I'm building Bolt to make your job search easier. 
So if you run into issues, or have suggestions on how we can improve, please reach out!

Mike Peterson

mike@boltapply.com
https://twitter.com/mik_pete
`;

export default EmailTemplateWelcome;
