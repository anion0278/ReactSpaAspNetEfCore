using Microsoft.EntityFrameworkCore;

public interface IBidRepository
{
    Task<List<BidDto>> Get(int houseId);

    Task<int> GetHighestBidAmountForHouse(int houseId);

    Task<BidDto> Add(BidDto bid);
}

public class BidRepository: IBidRepository
{
    private readonly HouseDbContext context;

    public BidRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<BidDto>> Get(int houseId)
    {
        return await context.Bids.Where(b => b.HouseId == houseId)
            .Select(b => new BidDto(b.Id, b.HouseId, b.Bidder, b.Amount))
            .ToListAsync();
    }

    public async Task<int> GetHighestBidAmountForHouse(int houseId)
    {
        var result = (await context.Bids
            .Where(b => b.HouseId == houseId)
            .MaxAsync(b => (int?)b.Amount)) ?? 0; // handling possibly empty sequence
        return result;
    }

    public async Task<BidDto> Add(BidDto dto)
    {
        var entity = new BidEntity
        {
            HouseId = dto.HouseId,
            Bidder = dto.Bidder,
            Amount = dto.Amount
        };
        context.Bids.Add(entity);
        await context.SaveChangesAsync();
        return new BidDto(entity.Id, entity.HouseId, 
            entity.Bidder, entity.Amount);
    }
}