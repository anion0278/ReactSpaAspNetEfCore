using Microsoft.EntityFrameworkCore;

public static class SeetData
{

    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<HouseEntity>().HasData(
            new List<HouseEntity>
            {
                new HouseEntity()
                {
                    Id = 1,
                    Address = "Address 1",
                    Country = "Country 1",
                    Description = "Description 1",
                    Price = 11111
                },
                new HouseEntity()
                {
                    Id = 2,
                    Address = "Address 2",
                    Country = "Country 2",
                    Description = "Description 2",
                    Price = 222222
                },
                new HouseEntity()
                {
                    Id = 3,
                    Address = "Address 3",
                    Country = "Country 3",
                    Description = "Description 3",
                    Price = 33333
                }
            });
    }

}