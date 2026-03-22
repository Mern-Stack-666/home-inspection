import ServiceForm from "@/components/Admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Add New Service</h1>
        <p className="text-slate-500 mt-1">Create a new inspection service for your clients.</p>
      </div>
      <ServiceForm />
    </div>
  );
}
