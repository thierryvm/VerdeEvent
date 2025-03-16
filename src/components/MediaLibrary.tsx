import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface MediaFile {
  name: string;
  size: number;
  url: string;
  id: string;
}

export const MediaLibrary = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('media')
        .list();

      if (error) throw error;

      const filesWithUrls = await Promise.all(
        data.map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('media')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            size: file.metadata?.size || 0,
            url: publicUrl,
            id: file.id
          };
        })
      );

      setFiles(filesWithUrls);
    } catch (err) {
      console.error('Erreur lors du chargement des fichiers:', err);
      setError('Erreur lors du chargement des fichiers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase
        .storage
        .from('media')
        .remove([fileName]);

      if (error) throw error;

      // Rafraîchir la liste après suppression
      await fetchFiles();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError('Erreur lors de la suppression du fichier');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <div key={file.id} className="border rounded-lg p-4">
          {file.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <img src={file.url} alt={file.name} className="w-full h-48 object-cover mb-2" />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-2">
              {file.name}
            </div>
          )}
          <p className="text-sm truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
          <button
            onClick={() => handleDelete(file.name)}
            className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};