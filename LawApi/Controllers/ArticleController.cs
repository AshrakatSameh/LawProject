using LawApi.Dtos;
using LawApi.Interfaces;
using LawApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LawApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleServicecs _article;

        public ArticleController(IArticleServicecs article)
        {
            _article = article;
        }

        [HttpPost("CreateArticle")]
        public async Task<IActionResult> CreateArticle([FromForm]ArticleDto dto)
        {
            try
            {
                var article = new Articles
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    PostDate = dto.PostDate
                };
                var createdArticle = await _article.AddArticlesAsync(article);
                return Ok(article);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("Articles")]
        public async Task<IActionResult> GetAllArticles()
        {
            try
            {
                var articles = await _article.GetArticlesAsync();
                return Ok(articles);
            }catch(Exception ex)
            {
                return StatusCode (500, $"Has an error : {ex.Message}");
            }
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            try
            {
                var article = _article.GetArticlesByIdAsync(id);
                return Ok(article);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Not found article: {ex.Message}");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            try
            {
                var article = await _article.GetArticlesByIdAsync(id);
                if (article == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, $"Article With id: {id} does not exist");

                }
                await _article.DeleteArticlesAsync(article);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
