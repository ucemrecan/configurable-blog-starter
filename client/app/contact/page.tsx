'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export default function ContactPage() {
  const [contact, setContact] = useState({
    email: 'contact@example.com',
    social_media: {} as Record<string, string>,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const config = await apiClient.getConfig();
      setContact(config.contact);
    } catch (error) {
      console.error('Failed to load config:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        Contact
      </h1>
      <div className="space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Feel free to reach out to me! I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Email
            </h3>
            <p className="text-gray-700">
              <a
                href={`mailto:${contact.email}`}
                className="text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                {contact.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Social Media
            </h3>
            <div className="flex space-x-4">
              {contact.social_media.twitter && (
                <a
                  href={contact.social_media.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 underline transition-colors"
                >
                  Twitter
                </a>
              )}
              {contact.social_media.github && (
                <a
                  href={contact.social_media.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 underline transition-colors"
                >
                  GitHub
                </a>
              )}
              {contact.social_media.linkedin && (
                <a
                  href={contact.social_media.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 underline transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
