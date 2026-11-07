import { Mail, ArrowUpRight, MapPin, BriefcaseBusiness } from "lucide-react";
import { SocialLinks } from "./Socials";
import Reveal from "./Reveal";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const emailSubject = encodeURIComponent(
      subject || "Project Inquiry - Portfolio",
    );

    const emailBody = encodeURIComponent(
      `Hello Dicky,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=dickysetia002%40gmail.com&su=${emailSubject}&body=${emailBody}`;
  };

  const inputClass =
    "w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500";
  const labelClass = "mb-2 block text-sm font-medium text-gray-300";

  return (
    <section id="contact" className="px-6 pb-12 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr]">
          {/* LEFT: CONTACT FORM */}
          <Reveal
            variant="left"
            className="rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 md:p-8"
          >
            <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Have a project
              <br />
              in mind?
              <span className="text-blue-500"> Let's talk.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400">
              Have an idea or a project in mind? Feel free to send me a message.
              I'd love to hear about it and discuss how we can work together.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this about?"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Mail size={18} />
                Send Message
                <ArrowUpRight size={17} />
              </button>
            </form>
          </Reveal>

          {/* RIGHT: CONTACT INFORMATION */}
          <Reveal
            variant="right"
            delay={150}
            className="flex flex-col gap-8 rounded-2xl border border-gray-800 bg-[#111827]/60 p-6 md:p-8"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Contact Information
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="mt-1 text-sm font-medium text-gray-200">
                      dickysetia002@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="mt-1 text-sm font-medium text-gray-200">
                      Bandung, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Availability</p>
                    <p className="mt-1 text-sm font-medium text-gray-200">
                      Open for freelance projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-7">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Connect with me
              </p>

              <SocialLinks className="mt-5" />
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#111827]/70 p-6">
              <span className="text-3xl text-blue-500">“</span>
              <h3 className="mt-1 text-xl font-semibold leading-relaxed text-white">
                Let's build something meaningful together.
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Good ideas become great products through collaboration.
              </p>
              <p className="mt-5 text-xs font-semibold text-blue-400">
                — Dicky Setiawan
              </p>
            </div>
          </Reveal>
        </div>

        {/* FOOTER */}
        <footer className="mt-24 flex flex-col gap-3 border-t border-gray-800 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Dicky Setiawan. All rights reserved.
          </p>
          <p>Designed & built with React and Tailwind CSS.</p>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
