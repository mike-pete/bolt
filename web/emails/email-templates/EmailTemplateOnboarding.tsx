import {
  Body,
  Button,
  Column,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import TailwindConfig from "./TailwindConfig";

const EmailTemplateOnboarding: React.FC<{ NEXT_PUBLIC_URL: string }> = ({
  NEXT_PUBLIC_URL = "http://localhost:3000",
}) => {
  return (
    <Html>
      <Tailwind config={TailwindConfig}>
        <Body className="mx-auto my-auto font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-lg border-2 border-solid border-zinc-300 bg-zinc-50 p-6">
            <Section className="">
              <Row>
                <Column align="left">
                  <Img src={`${NEXT_PUBLIC_URL}/email-bolt.png`} height="40" />
                </Column>
              </Row>
            </Section>

            <Section className="pb-8 pt-8">
              <Heading className="m-0 text-base font-semibold text-black">
                Welcome to Bolt!
              </Heading>
              <Text className="m-0 text-[14px] text-black">
                The next step is easy. Hit that big button below and install the
                Chrome extension!
              </Text>
            </Section>

            <Section>
              <Row>
                <Column align="center">
                  <Button
                    className="rounded-lg bg-[#f47a0c] px-5 py-3 text-center text-base font-semibold text-white no-underline"
                    href="https://boltapply.com/download"
                  >
                    Download the Extension
                  </Button>
                  <Text className="text-[14px]">
                    or copy and paste this URL into your browser:{" "}
                    <Link
                      href="https://boltapply.com/download"
                      className="text-blue-600 no-underline"
                    >
                      https://boltapply.com/download
                    </Link>
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-6 w-full border border-solid border-zinc-300" />

            <Section>
              <Row className="py-4">
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
                    twitter.com/mik_pete
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailTemplateOnboardingText =
  "Welcome to Bolt! The next step is easy. Hit that big button below and install the Chrome extension! Download the Extension or copy and paste this URL into your browser: https://boltapply.com/download Hi, I'm Mike 👋 I'm building Bolt to make your job search easier. So if you run into issues, or have suggestions on how we can improve, please reach out! Mike Peterson";

export default EmailTemplateOnboarding;
