import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

/*
  Modal to add / edit a package

  Fields (according to plans table):
  - name
  - posts_count
  - price
  - price_per_post  (automatically calculated = price / posts_count)
  - is_active
*/

const PackageModal = ({ open, onClose, onSave, initialData }) => {

  const [name, setName] = useState('');
  const [postsCount, setPostsCount] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPostsCount(initialData.posts_count || '');
      setPrice(initialData.price || '');
      setIsActive(!!initialData.is_active);
    } else {
      setName('');
      setPostsCount('');
      setPrice('');
      setIsActive(true);
    }
  }, [initialData, open]);

  if (!open) return null;

  const pricePerPost =
    postsCount && price
      ? (Number(price) / Number(postsCount)).toFixed(2)
      : '0.00';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !postsCount || !price) return;

    onSave({
      id: initialData?.id,
      name,
      posts_count: Number(postsCount),
      price: Number(price),
      price_per_post: Number(pricePerPost),
      is_active: isActive,
    });
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50 p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          bg-[#112D4E]
          border border-[#1E3A5F]
          rounded-3xl
          p-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {initialData ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Package name */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Package Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Basic / Pro / Premium"
              className="w-full h-12 bg-[#0A192F] border border-[#1E3A5F] rounded-2xl px-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-400 transition"
            />
          </div>

          {/* Posts count */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Posts Count
            </label>
            <input
              type="number"
              min="1"
              value={postsCount}
              onChange={(e) => setPostsCount(e.target.value)}
              placeholder="50"
              className="w-full h-12 bg-[#0A192F] border border-[#1E3A5F] rounded-2xl px-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-400 transition"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="99.99"
              className="w-full h-12 bg-[#0A192F] border border-[#1E3A5F] rounded-2xl px-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-400 transition"
            />
          </div>

          {/* Price per post - calculated */}
          <div className="bg-[#0A192F]/60 border border-[#1E3A5F] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">
                Price per Post (calculated)
              </span>
              <span className="text-orange-400 font-bold text-lg">
                ${pricePerPost}
              </span>
            </div>
          </div>

          {/* Activation */}
          <div className="flex items-center justify-between bg-[#0A192F]/60 border border-[#1E3A5F] rounded-2xl p-4">
            <div>
              <p className="text-white font-medium">Package Status</p>
              <p className="text-sm text-slate-400">
                {isActive ? 'Package is active and available' : 'Package is inactive'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`
                relative w-14 h-7 rounded-full transition
                ${isActive ? 'bg-green-500' : 'bg-slate-600'}
              `}
            >
              <span
                className={`
                  absolute top-1 w-5 h-5 rounded-full bg-white transition
                  ${isActive ? 'left-8' : 'left-1'}
                `}
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition shadow-lg"
            >
              {initialData ? 'Save Changes' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageModal;
