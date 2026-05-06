
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-charcoal/10 bg-stone p-6 hidden md:block">
        <h2 className="text-xl font-display font-bold text-sapphire mb-12">
          Admin<span className="text-forest">Panel</span>
        </h2>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 rounded bg-charcoal/5 text-charcoal border border-charcoal/10 font-medium">
            Gallery Images
          </a>
          <a href="#" className="block px-4 py-2 rounded text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors">
            Settings
          </a>
          <a href="/" className="block px-4 py-2 rounded text-charcoal/50 hover:text-charcoal mt-12 transition-colors">
            ← Back to Site
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
