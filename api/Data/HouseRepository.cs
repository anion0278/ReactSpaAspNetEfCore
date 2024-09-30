using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

public interface IHouseRepository
{
    Task<List<HouseDto>> GetAll();
    Task<HouseDetailsDto?> Get(int id);
    Task<HouseDetailsDto> Add(HouseDetailsDto house);
    Task<HouseDetailsDto> Update(HouseDetailsDto house);
    Task Delete(int id);
}

public class HouseRepository : IHouseRepository
{
    private readonly HouseDbContext context;

    private static HouseDetailsDto EntityToDetailDto(HouseEntity e)
    {
        return new HouseDetailsDto(e.Id, e.Address, e.Country, e.Price, e.Description, e.Photo);
    }

    private static void DtoToEntity(HouseDetailsDto dto, HouseEntity e)
    {
        e.Address = dto.Address;
        e.Country = dto.Country;
        e.Description = dto.Description;
        e.Price = dto.Price;
        e.Photo = dto.Photo;
    }

    public HouseRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<HouseDto>> GetAll()
    {
        var houses = await context.Houses
        .Select(e => new HouseDto(e.Id, e.Address, e.Country, e.Price))
        .ToListAsync();
        return houses;
    }

    public async Task<HouseDetailsDto?> Get(int id)
    {
        var entity = await context.Houses.SingleOrDefaultAsync(h => h.Id == id);
        if (entity == null)
            return null;
        return EntityToDetailDto(entity);
    }

    public async Task<HouseDetailsDto> Add(HouseDetailsDto dto)
    {
        var entity = new HouseEntity();
        DtoToEntity(dto, entity);
        context.Houses.Add(entity);
        await context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task<HouseDetailsDto> Update(HouseDetailsDto dto)
    {
        var entity = await context.Houses.FindAsync(dto.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to update house: entity with ID {dto.Id} not found.");
        DtoToEntity(dto, entity);
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await context.Houses.FindAsync(id);
        if (entity == null)
            throw new ArgumentException($"Trying to delete house: entity with ID {id} not found.");
        context.Houses.Remove(entity);
        await context.SaveChangesAsync();
    }
}