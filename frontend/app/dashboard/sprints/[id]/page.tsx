'use client';
import { useState } from "react";
import DashboardLayout from "@/app/components/dashboard/Layout";
import { useSprintsByProject } from "../../hooks/useSprints";
import { Sprint } from "../types/sprint";
import Link from "next/link";
import { useParams } from "next/navigation"; // hook pour récupérer params
const PROJECT_ID = "68d6ab301c2232764332a626";

export default function SprintsPage() {
  const { filteredSprints, addSprint, updateSprint, deleteSprint, loading, error } = useSprintsByProject(PROJECT_ID);
    const params = useParams();
    const projectId = params.id as string; // Récupère l'ID du projet depuis l'URL
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleAddSprint = () => {
    setEditingSprint(null);
    setFormData({ name: "", description: "" });
    setModalOpen(true);
  };

  const handleEditSprint = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setFormData({ name: sprint.name, description: sprint.description });
    setModalOpen(true);
  };
  const handleDeleteSprint = (id: string) => {
    if (confirm("Are you sure you want to delete this sprint?")) {
      deleteSprint(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    if (editingSprint) updateSprint({ ...editingSprint, ...formData });
    else addSprint({ ...formData, projectId });

    setModalOpen(false);
  };

  return (
    <DashboardLayout userData={{ name: "Alex Johnson", email: "alex.johnson@example.com", plan: "Pro", completedTasks: 84, productivityScore: 87 }}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">Project1</h1> */}
          <h2 className="text-xl font-semibold text-gray-700">Sprints</h2>
          <p className="text-gray-600">Manage all your sprints in one place</p>
        </div>
        <button onClick={handleAddSprint} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
          Add Sprint
        </button>
      </div>

      {loading && <p>Loading sprints...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSprints.map((sprint) => (
          <div key={sprint._id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">{sprint.name}</h3>
              <p className="text-gray-600 mb-2">{sprint.description}</p>
              <p className="text-gray-500 mb-4">{sprint.tasksCount} Tasks</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/tasks/${sprint._id}`} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-center">
                View Tasks
              </Link>
              {/* <button onClick={() => handleEditSprint(sprint)} className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                Edit
              </button>
              <button onClick={() => handleDeleteSprint(sprint._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md z-10">
            <h3 className="text-lg font-bold mb-4">{editingSprint ? "Edit Sprint" : "Add Sprint"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Sprint Name"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200">
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                  {editingSprint ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
