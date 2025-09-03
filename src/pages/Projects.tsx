export default function Projects() {
  // Placeholder projects list
  const projects = [
    { name: 'Project Alpha', description: 'A cutting-edge solution exploring modern web technologies.' },
    { name: 'Project Beta', description: 'A lightweight toolkit for rapid prototyping and iteration.' },
    { name: 'Project Gamma', description: 'An experimental playground for UI/UX concepts.' },
  ]

  return (
    <section className="py-12">
      <h2 className="text-5xl font-black mb-8">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div key={p.name} className="bg-black/5 border border-black/10 rounded-xl p-6 hover:bg-black/[0.07] transition">
            <h3 className="text-2xl font-semibold">{p.name}</h3>
            <p className="text-black text-lg md:text-xl mt-3">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
