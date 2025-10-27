export default function Projects() {
  // Placeholder projects list
  const projects = [
    { name: 'Project Alpha', description: 'A cutting-edge solution exploring modern web technologies.' },
    { name: 'Project Beta', description: 'A lightweight toolkit for rapid prototyping and iteration.' },
    { name: 'Project Gamma', description: 'An experimental playground for UI/UX concepts.' },
  ]

  return (
    <section className="py-10 px-10">
      <h2 className="page-header" >Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {projects.map((p) => (
          <div key={p.name} className="bg-white/40 border border-black/10 rounded-xl p-6 hover:bg-black/[0.07] transition">
            <h3 className="page-h3">{p.name}</h3>
            <p className="page-txt-black">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
