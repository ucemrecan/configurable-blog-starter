import { profileData } from '@/lib/mockData';

export default function AboutPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        About Me
      </h1>
      <div className="space-y-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          {profileData.description}
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Full-stack web development</li>
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Node.js & Express</li>
            <li>Database design & management</li>
            <li>UI/UX design</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            With several years of experience in web development, I've worked on various projects
            ranging from small business websites to large-scale applications. I'm passionate about
            creating clean, efficient, and user-friendly web experiences.
          </p>
        </div>
      </div>
    </div>
  );
}

