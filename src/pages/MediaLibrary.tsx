import { MediaLibrary } from '../components/MediaLibrary';

export const MediaLibraryPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Médiathèque</h1>
      <MediaLibrary />
    </div>
  );
};