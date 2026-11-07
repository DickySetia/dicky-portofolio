import { useState } from "react";

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Tambahkan data sertifikatmu di dalam array ini nanti.
  const certificates = [
    {
      id: 1,
      title: "Web Development",
      issuer: "RevoU",
      year: "2025",
      image: "/images/certificates/revou.png",
    },
    {
      id: 2,
      title: "Web Development",
      issuer: "Diginusa",
      year: "2025",
      image: "/images/certificates/diginusa.png",
    },
    
  ];

  return (
    <div className="mt-14">
      {certificates.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <article
              key={certificate.id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-[#111827]/60 transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <button
                type="button"
                onClick={() => setSelectedCertificate(certificate)}
                className="block w-full"
                aria-label={`View ${certificate.title}`}
              >
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>

              <div className="p-5">
                <h3 className="font-semibold text-white">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {certificate.issuer}
                </p>
                <p className="mt-2 text-xs text-gray-500">{certificate.year}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-700 px-6 py-14 text-center">
          <h3 className="text-lg font-semibold text-white">
            Certificates Coming Soon
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
            My certificates and learning achievements will be showcased here.
          </p>
        </div>
      )}

      {/* Certificate Preview */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500"
              aria-label="Close certificate preview"
            >
              ✕
            </button>

            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificates;
