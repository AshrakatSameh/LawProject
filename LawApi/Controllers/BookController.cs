using LawApi.Dtos;
using LawApi.Interfaces;
using LawApi.Models;
using LawApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LawApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IFileService _file;
        private readonly IImageFileService _image;
        private readonly IBookService _bookServ;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<BookController> _logger;

        public BookController(IFileService file,
            IImageFileService image, IBookService bookServ,
            IWebHostEnvironment env, ILogger<BookController> logger)
        {
            _file = file;
            _image = image; 
            _env = env;
            _logger = logger;
            _bookServ = bookServ;
        }


        [HttpPost("AddBook")]
        public async Task<IActionResult> AddBook([FromForm]BookDto bookToAdd)
        {
            try
            {
                if(bookToAdd.BookPdf?.Length> 4 * 1024 * 1024)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 4 MB ");
                   
                }
                if (bookToAdd.Image?.Length > 1 * 1024 * 1024)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Image size should not exceed 1 MB");
                }
                string[] allowedFileExtentions = [".pdf"];
                string[] allowedImageExtentions = [".jpg", ".jpeg", ".png"];
                string createdBookName = await _file.SaveFileAsync(bookToAdd.BookPdf, allowedFileExtentions);
                string createdImageName = await _image.SaveFiles(bookToAdd.Image, allowedImageExtentions);
                if(createdBookName == null)
                {
                    return BadRequest("File can't be saved");
                }

                var bookAdded = new Book
                {
                    Title = bookToAdd.Title,
                    Description = bookToAdd.Description,
                    Author = bookToAdd.Author,
                    ImageUrl = createdImageName,
                    BookPdf = createdBookName
                };
                var createdBook = await _bookServ.AddBookAsync(bookAdded);
                return CreatedAtAction(nameof(AddBook), createdBook);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }


        [HttpGet("getAllBooks")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookServ.GetBooksAsync();

            // Assuming each post object has a property named "ImageFileName" containing the file name of the image.
            // You can modify this according to your actual data structure.
            foreach (var b in books)
            {
                b.ImageUrl = GenerateImageUrl(b.ImageUrl);
                b.BookPdf = GenerateBookUrl(b.BookPdf);
            }

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _bookServ.GetBookAsync(id);
            book.BookPdf = GenerateBookUrl(book.BookPdf);
            if (book == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, $"File with id: {id} does not found");
            }
            return Ok(book);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            try
            {
                var existingBook = await _bookServ.GetBookAsync(id);
                if(existingBook == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, $"Book With id: {id} does not exist");

                }
                await _bookServ.DeleteBookAsync(existingBook);
                _file.DeleteFile(existingBook.BookPdf);
                return NoContent();
            }catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private string GenerateImageUrl(string fileName)
        {


            var imageUrl = Url.Content($"~/assetsData/{fileName}");

            var imagePath = _env.WebRootPath + imageUrl.Replace('/', '\\');
            var absoluteUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{imageUrl}";

            return absoluteUrl;
        }

        private string GenerateBookUrl(string fileName)
        {


            var bookUrl = Url.Content($"~/assetsData/{fileName}");

            var imagePath = _env.WebRootPath + bookUrl.Replace('/', '\\');
            var absoluteUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{bookUrl}";

            return absoluteUrl;
        }
    }
}
