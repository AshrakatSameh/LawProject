using System;

namespace LawApi.Services
{
    public interface IImageFileService
    {
        Task<string> SaveFiles(IFormFile imageFile, string[] allowedFileExtensions);

        void DeleteFile(string fileNameWithExtension);
    }
    public class ImageFileService(IWebHostEnvironment environment) : IImageFileService
    {
        public void DeleteFile(string fileNameWithExtension)
        {
            if (string.IsNullOrEmpty(fileNameWithExtension))
            {
                throw new ArgumentNullException(nameof(fileNameWithExtension));
            }
            var contentPath = environment.ContentRootPath;
            var path = Path.Combine(contentPath, $"Uploads", fileNameWithExtension);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"Invalid file path");
            }
            File.Delete(path);
        }

        public async Task<string> SaveFiles(IFormFile imageFile, string[] allowedFileExtensions)
        {
            if (imageFile == null)
            {
                throw new ArgumentNullException(nameof(imageFile));
            }
            var fileName = Path.GetFileName(imageFile.FileName);
            var img = Guid.NewGuid().ToString();
            fileName = img + fileName;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
