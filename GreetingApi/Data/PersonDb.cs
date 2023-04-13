using Microsoft.EntityFrameworkCore;
using GreetingApi.Model;

namespace GreetingApi.Data;
public class PersonDb : DbContext
{
    public PersonDb(DbContextOptions<PersonDb> options) : base(options) {}
    public DbSet<Person> Greeted => Set<Person>();
}