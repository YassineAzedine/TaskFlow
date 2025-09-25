'use client';

import React, { useState, useEffect } from "react";
import { X, Folder, Sparkles, Save, Plus, Edit3 } from "lucide-react";
import axios from "axios";

export interface Project {
  id?: number;
  name: string;
  description?: string;
}

interface CenteredProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSave: (project: Project) => void;
fetchProjects: () => Promise<void>;
}

export default function CenteredProjectModal({
  isOpen,
  onClose,
  project,
  onSave ,
  fetchProjects
}: CenteredProjectModalProps) {
  const [show, setShow] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShow(false);
      onClose();
      resetForm();
    }, 300);
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});

  const ownerId = localStorage.getItem("userId");

  try {
    let response;

    if (project && project.id) {
      // update
      response = await axios.put(
        `http://localhost:3030/projects/${project.id}`,
        { name, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } else {
      // create
      response = await axios.post(
        "http://localhost:3030/projects",
        { name, description, ownerId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    }

    // update parent state
    onSave(response.data);
    fetchProjects();
    handleClose();
  } catch (error: unknown) {
    console.error("Erreur création ou mise à jour du projet:", error);

    let message = "Erreur lors de la création/mise à jour du projet";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    setErrors({ general: message });
  } finally {
    setIsLoading(false);
  }
};

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white relative">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project ? <Edit3 size={24} /> : <Plus size={24} />}
                <div>
                  <h2 className="text-2xl font-bold">
                    {project ? "Modifier le Projet" : "Nouveau Projet"}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {project
                      ? "Mettez à jour les détails"
                      : "Créez quelque chose d'extraordinaire"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Folder size={16} />
                  Nom du projet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Refonte du site web"
                  className="w-full p-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 transition-all text-lg"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Sparkles size={16} />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  className="w-full p-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/50 transition-all resize-none"
                />
              </div>
              {errors.general && (
                <p className="text-red-500 text-sm">{errors.general}</p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50/50 p-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!name.trim() || isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Save size={16} />
                {project ? "Mettre à jour" : "Créer le projet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
