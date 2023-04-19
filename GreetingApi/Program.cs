using GreetingApi.Data;
using GreetingApi.Model;
using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:4200/greeted",
                                              "http://localhost:4200", "http://localhost:4200/greeted/13");
                      });
});


/* 
    below two lines adds the database context to the dependency injection (DI) container 
    and enables displaying database-related exceptions:
*/
builder.Services.AddEntityFrameworkNpgsql()
        .AddDbContext<PersonDb>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("ConnString")));

var app = builder.Build();

app.MapGet("/", () => "Welcome to GreetingApi");

app.MapGet("/greeted", async (PersonDb db) => await db.Greeted.ToListAsync());

app.MapGet("/greeted/{id}", async (PersonDb db, int id) =>
   await db.Greeted.FindAsync(id) is Person person ? Results.Ok(person) : Results.NotFound("Person Not Found"));

app.MapPost("/greeted/", async (PersonDb db, Person person) =>
{
    bool condition = true;
    int id = 0;
    int count = 0;

    foreach (var item in db.Greeted.ToList()) 
    {   
        condition = item.FirstName != person.FirstName;
        if(!condition) {
            id = item.Id;
            count = item.Count;
            break;
        }
    }

    // Remove the person from the list
    if (await db.Greeted.FindAsync(id) is Person person1)
        db.Greeted.Remove(person1);

    if(condition)
        db.Greeted.Add(person);
    else 
    {
        person.Id = id;
        person.Count = count + 1;
        db.Greeted.Add(person);
    }

    await db.SaveChangesAsync();
    return Results.Created($"/greeted/{person.Id}", person);

});

app.MapDelete("/greeted/{id}", async (PersonDb db, int id) =>
{
    if (await db.Greeted.FindAsync(id) is Person person)
    {
        db.Greeted.Remove(person);
        await db.SaveChangesAsync();
        return Results.Ok(person);
    }

    return Results.NotFound();
});


app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.Run();