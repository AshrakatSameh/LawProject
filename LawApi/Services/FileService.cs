namespace LawApi.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile cvFile, string[] allowedFileExtensions);

        void DeleteFile(string fileNameWithExtension);
    }
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _env;
        public FileService(IWebHostEnvironment env)
        {
            _env = env;
        }
        public void DeleteFile(string fileNameWithExtension)
        {
            if (string.IsNullOrEmpty(fileNameWithExtension))
            {
                throw new ArgumentNullException(nameof(fileNameWithExtension));
            }
            var contentPath = _env.ContentRootPath;
            var path = Path.Combine(contentPath, $"books", fileNameWithExtension);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"Invalid file path");
            }
            File.Delete(path);
        }

        public async Task<string> SaveFileAsync(IFormFile File, string[] allowedFileExtensions)
        {
            if (File == null)
            {
                throw new ArgumentNullException(nameof(File));
            }
            var fileName = Path.GetFileName(File.FileName);
            var img = Guid.NewGuid().ToString();
            fileName = img + fileName;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assetsData", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await File.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
