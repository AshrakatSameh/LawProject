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
            var path = Path.Combine(contentPath, $"cvs", fileNameWithExtension);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException($"Invalid file path");
            }
            File.Delete(path);
        }

        public Task<string> SaveFileAsync(IFormFile cvFile, string[] allowedFileExtensions)
        {
            throw new NotImplementedException();
        }
    }
}
