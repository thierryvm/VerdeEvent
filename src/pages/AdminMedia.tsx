import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminMedia = () => {
  const [files, setFiles] = useState<Array<{ name: string; url: string; size: number; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const { data: fileList, error: listError } = await supabase.storage
        .from('blog-images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (listError) throw listError;

      const filesWithUrls = await Promise.all(
        (fileList || []).map(async (file) => {
          try {
            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(file.name);

            // Verify image exists by preloading
            await new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = publicUrl;
            });

            return {
              name: file.name,
              url: publicUrl,
              size: file.metadata?.size || 0,
              created_at: file.created_at || new Date().toISOString()
            };
          } catch (err) {
            console.error(`Error loading image ${file.name}:`, err);
            return null;
          }
        })
      );

      // Filter out failed loads and sort by date
      const validFiles = filesWithUrls
        .filter((file): file is NonNullable<typeof file> => file !== null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setFiles(validFiles);
      if (validFiles.length === 0) {
        setMessage({ type: 'error', text: 'Aucune image n\'a pu être chargée' });
      } else if (validFiles.length < (fileList?.length || 0)) {
        setMessage({ type: 'error', text: 'Certaines images n\'ont pas pu être chargées' });
      } else {
        setMessage(null);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement des fichiers' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      setMessage({ type: 'success', text: 'Fichier téléchargé avec succès' });
      loadFiles(); // Reload the file list
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage({ type: 'error', text: 'Erreur lors du téléchargement du fichier' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) return;

    try {
      setLoading(true);
      const { error } = await supabase.storage.from('blog-images').remove([fileName]);
      if (error) throw error;

      setMessage({ type: 'success', text: 'Fichier supprimé avec succès' });
      setFiles(files.filter(file => file.name !== fileName));
    } catch (error) {
      console.error('Error deleting file:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la suppression du fichier' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Médiathèque</h1>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Téléchargement...' : 'Télécharger un fichier'}
          </label>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div key={file.name} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={file.url}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;