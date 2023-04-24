import { Item } from './item';

export class itemService {
  item: Item[] = [
    {
      date: '03/01/2023',
      type: 'Journal Entry',
      No: '9',
      Member: '0005 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Invoice',
      No: '9',
      Member: '0006 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Journal Entry',
      No: '9',
      Member: '0007 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Payment',
      No: '9',
      Member: '0008 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Payment',
      No: '9',
      Member: '0009 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
  ];
  term = '';
}
