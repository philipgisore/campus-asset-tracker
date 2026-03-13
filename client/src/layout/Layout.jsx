import Header from "../components/Header";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* Outer padding wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header renders automatically */}
        <Header title={title} subtitle={subtitle} />

        {/* Page content */}
        <main>
          {children}
        </main>

      </div>
    </div>
  );
}