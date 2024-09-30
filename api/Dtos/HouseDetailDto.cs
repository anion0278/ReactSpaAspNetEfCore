using System.ComponentModel.DataAnnotations;

public record HouseDetailsDto( 
    int Id, 
    [property: Required]string? Address, 
    [property: Required]string? Country, 
    double Price, 
    string? Description, 
    string? Photo);