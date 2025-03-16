declare module 'quill-image-resize-module-react' {
  interface ImageResizeModule {
    parchment: unknown;
    modules: string[];
    displaySize: boolean;
  }

  const ImageResize: {
    default: {
      new(): {
        options: ImageResizeModule;
      };
    };
  };

  export default ImageResize;
}