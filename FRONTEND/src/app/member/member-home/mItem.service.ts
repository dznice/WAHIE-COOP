import { memItem } from "./mItem";

export class itemService {
  item: memItem[] = [
    {
      date: '2023-04-19',
      type: 'Journal Entry',
      No: '9',
      
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '2023-04-12',
      type: 'Invoice',
      No: '11',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '2023-04-25',
      type: 'Payment',
      No: '34',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Pending',
    },
    {
      date: '2023-04-30',
      type: 'Journal Entry',
      No: '45',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '2023-04-09',
      type: 'Invoice',
      No: '15',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    }
  ];

  term = '';
}
