using System.ComponentModel.DataAnnotations;

namespace GreetingApi.Model;
public class Person
{   
    [Key]
    public int Id { get; set; }
    [Required]
    public string? FirstName { get; set; }
    public int Count { get; set; }
}