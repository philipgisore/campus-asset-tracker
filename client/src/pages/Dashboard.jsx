import Layout from "../layout/Layout";
import Statcards from "../components/StatCard";

export default function Dashboard() {
  return (
    <Layout
      title="School Laptop Security"
      subtitle="Gate Management System"
    >
      <div className="flex flex-col gap-6">
        <Statcards />
      </div>
    </Layout>
  );
}