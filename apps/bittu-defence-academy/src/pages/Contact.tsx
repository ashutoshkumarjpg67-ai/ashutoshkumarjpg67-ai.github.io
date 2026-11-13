import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ScrollReveal from '../components/common/ScrollReveal';
import ContactChannels from '../components/contact/ContactChannels';
import ContactForm from '../components/contact/ContactForm';
import SectionHeading from '../components/common/SectionHeading';
import { academy } from '../data/academy';
import { usePageMeta } from '../lib/seo';

export default function Contact() {
  usePageMeta({
    title: 'Contact — Bittu Defence Academy, Gopalganj',
    description:
      'Contact Bittu Defence Academy at Minz Stadium, Gopalganj, Bihar. Call, WhatsApp or message the academy for training enquiries.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the academy."
        description="Call or message for training enquiries. Fees, batch timings and availability are confirmed directly by the academy — not published here."
        art="relay"
      />

      <section className="bg-ink py-14 sm:py-20" aria-labelledby="contact-details">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                id="contact-details"
                eyebrow="Direct lines"
                title="Call, message or visit."
                description={`Training takes place at ${academy.location.venue}, ${academy.location.city}, ${academy.location.state}.`}
              />

              <div className="mt-9">
                <ScrollReveal>
                  <ContactChannels />
                </ScrollReveal>
              </div>

              <div className="mt-8 border border-bone/10 p-5">
                <p className="label text-[0.55rem] text-gold/80">Best time to call</p>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">
                  Call during academy hours and the numbers above reach the academy directly. Batch
                  timings are shared on call rather than listed on this site.
                </p>
              </div>
            </div>

            <div>
              <ScrollReveal delay={0.08}>
                <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] text-bone">Enquiry form</h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
                  Fill in the fields below to check your enquiry. Validation runs in the browser — this
                  demonstration does not send or store any data.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-gold/10 bg-ink-deep py-16" aria-labelledby="contact-note">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p id="contact-note" className="max-w-2xl text-xs leading-relaxed text-mist/55">
              {academy.provisionalNote}
            </p>
            <p className="label shrink-0 text-[0.58rem] text-mist/40">
              {academy.category} · {academy.location.city}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
