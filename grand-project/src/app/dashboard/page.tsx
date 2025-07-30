'use client';

import { useState } from 'react';

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  experience: string;
  linkedin: string;
  projects: string;
  education: string;
  skills: string;
  certifications: string;
};

export default function HomePage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    experience: '',
    linkedin: '',
    projects: '',
    education: '',
    skills: '',
    certifications: '',
  });

  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/tailor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    try {
      const data = await res.json();
      setResult(data.tailoredResume);
    } catch {
      setResult('❌ Error generating resume. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-rose-100 to-purple-100 p-8">
  <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          AI Resume Tailor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'e.g., Amna Sajid' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'e.g., amna@example.com' },
            { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'e.g., +92-300-1234567' },
            { label: 'Address', name: 'address', type: 'text', placeholder: 'e.g., Karachi, Pakistan' },
            { label: 'Job Title', name: 'jobTitle', type: 'text', placeholder: 'e.g., Frontend Developer' },
            { label: 'LinkedIn URL', name: 'linkedin', type: 'text', placeholder: 'https://linkedin.com/in/yourname' },
            { label: 'Certifications', name: 'certifications', type: 'text', placeholder: 'e.g., AWS Certified Developer' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof FormDataType]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-2 outline-none transition-all"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1">Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Mention degrees and institutions (e.g., BSCS, MBA)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-2 h-20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your experience relevant to the job"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-2 h-24 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Projects</label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              placeholder="Describe key projects (e.g., E-commerce app using Django)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-2 h-24 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your skills (e.g., HTML, CSS, React, Django)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-2 h-20 outline-none transition-all"
              required
            />
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition-all"
          >
            Generate Tailored Resume
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Tailored Resume:</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
