import { invItem } from "./invItem";

export class itemService{
    
    invItemArr: invItem []= [
        {name: "fertilizer", unit: "Box", stock: 5 , price: 200.00, category:"Supplies"},
        {name: "ediwow", unit: "Box", stock: 5 , price: 250.00, category:"Tools"},
        {name: "labugen", unit: "Box", stock: 5 , price: 200.00, category:"Supplies"},
        {name: "aljohn", unit: "Box", stock: 4 , price: 400.00, category:"Tools"},
        {name: "cedced", unit: "Box", stock: 5 , price: 200.00, category:"Tools"},
        {name: "maslam", unit: "Box", stock: 5 , price: 10000.00, category:"Supplies"},
        {name: "kibal", unit: "Box", stock: 5 , price: 3300.00, category:"Tools"},
    ];

    term= '';
}