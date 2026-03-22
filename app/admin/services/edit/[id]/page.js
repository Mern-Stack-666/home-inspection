import ServiceForm from "@/components/Admin/ServiceForm";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }) {
  await dbConnect();
  // params is a promise in Next.js 16
  const { id } = await params;
  
  const service = await Service.findById(id);
  
  if (!service) notFound();

  // Convert mongoose doc to plain object for client component
  const plainService = JSON.parse(JSON.stringify(service));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Service</h1>
        <p className="text-slate-500 mt-1">Update details for "{service.title}".</p>
      </div>
      <ServiceForm initialData={plainService} />
    </div>
  );
}
