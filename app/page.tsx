'use client';

import { useMemo, useState } from 'react';
import { mockContent } from '@/data/mockData';
import { ContentItem, ContentStatus } from '@/types';

const statusTabs = ['All', 'Draft', 'In Review', 'Approved', 'Rejected'] as const;

type FilterStatus = (typeof statusTabs)[number];

export default function HomePage() {
  const [items, setItems] = useState<ContentItem[]>(mockContent);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('All');
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus =
        selectedStatus === 'All' || item.status === selectedStatus;
      const haystack = [item.title, item.author, item.category]
        .join(' ')
        .toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [items, query, selectedStatus]);

  const counts = useMemo(
    () => ({
      All: items.length,
      Draft: items.filter((item) => item.status === 'Draft').length,
      'In Review': items.filter((item) => item.status === 'In Review').length,
      Approved: items.filter((item) => item.status === 'Approved').length,
      Rejected: items.filter((item) => item.status === 'Rejected').length,
    }),
    [items],
  );

  const updateItemStatus = (id: number, status: ContentStatus) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  };

  const openEditor = (item: ContentItem) => {
    setActiveItem({ ...item });
    setIsDrawerOpen(true);
  };

  const handleFieldChange = <K extends keyof ContentItem>(
    field: K,
    value: ContentItem[K],
  ) => {
    setActiveItem((current) => (current ? { ...current, [field]: value } : null));
  };

  const saveChanges = () => {
    if (!activeItem) return;

    setItems((current) =>
      current.map((item) =>
        item.id === activeItem.id ? { ...activeItem, updatedAt: new Date().toISOString() } : item,
      ),
    );
    setIsDrawerOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Content Operations
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Review Queue
            </h1>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-slate-600">12 items needing review</span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedStatus === status
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status} <span className="ml-1 opacity-70">({counts[status]})</span>
                </button>
              ))}
            </div>

            <div className="w-full max-w-md">
              <label className="sr-only" htmlFor="search">
                Search content
              </label>
              <input
                id="search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, author, or category"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Updated</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 max-w-md text-sm text-slate-500">{item.summary}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.author}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(item.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label={`Status for ${item.title}`}
                        value={item.status}
                        onChange={(event) =>
                          updateItemStatus(item.id, event.target.value as ContentStatus)
                        }
                        className={`rounded-full border px-2.5 py-1.5 text-xs font-semibold outline-none ${
                          item.status === 'Draft'
                            ? 'border-amber-200 bg-amber-100 text-amber-800'
                            : item.status === 'In Review'
                              ? 'border-blue-200 bg-blue-100 text-blue-800'
                              : item.status === 'Approved'
                                ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                                : 'border-rose-200 bg-rose-100 text-rose-800'
                        }`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="In Review">In Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openEditor(item)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isDrawerOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30">
          <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Edit item
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">{activeItem.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                <input
                  value={activeItem.title}
                  onChange={(event) => handleFieldChange('title', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                  <input
                    value={activeItem.category}
                    onChange={(event) => handleFieldChange('category', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Author</label>
                  <input
                    value={activeItem.author}
                    onChange={(event) => handleFieldChange('author', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={activeItem.status}
                  onChange={(event) =>
                    handleFieldChange('status', event.target.value as ContentStatus)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                >
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Summary</label>
                <textarea
                  value={activeItem.summary}
                  onChange={(event) => handleFieldChange('summary', event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Body</label>
                <textarea
                  value={activeItem.body}
                  onChange={(event) => handleFieldChange('body', event.target.value)}
                  rows={7}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveChanges}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Save changes
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
