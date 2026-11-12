Trip(id: uuid, name, startDate, endDate...)
    createdAt, updatedAt

Item(id: uuid, name, color...)
    createdAt, updatedAt

Luggage(id: uuid, tripId, name...)
    {tripId} references Trip
    createdAt, updatedAt

ItemQuantity(id: uuid, luggageId, itemId, num, nAlreadyPacked)
    {luggageId} references Luggage
    {itemId} references Item
    check num >= 0
    check nAlreadyPacked >= 0
    check nAlreadyPacked <= num
    createdAt, updatedAt