using System.ComponentModel.DataAnnotations;

public record BidDto(
    int Id, 
    int HouseId, 
    [property: Required]string Bidder, 
    [property: Range(1, int.MaxValue)]int Amount);