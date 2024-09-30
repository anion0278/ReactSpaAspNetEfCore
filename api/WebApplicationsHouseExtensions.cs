using api;
using Microsoft.AspNetCore.Mvc;
using MiniValidation;

public static class WebApplicationHouseExtensions
{
    public static void MapHouseEndpoints(this WebApplication app)
    {
        app.MapGet(Constants.ApiHouseBase, async (IHouseRepository houseRepository) =>
        {
            return Results.Ok(await houseRepository.GetAll());
        }).Produces<HouseDto[]>(StatusCodes.Status200OK);

        app.MapGet(Constants.ApiHouseBase + "/{houseId:int}", async (int houseId, IHouseRepository repository) =>
        {
            var house = await repository.Get(houseId);
            if (house is null) return Results.Problem($"Could not find house with ID {houseId}", statusCode: 404);
            return Results.Ok(house);
        }).ProducesProblem(404)
        .Produces<HouseDetailsDto>(StatusCodes.Status200OK);

        app.MapPost(Constants.ApiHouseBase, async ([FromBody] HouseDetailsDto dto, IHouseRepository repository) =>
        {
            if (!MiniValidator.TryValidate(dto, out var errors))
                return Results.ValidationProblem(errors);
            var newHouse = await repository.Add(dto);
            return Results.Created(Constants.ApiHouseBase + $"/{newHouse.Id}", newHouse);
        }).Produces<HouseDetailsDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem();

        app.MapPut(Constants.ApiHouseBase, async ([FromBody] HouseDetailsDto dto, IHouseRepository repository) =>
        {
            if (!MiniValidator.TryValidate(dto, out var errors))
                return Results.ValidationProblem(errors);
            if (await repository.Get(dto.Id) is null)
            {
                return Results.Problem($"House wit ID {dto.Id} not found", statusCode: 404);
            }
            var updatedHouse = await repository.Update(dto);
            return Results.Ok(dto);
        }).ProducesProblem(404)
        .Produces<HouseDetailsDto>(StatusCodes.Status200OK)
        .ProducesValidationProblem();

        app.MapDelete(Constants.ApiHouseBase + "/{houseId:int}", async (int houseId, IHouseRepository repository) =>
        {
            if (await repository.Get(houseId) is null)
            {
                return Results.Problem($"House wit ID {houseId} not found", statusCode: 404);
            }
            await repository.Delete(houseId);
            return Results.Ok();
        }).ProducesProblem(404)
        .Produces<HouseDetailsDto>(StatusCodes.Status200OK);
    }
}