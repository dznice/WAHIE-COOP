import { invItem } from "./invItem";

export class itemService{
    
    invItemArr: invItem []= [
        {name: "Fertilizer", unit: "Box", stock: 5 , price: 200.00, category:"Supplies"},
        {name: "Pickaxe", unit: "Box", stock: 5 , price: 250.00, category:"Tools"},
        {name: "Seeds", unit: "Box", stock: 5 , price: 200.00, category:"Supplies"},
        {name: "Hoe", unit: "Box", stock: 4 , price: 400.00, category:"Tools"},
        {name: "Chainsaw", unit: "Box", stock: 5 , price: 200.00, category:"Tools"},
        {name: "Pesticide", unit: "Box", stock: 5 , price: 10000.00, category:"Supplies"},
        {name: "Sprinkler", unit: "Box", stock: 5 , price: 3300.00, category:"Tools"},
    ];

    term= '';
}