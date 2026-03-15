import Header from "../components/Header";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Header sits outside the padding so border touches edges */}
      <div className="px-6">
        <Header title={title} subtitle={subtitle} />
      </div>

      {/* Divider touches full width */}
      <div className="border-b border-gray-200 dark:border-slate-700" />

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <main>
          {children}
        </main>
      </div>

    </div>
  );
}