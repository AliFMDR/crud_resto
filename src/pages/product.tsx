import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // Impor file CSS AOS

export default function Users(props) {
  useEffect(() => {
    AOS.init(); // Inisialisasi AOS
  }, []);

  const { dataPosts } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dataPosts.map((post, index) => (
        <motion.div
          key={post.id}
          className="relative bg-gradient-to-br from-green-400 to-blue-500 text-white p-4 shadow-md"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} // Atribut AOS yang berbeda-beda
        >
          <div
            className="mb-2"
            style={{
              backgroundImage: `url('https://source.unsplash.com/random/300x200/?${post.id}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "200px", // Atur tinggi sesuai kebutuhan Anda
            }}
          />
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-100">{post.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const dataPosts = await res.json();

  return {
    props: {
      dataPosts,
    },
  };
}
