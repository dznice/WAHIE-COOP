import { Item } from "./paymentItem";

export class itemService {
    item: Item[] = [
        {select: '1', description: 'Invoice # 1001', dueDate: '2023-03-25', originalAmount: '50,000.00', openBalance: '49,995.00'},
        {select: '2', description: 'Invoice # 1002', dueDate: '2023-03-26', originalAmount: '500.00', openBalance: '500.00'}
    ]
    term = '';
}