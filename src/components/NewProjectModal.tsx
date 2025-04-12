import React, { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { useThemeStore, getThemeClasses } from '../store/themeStore';

interface NewProjectModalProps {
  onClose: () => void;
  onSubmit: (projectData: {
    title: string;
    description: string;
    visibility: 'public' | 'private';
    problem: string;
    targetAudience: string;
    stage: 'idea' | 'mvp' | 'fundraising' | 'launched';
    tags: string[];
  }) => void;
}

export default function NewProjectModal({ onClose, onSubmit }: NewProjectModalProps) {
  const { theme } = useThemeStore();
  const themeClasses = getThemeClasses(theme);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'private' as 'public' | 'private',
    problem: '',
    targetAudience: '',
    stage: 'idea' as 'idea' | 'mvp' | 'fundraising' | 'launched',
    tags: [] as string[],
    newTag: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { newTag, ...projectData } = formData;
    onSubmit(projectData);
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: ''
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${themeClasses.card} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-semibold ${themeClasses.text}`}>Create New Project</h2>
            <button
              onClick={onClose}
              className={`${themeClasses.text} hover:opacity-70`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="title" className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Project Name *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter your project name"
            />
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              rows={3}
              placeholder="Briefly describe your project"
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label htmlFor="problem" className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Problem Statement *
            </label>
            <textarea
              id="problem"
              required
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              rows={3}
              placeholder="What problem does your project solve?"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="targetAudience" className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Target Audience *
            </label>
            <input
              type="text"
              id="targetAudience"
              required
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Who is this project for?"
            />
          </div>

          {/* Project Stage */}
          <div>
            <label htmlFor="stage" className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Project Stage *
            </label>
            <select
              id="stage"
              required
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
              className={`w-full px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="idea">Idea Stage</option>
              <option value="mvp">MVP Stage</option>
              <option value="fundraising">Fundraising Stage</option>
              <option value="launched">Launched</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className={`${themeClasses.tag} px-3 py-1 rounded-full flex items-center gap-2`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className={`flex-1 px-4 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text} border ${themeClasses.border} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              Project Visibility
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: 'public' })}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  formData.visibility === 'public'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : `${themeClasses.border} ${themeClasses.button} ${themeClasses.text}`
                } flex items-center justify-center gap-2`}
              >
                <Globe className="h-5 w-5" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibility: 'private' })}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  formData.visibility === 'private'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : `${themeClasses.border} ${themeClasses.button} ${themeClasses.text}`
                } flex items-center justify-center gap-2`}
              >
                <Lock className="h-5 w-5" />
                Private
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-lg ${themeClasses.button} ${themeClasses.text}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}