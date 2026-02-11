import { addProduct } from '@/app/actions/product';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-3xl font-bold text-neon-pink">UPLOAD PROTOCOL</h1>
      <form action={addProduct} className="max-w-xl space-y-6">
        <div>
          <label className="text-gray-400">Item Title</label>
          <input name="title" required className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none" />
        </div>
        <div>
          <label className="text-gray-400">Price (Toman)</label>
          <input name="price" type="number" required className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none" />
        </div>
        <div>
          <label className="text-gray-400">Visual Data</label>
          <input name="image" type="file" required accept="image/*" className="w-full text-gray-400 file:mr-4 file:rounded file:bg-neon-pink file:px-4 file:py-2 file:font-bold file:text-black hover:file:bg-white" />
        </div>
        <button className="w-full rounded bg-neon-pink py-4 font-black text-black tracking-widest hover:bg-white">
          EXECUTE UPLOAD
        </button>
      </form>
    </div>
  );
}