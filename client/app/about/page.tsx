'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export default function AboutPage() {
  const [about, setAbout] = useState({
    bio: '',
    skills: [] as string[],
    experience: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const config = await apiClient.getConfig();
      setAbout(config.about);
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
        About Me
      </h1>
      <div className="space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          {about.bio}
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {about.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {about.experience}
          </p>
        </div>
      </div>
    </div>
  );
}
