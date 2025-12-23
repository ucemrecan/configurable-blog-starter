export default function ContactPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        Contact
      </h1>
      <div className="space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Feel free to reach out to me! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Email
            </h3>
            <p className="text-gray-700">
              <a
                href="mailto:contact@example.com"
                className="text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                contact@example.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

