export interface Food {
    id: string;
    compartment: string;
    icon: string,
    name: string,
    expiry: string,
    quantity: string,
    unit: string,
}

export interface FoodIds {
    ids: number[];
}

export interface FoodAndQuantity {
    id: string;
    quantity: string;
}