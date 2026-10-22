import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Services } from "@/components/Services";
import { Transfer } from "@/components/Transfer";
import { Visit } from "@/components/Visit";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <About />
      <Transfer />
      <Gallery />
      <Visit />
    </>
  );
}
