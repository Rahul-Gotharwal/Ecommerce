import React from 'react';

const About = () => {
  return (
    <section className="bg-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-indigo-600 mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Company</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero ut justo cursus, ut congue sapien hendrerit. Sed id malesuada lectus. Fusce interdum felis at mi dictum hendrerit. Sed tristique risus id massa iaculis, in ultricies metus venenatis.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Duis feugiat nisi a dui fringilla, at congue dolor vehicula. Nunc non diam ac arcu gravida tincidunt. Vivamus venenatis, lectus non vestibulum sodales, nisi libero suscipit erat, sit amet cursus nunc sapien ac odio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
