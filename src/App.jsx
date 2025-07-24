import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersonalWebsite() {
  return (
    <main className="bg-white text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-b from-gray-100 to-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Octavio Gutierrez</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          Health Tech Innovator advancing mental health access through modern telehealth solutions.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg rounded-full">Explore My Work</Button>
      </section>

      {/* About Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          I'm a software engineer with 12+ years of experience in backend systems and health tech. My work focuses on
          building scalable platforms that improve access to mental healthcare across underserved communities in North America.
        </p>
      </section>

      {/* Project Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">TheraLink</h3>
              <p className="text-gray-700 mb-4">
                A backend platform for teletherapy APIs, streamlining access to mental health services through secure, developer-friendly infrastructure.
              </p>
              <Button variant="outline">View Project</Button>
            </CardContent>
          </Card>
          {/* Add more projects here */}
        </div>
      </section>

      {/* Blog/Insights Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Insights & Thought Leadership</h2>
        <div className="space-y-6">
          <article>
            <h3 className="text-xl font-bold">Bridging Tech and Therapy: The Future of Digital Mental Health</h3>
            <p className="text-gray-700">A look at how backend engineering is shaping accessible, scalable mental health services.</p>
          </article>
          {/* Add more blog entries here */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-lg mb-6">Reach out if you're interested in collaboration, partnerships, or learning more about my work.</p>
        <Button variant="secondary">Contact Me</Button>
      </section>
    </main>
  );
}